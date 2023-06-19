const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_MUSIC || "CRUDMusicLibrary",
});

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Get all contacts
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM music_library";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// Insert a new contact
app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const artist = req.body.artist;
  const genre = req.body.genre;

  const sqlInsert =
    "INSERT into music_library (songName, songArtist, songGenre) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, artist, genre], (err, result) => {
    console.log(result);
    res.send("Song added successfully!");
  });
});

// Update an existing contact
app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const artist = req.body.artist;
  const genre = req.body.genre;

  const sqlUpdate =
    "UPDATE music_library SET songName=?, songArtist=?, songGenre=? WHERE id=?";
  db.query(sqlUpdate, [name, artist, genre, id], (err, result) => {
    console.log(result);
    res.send("Song updated successfully!");
  });
});

// Delete an existing contact
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM music_library WHERE id=?";
  db.query(sqlDelete, id, (err, result) => {
    console.log(result);
    res.send("Song deleted successfully!");
  });
});

app.listen(3006, () => {
  console.log("Server running on port 3006");
});
