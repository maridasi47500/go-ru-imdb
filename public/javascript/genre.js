window.onload = function(){
    $("#movies-select").change(function(){
     
    window.location = "/films?genre="+$(this).val();
      });
    };