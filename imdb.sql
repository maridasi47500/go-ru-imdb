CREATE SCHEMA `imdb` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE imdb.user
(
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(100),
    image VARCHAR(100),
    password VARCHAR(255),
    email VARCHAR(255)
)

CREATE TABLE imdb.note
(
    id INT PRIMARY KEY NOT NULL,
    hour_and_date DATETIME,
    user_id INTEGER UNIQUE NOT NULL,
    movie_id INTEGER UNIQUE NOT NULL,
    note_id INTEGER UNIQUE NOT NULL

)

CREATE TABLE imdb.movie(    id INT PRIMARY KEY NOT NULL,   name VARCHAR(255),    image TEXT,    description TEXT);

/*utilisateurs */

INSERT INTO imdb.user (name, image, password, email)
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
)

INSERT INTO imdb.user (name, image, password, email) VALUES(  'Rébecca',  './image/Rebecca',  '236270d0ba8016f8588b8900e1ae4765d55a92e644e4de469d0c01a5bab54ff2',  'rebecca@example.com'),(  'Aimée',  './image/Aimee',  '3f425e90d8bb18bd2ec3bf68e2703512267b9a6a2a7ff3208041e26f987cef31',  'aimee@example.com'),(  'Marielle',  './image/Marielle',  '9629cd6a6160dbe0482ccdaef7eff8ca1e8abafe13422eba56c588090d80a279',  'marielle@example.com'),(  'Hilaire',  '.image/Hilaire',  'e40577994dddfa074aa8282f8f387bdca9506acb53c455f53391fd678d3338ee',  'hilaire@example.com'),(  'John',  '.image/John',  'a8cfcd74832004951b4408cdb0a5dbcd8c7e52d43f7fe244bf720582e05241da',  'john@example.com'),(  'Jane',  '.image/Jane',  '4f23798d92708359b734a18172c9c864f1d48044a754115a0d4b843bca3a5332',  'jane@example.com'),(  'Brad',  '.image/Brad',  'cc90e81847433c9734a4d93d18d27018501cc7bf2285fac6499183ed63a8cce1',  'brad@example.com'),(  'Jack',  '.image/Jack',  'b5fd03dd91df1cfbd2f19c115d24d58bbda01a23fb01924bb78b2cc14f7ff1cb',  'jack@example.com'),(  'Joe',  '.image/Joe',  '6dd8b7d7d3c5c4689b33e51b9f10bc6a9be89fe8fa2a127c8c6c03cd05d68ace',  'joe@example.com'),(  'Sandra',  '.image/Sandra',  '1f02e917fd21530620990a81a8ddce4a8cb1f0e57770e393877e4a68a2984ff8',  'sandra@example.com');