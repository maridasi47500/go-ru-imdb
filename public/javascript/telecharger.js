$('#telechargertitre').submit(function(){
    var titredufilm = $('#titre-film').val();
alert(titredufilm);
    $.ajax({
        url: "https://yts.mx/api/v2/list_movies.json?query_term="+titredufilm,
    
        success:function(data){
var films = JSON.stringify(data.data.movies);
    
                $.ajax({url: "/download",data:{films},type:'POST',success:function(res){console.log(res)}})
    
        }
    });
    });
    $('#telechargergenre').submit(function(){
	var titredufilm = $('#genre-film').val();
	$.ajax({
	    url: "https://yts.mx/api/v2/list_movies.json?query_term="+titredufilm,
	
	    success:function(data){
var films = JSON.stringify(data.data.movies);
	
		    $.ajax({url: "/download",data:{films},type:'POST',success:function(){}});
	
	    }
	});
	});
