window.onload = function(){
$("form").submit(function(){
var query = "?note="+$("#note").val()+"&user_id="+$("#user_id").val()+"&film_id="+$("#film_id").val();
$.ajax({
    url: "/new_note"+query,
    type:"POST",
    dataType:"html",
    success:function(){
    }
});

return false;
});
};