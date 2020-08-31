/*movies.js dans movies.ejs*/
window.onload = function(){

$.ajax({
	url: "/list_movies?"+window.location.search,

	success:function(data){
		var movies = document.getElementById('movies-results')
		data.forEach(movie=>{
			var name = movie.name;			
			var id = movie.id;
			var image = movie.image;
			var description = movie.description;
			movies.innerHTML += "<div class=\"movie-result\"><a href=\"/movies/"+id+"\">"+title+"</a><p>Description :</p><p>"+description+"</p></div>";
		});
		
	}
});
}
/*node dans app.js*/
router.get('/list_movies',function(){
var q = req.body;
var title = q.titre.replace(' ','%').replace('%20','%')
connection.query(
  'SELECT * FROM `movies` WHERE `name` LIKE ?',
  [title],
  function (err,data) {
          if (err) {
            return null;
        } else {
	  	var list=[];
		data.forEach(res => {
			list.push({name: res['title'], description: res['description'], id: res['id'], image: res['image']})
		});
		res.json(list);
        }


  }
);
});
/*scraper dans un fichier javascript*/
$.ajax({
	url: "https://yts.mx/api/v2/list_movies.json?query_term=ali%20g",

	success:function(data){
		var movies = document.getElementById('movies-results')
		data.data.movies[0..4].forEach(movie=>{
			var name = movie.title;
			var description = movie.summary;
			var image = movie.large_cover_image;

			$.ajax({
				url:'/new_movie?name='+name+'&description='+description+'&image='+image
			})
		});
		
	}
});
/*node dans app.js*/
router.post('/new_movie',function(){
var q = req.body;
var values = [q.name, q.description, q.image];
connection.query(
  `INSERT INTO movies (name, description, image)
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
=================================================================
FAIRE UNE RECHERCHE SUR LES TITRES DE FILMS
==========================================
router.get('/movies',function(req,res){

var q=req.body;
var name = q.titre.replace(' ','%').replace('%20','%');
connection.query(
  `SELECT * from movies WHERE name like ?`,
  [name],
  function (err,data) {
  if (err) {
  }else {
res.render('movies',{titre: 'Liste des résultats de films pour le titre "'+name+'"',films:data});
  }
});

/*code de la vue*/
<h1><%= titre %></h1>
<section class="movies-results">

<% films.forEach(function(film) { %>
<div class="movie-result">
<p><img src="" alt="poster de <%= film['name'] %>"></img></p>
<p class="title-movie"><%= film['name']%></p>
<p class="description-movie"><%= film['description'] %></p>
</div>
<%};%>

===========================================================

========================================
TELECHARGER LES INFOS DES FILMS PAR TITRE
=========================================
/*code html*/
<input type="text" name="titre-film" id="titre-film"/ value="">
<button class="telecharger-infos">Télécharger des infos de films</button>

/*code javascript*/

$('button.telecharger-infos').on('click', function(){
var titredufilm = $('#titre-film').val();
$.ajax({
    url: "https://yts.mx/api/v2/list_movies.json?query_term="+titredufilm,

    success:function(data){

        data.data.movies[0..4].forEach(movie=>{
            var name = movie.title;
            var description = movie.summary;
            var image = movie.large_cover_image;
            $.ajax({url: "/new_movie?name="+name+"&description="+description+"&image="+image})
        });

    }
});
}
========================================





========================================

/*a rajouter pour faire marcher sql*/
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'spectator',
  password : 'ticketdecinema',
  database:'imdb'
  
});
connection.connect();
module.exports = connection;



