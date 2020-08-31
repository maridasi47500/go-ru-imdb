create database imdb;
use imdb;
CREATE TABLE user
(
    id INT PRIMARY KEY NOT NULL auto_increment,
    name VARCHAR(100),
    image VARCHAR(100),
    password VARCHAR(255),
    email VARCHAR(255)
);


CREATE TABLE movie
(
    id INT PRIMARY KEY NOT NULL auto_increment,
    name VARCHAR(255),
    genre VARCHAR(200),
    image TEXT,
    description TEXT,
release_date DATE
);

/*utilisateurs */

CREATE TABLE note
(
    hour_and_date DATETIME, 
    user_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
	note_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movie(id) ON UPDATE CASCADE

);

INSERT INTO user (name, image, password, email)
 VALUES
(
  'Rébecca',
  './image/Rebecca',
  '236270d0ba8016f8588b8900e1ae4765d55a92e644e4de469d0c01a5bab54ff2',
  'rebecca@example.com'
),
(
  'Aimée',
  './image/Aimee',
  '3f425e90d8bb18bd2ec3bf68e2703512267b9a6a2a7ff3208041e26f987cef31',
  'aimee@example.com'
),
(
  'Marielle',
  './image/Marielle',
  '9629cd6a6160dbe0482ccdaef7eff8ca1e8abafe13422eba56c588090d80a279',
  'marielle@example.com'
),
(
  'Hilaire',
  '.image/Hilaire',
  'e40577994dddfa074aa8282f8f387bdca9506acb53c455f53391fd678d3338ee',
  'hilaire@example.com'
),
(
  'John',
  '.image/John',
  'a8cfcd74832004951b4408cdb0a5dbcd8c7e52d43f7fe244bf720582e05241da',
  'john@example.com'
),
(
  'Jane',
  '.image/Jane',
  '4f23798d92708359b734a18172c9c864f1d48044a754115a0d4b843bca3a5332',
  'jane@example.com'
),
(
  'Brad',
  '.image/Brad',
  'cc90e81847433c9734a4d93d18d27018501cc7bf2285fac6499183ed63a8cce1',
  'brad@example.com'
),
(
  'Jack',
  '.image/Jack',
  'b5fd03dd91df1cfbd2f19c115d24d58bbda01a23fb01924bb78b2cc14f7ff1cb',
  'jack@example.com'
),
(
  'Joe',
  '.image/Joe',
  '6dd8b7d7d3c5c4689b33e51b9f10bc6a9be89fe8fa2a127c8c6c03cd05d68ace',
  'joe@example.com'
),
(
  'Sandra',
  '.image/Sandra',
  '1f02e917fd21530620990a81a8ddce4a8cb1f0e57770e393877e4a68a2984ff8',
  'sandra@example.com'
);

insert into imdb.movie (release_date, name, description, genre) values ('2020-09-01','DRAMA Series Episode 2','EPISODE TWO: This episode deals with crazy women who are Greedy and Materialistic and how these issues can sabotage a relationship. Mike (Eric Benjamin) is a hard working guy who is having a hard time paying his bills. Jamie his girlfriend, is steady hitting his pockets up over a gold chain she wants and feel he needs to pay for the gold chain in ransom of her being with him. Mike catches Jamie in a lye when Jamie friend, Trisha shows up to pay her the money she has been owing. Mike must also learn that trusting Jamie with his money was a mistake. In the end we must decide whether Mike and Jamie relationship can be saved; or whether Jamie is really as crazy and a gold digger.','drama');
insert into imdb.note (hour_and_date, user_id, movie_id, note_id) values ('2020-09-17 12:12:10',1,1,3);
