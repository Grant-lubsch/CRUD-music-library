const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "AsDfGh12!",
  database: "CRUDMusicLibrary",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM music_library";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const songName = req.body.songName;
  const songArtist = req.body.songArtist;
  const songGenre = req.body.songGenre;

  const sqlInsert =
    "INSERT into music_library (songName, songArtist, songGenre) VALUES (?, ?, ?)";
  db.query(sqlInsert, [songName, songArtist, songGenre], (err, result) => {
    console.log(result);
  });
});

const deleteSong = (song) => {
  Axios.delete(`http://localhost:3006/api/delete/${song.songName}`).then(
    (response) => {
      setSongList(songList.filter((s) => s.songName !== song.songName));
    }
  );
};

/*app.put("/api/update", (req, res) => {
  const id = req.params.id;
  const songName = req.body.songName;
  const songArtist = req.body.songArtist;
  const songGenre = req.body.songGenre;

  const sqlUpdate =
    "UPDATE music_library SET songName=?, songArtist=?, songGenre=? WHERE id=?";

  db.query(sqlUpdate, [songName, songArtist, songGenre, id], (err, result) => {
    console.log(result);
    res.send("Song updated!");
  });
});
*/
app.put("/api/update", (req, res) => {
  const id = req.query.id;
  const songName = req.body.songName;
  const songArtist = req.body.songArtist;
  const songGenre = req.body.songGenre;

  const sqlUpdate =
    "UPDATE music_library SET songName=?, songArtist=?, songGenre=? WHERE id=?";

  db.query(sqlUpdate, [songName, songArtist, songGenre, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating song");
    } else {
      console.log(result);
      res.send("Song updated!");
    }
  });
});

app.listen(3006, () => {
  console.log("running on port 3005");
});
