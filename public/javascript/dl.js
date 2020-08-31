window.onload=function(){
function decon(){
    $.ajax({
       url : '/logout',
       type : 'POST',
       dataType : 'html',
success:function(res){
if (res && res==="vous souhaitez vous connecter") {
window.location="/login";
} else if (res && res==="vous etes a present deconnecte") {
window.location="/";
}
}});


};

function save(films){
$.ajax({
url:'/download',
type:'POST',
data:films,
dataType:'json'
}
);
};

$('form').submit(function(){
var params=$(this).serialize();
console.log(params);
$.ajax({
url:'https://yts.mx/api/v2/list_movies.json?limit=20&'+params,
type:'GET',
dataType:'json',
success:function(data){
    if (data && data.data && data.data.movies) {
var films=data.data.movies;
save({films:JSON.stringify(films)
    });
        window.location="/";

    }
}
});
});
};