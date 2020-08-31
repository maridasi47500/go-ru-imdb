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

/*dans */

