'use strict';

// Application Dependencies
const express = require('express'); 
const superagent = require('superagent'); //handles all our request
const pg = require('pg')

// Application Setup/dependencies
const app = express();
const PORT = process.env.PORT || 3000;

//added to look into objects
const util = require('util');

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));//all set to static and would be available to view publicly

//database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');



///////////////////API Routes // get is a request of information without any changes
app.get('/', (request, response) => {
  response.render('pages/index', {message: 'Woohoo!'})
});
app.get('/', getBooks);
// add app.post ('/searches/)
//should be 5 app. here
//needing


// app.get('/home')
// Creates a new search to the Google Books API
app.post('/searches', createSearch);

app.get ('*', (request, response) => response.status(404).send('This route does not exist'));
// HELPER FUNCTIONS - constructor/translator
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title ? info.title : 'No title available';
  let httpRegex = /^(http:\/\/)/g;

  // new instances not complete, working on it
  this.author = info.authors ? info.authors[0] : 'No Author Available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN Available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail.replace(httpRegex, 'http://') : placeholderImage;
  this.description = info.description ? info.description: 'No description Available';
}
///////////////////////////retrieves books from database 

function getBooks(req,res)
  let SQL = 'SELECT * FROM "books" ; ' ;

  return client.query(SQL)
    .then (result => {
      if (result.rowCount === 0) {
      res.render ('pages/searches/new');
  }else {
    res.render ('pages/index', { books: result.row });
  }
})
.catch(err => handleError(err,res));

//
//function createBook
//
/////////////////////////creates book in our DB
//function createBook
//function newSearch
////////////////////////retrieves a single book from DB
//function getBook (req,res)
//let SQL = 'SELECT .....
//let values = [req, params.id];
//client.query(SQL, values)
//.then(result => res.render('pages/book/show', {book : results.row[0].id}))
//.catch(err => handleError(err,res))
//})
//



// Note that .ejs file extension is not required
function newSearch(request, response) {
  response.render('pages/index');
  console.log('books', request.books);

  let SQL = `SELECT * FROM books where id =${request.books.books_id}`

  return client.query(SQL)//////returns a promise//
    .then(results => {//if not it is gonna continue to .catch
      response.render('/pages/index', {books: results.rows})
    })
}

// No API key required
// Console.log (request.body and request.body.search
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`}
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`}

  // superagent.get(url)
  //   .then(apiResponse => console.log(util.inspect(apiResponse.body.items, {showhidden: false, depth: null})))
  //   .then(results => response.render('pages/searches/show', {searchResults: results})
  //   )}
  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {searchResults: results}))
    .catch(err => handleError(err, response));
}
// error catcher
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


//error handler
const handleError = (error, response) => {
  response.render('pages/error', {error: error})
}
