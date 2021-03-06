//jshint esversion:6
/* jshint node: true */
'use strict';

// require express
const express = require('express');

const app = express();
const port = 3000;

//require ejs
const ejs = require('ejs');

//require bodyParser
const bodyParser = require('body-parser');

//require lodash
const _ = require('lodash');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

//Static files are files that clients download as they are from the server. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware:
app.use(express.static('public'));

// creating content variables:
const homeStartingContent = 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What\'s happened to me? " he thought. It wasn\'t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops';
const aboutContent = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas';
const contactContent = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.';

//Creating an empty array to store the post objects
let posts = [];

// 'index' page ------>
app.get('/', (req, res) => {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

// 'about' page -------->
app.get('/about', (req, res) => {
  res.render('about', {
    aboutContent: aboutContent
  });
});

// 'contact' page --------->
app.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent: contactContent
  });
});

// 'compose' page --------->
app.get('/compose', (req, res) => {
  res.render('compose');
});

// Access the parse results as req.body.postTitle and postBody at 'compose' page --------->
app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }; // creating an object to store title and body
  posts.push(post); // adding object to array (posts)
  res.redirect('/'); // redirect to home page
});

// Define route parameters (getting what is written after /posts/ )
app.get('/posts/:postName', function(req, res) {
  const requestedTitle = req.params.postName;
  posts.forEach(function(post) {
    const storedTitle = post.title;
    if (_.lowerCase(requestedTitle) === _.lowerCase(storedTitle)) {
      console.log('Match!');
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
