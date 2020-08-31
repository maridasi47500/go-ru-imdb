/*details.ejs*/
<section class="details-film">
<p><img src="<%= image %>" alt="poster de <%= titre du film %>"></src></p>
<h1>Détails du film "<%= titredufilm %>"</h1>
<p>Description : <%= description %></p>
</section>
<section class="notes-du-film">
<p>note du film : </p>
<% notesdufilm.forEach(function(notedufilm) { %>

<p><%= notedufilm.username %> - <%= notedufilm.note %> - le <%=notedufilm.hour_and_date %></p>

</div>
<%});%>
</section>
<section class="noter-un-film">
<p>Notez le film !</p>
<form class="form-notation" action="/new_note" method="post" onsubmit="return false;">
<label for="note">Note du film :</label>
<input type="number" name="note" id="note" value="" required>


<input type="hidden" name="film_id" id="film_id" value="<%= film_id %>">

<input type="hidden" name="user_id" id="user_id" value="<%= user_id %>">
 <input name="envoyer" id="envoyer" type="submit">
</form>

<% if (user_id) {%>
<script src="/javascript/noterlefilm.js"/>
<%};%>

/*app.js*/
router.get('/films/:id',function(req,res) {
var user_id, id = req.params.id;

if (req.session.username) {
connection.query(
  `SELECT * from users WHERE name = ?`, [req.session.username],
  function (err,data) {
  if (err) {
  }else {
  	user_id = data[0]['id'];
}
});

connection.query(
  `SELECT * from movies WHERE id = ?
  SELECT movies.id as id, movies.name as name, movies.image as image, notes.hour_and_date as hour_and_date, notes.note as note, users.name as username
FROM movies
LEFT JOIN notes ON movies.id = notes.movie_id
LEFT JOIN users ON notes.user_id = users.id
WHERE movies.id = ?
  `,
  [id],
  function (err,data) {
  if (err) {
  }else {
  var film = data[0];
  var film_id = film['id'];
  var titredufilm = film['name'];
  var image = film['image'];
  var notes = [];
  data.forEach(function(note){
  notes.push({username: note['username'], hour_and_date: note['hour_and_date'], note: note['note']});
  });
res.render('movies',{titre: 'Fiche film de '+'"'+titre+'"',film_id:film_id, titredufilm: titredufilm, image: image, notesdufilm: notes,user_id: user_id});
  }
});

});

router.post('/new_note',function(req,res) {
var q = req.body;
var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  `INSERT INTO notes (hour_and_date, note, user_id,movie_id)
VALUES (?,?,?,?)
  `,
  [date, q.note, q.user_id, q.movie_id],
  function (err,data) {
  if (err) {
res.redirect('/films/'+q.film_id);
  }else {
res.redirect('/films/'+q.film_id);
  });

});

/*details*/
var form = document.getElementsByTagName[0];
form.on('submit',function(){
$(this).submit();
});
