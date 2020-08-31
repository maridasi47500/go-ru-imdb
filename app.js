var session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysql      = require('mysql');
var connection = mysql.createConnection({host     : 'localhost',user     : 'mary',password : 'mary5!!!',database:'imdb'});
connection.connect();
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('etag');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false,
  originalMaxAge: 365 * 24 * 60 * 60 * 1000,
  expires:false }
  
}));


app.post('/logout',function(req,res){
  if (req && req.session && req.session.loggedIn){
  req.session.destroy();
  res.send('vous etes a present deconnecte');
  } else {
      res.send('vous souhaitez vous connecter');
  }
  
  });
  
  app.get('/',function(req,res){
      var films;
      console.log(JSON.stringify(req.session)+"sessions");

  var userdecon =     !req.session.loggedIn;
  connection.query(
    `(select movie.id as id, movie.name as name, movie.release_date as release_date, null as username, null as note_id
from movie
ORDER BY release_date DESC
limit 20)
union
(select movie.id as id, movie.name as name, movie.release_date as release_date, most_recent_note.username, most_recent_note.note_id
 from movie join (
    select note.movie_id as movie_id, note.note_id as note_id, user.name as username
from note
      LEFT JOIN user ON note.user_id = user.id
    where hour_and_date in (
        select max(hour_and_date) from note group by movie_id
    )
) as most_recent_note
on movie.id = most_recent_note.movie_id);`,
    function (err,data) {
            if (err) {
                console.log('erreur avec la premiere requete');
          } else {
              if (data.length > 0) {
              res.render('index',{titre:'Bienvenue', userdecon: userdecon,films:data});
          }
          }
      }
              );
      console.log(films);

  });

  app.post('/', function(req,res){

    var userdecon =     !req.session.loggedIn;
    
  res.render('index',{titre:'Bienvenue', userdecon: userdecon});
  
  });
  

app.get('/list_movies',function(req,res){
  var q = req.body;
  var title = q.titre.replace(' ','%').replace('%20','%');
  connection.query(
    'SELECT * FROM movie WHERE name LIKE ?',
    [title],
    function (err,data) {
            if (err) {
              return null;
          } else {
        var list=[];
      data.forEach(res => {
        list.push({name: res['title'], description: res['description'], id: res['id'], image: res['image']});
      });
      res.json(list);
          }

    });
  });

  app.get('/movies',function(req,res){

    var q=req.body;
    if (q.titre) {
    var name = q.titre.replace(' ','%').replace('%20','%');
    connection.query(
      "SELECT * from movies WHERE name like ?",
      [name],
      function (err,data) {
      if (err) {
      }else {
    res.render('movies',{titre: 'Liste des résultats de films pour le titre "'+name+'"',films:data});
      }
    });
    }else{
    connection.query(
      "SELECT * from movies",
      [name],
      function (err,data) {
      if (err) {
      }else {
    res.render('movies',{titre: 'Tous les films',films:data});
      }
    }
    );
    }
});

app.post('/newlogin',function(req,res){
  var q = req.body;
console.log(q);
            var name = q.username;
console.log(name);
           var password = require("crypto").createHash("sha256").update(q.password).digest("hex");
console.log(password);

            connection.query(
              'SELECT * FROM user WHERE name = ? AND password = ?',
                    [name,password],
              function (err,data) {
                      if (err) {
console.log('erreur  SELECT * FROM imdb.user');
                    res.send("notok");
                    } else {
console.log('ok SELECT * FROM imdb.user');

                if (data.length > 0) {
                  //se connecter
                if (!req.session.login) {
                  req.session.login = {};
                }
                  req.session.login.username = name;
                  req.session.login.password = password;
                  req.session.login.id = data[0]['id'];
                      req.session.loggedIn = true;
                      req.session.save();
                  //revenir à la page précédente

                    console.log(req.session.login);
                    res.send("ok");
                } else {
                  //créer l'utilisateur 
                  connection.query(
                    `INSERT INTO user (name, password)
             VALUES
            ( ?, ?)`,
            
                    [name,password],
                    function (err,data) {
                      if (err) {
                        
                    res.send("notok");
                    } else {
                        
                    res.send("notok");
                    }
                  });

                }

                    }


              }
            );
            
            });
        
            app.get('/login',function(req,res){
              var q = req.body;
              
              res.render('login',{titre:'Connexion et inscription'});
              });


              app.post('/login',function(req,res){
                var q = req.body;
                
                res.render('login',{titre:'Connexion et inscription'});
                });


