DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  author VARCHAR(255),
  image_url VARCHAR(255),
  isbn VARCHAR(255),
  bookshelf VARCHAR(255)
);

INSERT INTO books (author, title, isbn, image_url, description, bookshelf) 
VALUES('authors name','title','1234','http:\\','good book','history');
  


