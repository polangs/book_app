'use strict';

require('dotenv').config();

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
app.get('/', getBooks);
app.post('/books', createBook)
app.get('/book/:id', gettingBook)//:d grab from the route
// add app.post ('/searches/)
//should be 5 app. here
//needing


// app.get('/home')
// Creates a new search to the Google Books API
app.post('/searches', createSearch);


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

function getBooks(req,res){
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => {
      if (results.rowCount === 0) {
        res.render ('pages/searches/new');
      }else {
        res.render ('pages/index', { books: results.rows});
      }
    })
    .catch(err => handleError(err,res));
}


/////////////////////////creates book in our DB

function createBook(req, res){
  let { title, author, isbn, image_url, description, bookshelf } = req.body;
  let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5); ' ;
  let values = [title, author, isbn, image_url, description, bookshelf];

  return client.query(SQL, values)
    .then(() => {
      SQL = 'SELECT * FROM books WHERE isbn=$1;';
      values = [req.body.isbn];
      return client.query(SQL,values)
        .then(result => res.redirect(`/book/${result.rows[0].id}`))
        .catch(err => handleError(err,res))
    })
    .catch(err => handleError(err,res));
}
function newSearch(request, response){
  response.render('pages/searches/new');
}

////////////////////////retrieves a single book from DB
function gettingBook (req,res){
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  let values = [req.params.id]; //:d getting from route
  client.query(SQL, values)
    .then(result => res.render('pages/books/show', {book : result.row[0].id}))
    .catch(err => handleError(err,res))
}


//this girl doesnt need API bruh
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`}
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`}

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {searchResults: results}))
    .catch(err => handleError(err, response));
}

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


// error catcher
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


//error handler
const handleError = (error, response) => {
  response.render('pages/error', {error: error})
}
