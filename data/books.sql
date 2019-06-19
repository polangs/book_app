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

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'The Great Gatsby',
  'Francis Scott Fitzgerald',
  'ISBN_13 9786050418156',
  'http://books.google.com/books/content?id=meVxCwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  'The main events of the novel take place in the summer of 1922. Nick Carraway, a Yale graduate and World War I veteran from the Midwest – who serves as the novel''s narrator – takes a job in New York as a bond salesman. He rents a small house on Long Island, in the (fictional) village of West Egg, next door to the lavish mansion of Jay Gatsby, a mysterious millionaire who holds extravagant parties but does not participate in them. Nick drives around the bay to East Egg for dinner at the home of his cousin, Daisy Fay Buchanan, and her husband, Tom, a college acquaintance of Nick''s. They introduce Nick to Jordan Baker, an attractive, cynical young golfer with whom Nick begins a romantic relationship. She reveals to Nick that Tom has a mistress, Myrtle Wilson, who lives in the "valley of ashes": an industrial dumping ground between West Egg and New York City. Not long after this revelation, Nick travels to New York City with Tom and Myrtle to an apartment they keep for their affair. At the apartment, a vulgar and bizarre party takes place. It ends with Tom breaking Myrtle''s nose after she annoys him by saying Daisy''s name several times.',
  'Classics'
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES (
  'The Fellowship of the Ring',
  'John Ronald Reuel Tolkien',
  'ISBN_13 9780007522903',
  'http://books.google.com/books/content?id=f3q6mwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  'When they were first published, THE HOBBIT and THE LORD OF THE RINGS became instant classics. Treasured by readers young and old, these works of sweeping fantasy, steeped in unrivalled magic and otherworldliness have sold more than 150 million copies around the world. This new boxed set contains both titles and features brand new cover designs. It offers readers a new opportunity to discover Tolkien''s remarkable world of Middle-earth and to follow the complete story of Bilbo Baggins and the Hobbits'' part in the epic quest for the Ring beginning with Bilbo''s fateful visit from Gandalf and culminating in the dramatic climax between Frodo and Gollum atop Mount Doom.',
  'Fantasy'
);                                                                                                                                                                                                                                                                                       



