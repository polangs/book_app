DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS bookshelves;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  author VARCHAR(255),
  image_url VARCHAR(255),
  isbn VARCHAR(255),
  bookshelf VARCHAR(255)
);

CREATE TABLE bookshelves (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);


INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'The Great Gatsby',
  'Francis Scott Fitzgerald',
  'ISBN_13 9786050418156',
  'http://books.google.com/books/content?id=meVxCwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  'The main events of the novel take place in the summer of 1922. Nick Carraway, a Yale graduate and World War I veteran from the Midwest – who serves as the novel''s narrator – takes a job in New York as a bond salesman.',
  'Classics'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'The Fellowship of the Ring',
  'John Ronald Reuel Tolkien',
  'ISBN_13 9780007522903',
  'http://books.google.com/books/content?id=f3q6mwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  'When they were first published, THE HOBBIT and THE LORD OF THE RINGS became instant classics. ',
  'Fantasy'
);

INSERT INTO bookshelves(name) SELECT DISTINCT bookshelf FROM books;

ALTER TABLE books ADD COLUMN bookshelf_id INT;

UPDATE books SET bookshelf_id=shelf.id FROM (SELECT * FROM bookshelves) AS shelf WHERE books.bookshelf = shelf.name;

ALTER TABLE books DROP COLUMN bookshelf;

ALTER TABLE books ADD CONSTRAINT fk_bookshelves FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id);