app.post('/new_movie',function(req,res){
var q = req.body;
var values = [q.name, q.description, q.image];
connection.query(
  `INSERT INTO movie (name, description, image)
 VALUES
( ?, ?, ?)`,
  values,
  function (err,data) {
        if (err) {
            res.send('error');
        } else {
            res.send(data);
        }

  }
);
});
	
//

// catch 404 and forward to error handler


app.get('/films/:id?',function(req,res){
    if(req.params.id)
    {
    console.log(req.session);

  var user_id, id = req.params.id,username,userdecon = !req.session.loggedIn;
    if (req.session && req.session.loggedIn && req.session.login) {
        user_id = req.session.login.id;
    }
      console.log(req.params, username);
  connection.query(
    
  `SELECT movie.id as id, movie.name as name, movie.description as description, movie.image as image, note.hour_and_date as hour_and_date, note.note_id as note, user.name as username
  FROM movie
  LEFT JOIN note ON movie.id = note.movie_id
  LEFT JOIN user ON note.user_id = user.id
  WHERE imdb.movie.id = ? ;`
    ,
    [id],
    function (err,data) {
    if (err) {
        console.log('erreur pas de film');
    var titrepage = "erreur";
res.render('note',{datafilm:null, titrepage:titrepage, notesdufilm: null,user_id: null});
    }else {
        console.log('unfilm');
        console.log(user_id+"user");
    if (data.length > 0) {
    var titrepage ='Fiche film de '+'"'+data[0]['name']+'"' || "";
      res.render('note',{datafilm:data[0], titrepage:titrepage, notesdufilm: data,user_id: user_id,userdecon:userdecon});
	} else {
	var titrepage = "erreur";
res.render('note',{datafilm:null, titrepage:titrepage, notesdufilm: null,user_id: null});
	}
    }
    });
  
    } else {
var q = req.query;
var titrefilm = q.titre,titrepage = 'Fiches film de '+'"'+String(titrefilm)+'"';

if (typeof titrefilm === "string") {
    titrefilm = '%'+titrefilm.toLowerCase().replace(' ','%')+'%';
}
console.log(String(titrefilm));
var genrefilm = q.genre;
console.log(String(genrefilm));
var films = [];
if (titrefilm) {
connection.query(
  `SELECT * from movie WHERE LOWER(name) like ?;`,

  
  [titrefilm],
  function (err,data) {
  if (err) {
  	
  }else {


res.render('movies',{titre: titrepage,films:data});
  }
  });
  } else if(genrefilm) {
      var genrefilmsql='%'+genrefilm.toLowerCase().replace(' ','%')+'%';
var titrepage = 'Fiches film pour le genre '+'"'+genrefilm+'"';
connection.query(
  `SELECT * from imdb.movie WHERE genre like ?`,
  [genrefilmsql],
  function (err,data) {
  if (err) {
  	
  }else {


res.render('movies',{titre: titrepage,films:data});
  }
  });
  } else {
    res.redirect(200,'/');
  }
}
});



  app.post('/new_note',function(req,res) {
    var q = req.query;
    console.log(JSON.stringify(q));
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var params = [date, q.user_id, q.film_id,q.note];
    console.log(JSON.stringify(params));
    connection.query(
      `INSERT INTO imdb.note (hour_and_date, user_id, movie_id,note_id) VALUES (?,?,?,?);`
      ,
      params,
      function (err,data) {
      if (err) {
    res.send('notok');
      }else {
    res.send('ok');
      };
      }
    );
  });
app.get('/download',function(req,res){
    var u = !req.session.loggedIn;
res.render('dl',{userdecon:u});

});
app.post('/download',function(req,res){
    var q=req.body,releasedate,yearrelease,name,image,genre='drama';
    var films = JSON.parse(q.films);
    console.log(films);
    films.forEach(film=>{
    yearrelease=String(film.year);
    releasedate = new Date("January 1, "+yearrelease+" 00:00:00").toISOString().slice(0, 19).replace('T', ' ');
    name=film.title;
    image=film.large_cover_image;
    genre=film.genres.join(' ');
    connection.query(
      `INSERT INTO movie (description,release_date,name,image,genre) VALUES (?,?,?,?,?);`
      ,
      [film.description_full,releasedate,name,image,genre],
      function (err,data) {
      if (err) {
          
      }else {
      };
      }
    );
    });
    res.send('drama');
});
    app.use(function(req, res, next) {
      next(createError(404));
    });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
