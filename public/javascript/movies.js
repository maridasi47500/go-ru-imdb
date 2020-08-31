router.get('/movies',function(req,res){

    var q=req.body;
    if (q.titre) {
    var name = q.titre.replace(' ','%').replace('%20','%');
    connection.query(
      SELECT * from movies WHERE name like ?,
      [name],
      function (err,data) {
      if (err) {
      }else {
    res.render('movies',{titre: 'Liste des résultats de films pour le titre "'+name+'"',films:data});
      }
    });
    }else{
    connection.query(
      SELECT * from movies,
      [name],
      function (err,data) {
      if (err) {
      }else {
    res.render('movies',{titre: 'Tous les films',films:data});
      }
    }
    });