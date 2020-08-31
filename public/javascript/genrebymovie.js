$('.liste-deroulante').on('change',function(){
$({url:"https://yts.mx/api/v2/list_movies.json?genre=%22+$(this).val(), success:function(data){
var films = data.data.movies[0..4];
var liste = [];
films.forEach(film=>{
var name = film.title;
var description = film.summary;
var image = film.large_cover_image;

movies.innerHTML += "<div class="movie-result"><img src=""+image+""><p>Titre : "+name+"</p><p>Description :</p><p>"+description+"</p></div>";

});

}})