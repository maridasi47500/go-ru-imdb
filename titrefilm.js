/*app.js*/
app.get('/movies',function(req,res){

var q=req.body;
var name = q.titre;
res.render('movies',{titre: 'Liste des résultats pour "'+name+'"', titredufilm: name});
});
/*javascript de movies.ejs*/
window.onload = function(){

$.ajax({
    url: "https://yts.mx/api/v2/list_movies.json?query_term=<%= titredufilm%>",

    success:function(data){
        var movies = document.getElementById('movies-results')
        data.data.movies[0..4].forEach(movie=>{
            var name = movie.title;
            var description = movie.summary;
            var image = movie.large_cover_image;
            movies.innerHTML += "<div class="movie-result"><p>Titre : "+name+"</p><p>Description :</p><p>"+description+"</p></div>";
        });

    }
});
}
