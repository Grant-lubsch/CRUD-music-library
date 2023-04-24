import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [songList, setSongList] = useState([]);

  const [newSong, setNewSong] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3006/api/get").then((response) => {
      setSongList(response.data);
    });
  }, []);

  const submitSong = () => {
    Axios.post("http://localhost:3006/api/insert", {
      songName: newSong,
      songArtist: newArtist,
      songGenre: newGenre,
    });

    setSongList([
      ...songList,
      { songName: songName, songArtist: songArtist, songGenre: songGenre },
    ]);
  };

  const deleteSong = (song) => {
    Axios.delete(`http://localhost:3006/api/delete/${song}`).then(() => {
      setSongList(
        songList.filter((val) => {
          return val.songName !== song;
        })
      );
    });
  };

  /*  const deleteSong = (song) => {
    Axios.delete(`http://localhost:3006/api/delete/${song}`);
  };

  /*  const handleUpdate = (song) => {
    Axios.put("http://localhost:3006/api/update", {
      songName: songName,
      songArtist: songArtist,
      songGenre: songGenre,
    });
    };


  const handleUpdate = (val) => {
    Axios.put("http://localhost:3006/api/update?id=" + val.id, {
      songName: newSong !== "" ? newSong : val.songName,
      songArtist: newArtist !== "" ? newArtist : val.songArtist,
      songGenre: newGenre !== "" ? newGenre : val.songGenre,
      id: val.id,
    }).then(() => {
      setSongList(
        songList.map((song) => {
          return song.id === val.id
            ? {
                ...song,
                songName: newSong !== "" ? newSong : val.songName,
                songArtist: newArtist !== "" ? newArtist : val.songArtist,
                songGenre: newGenre !== "" ? newGenre : val.songGenre,
              }
            : song;
        })
      );
    });
  };
*/
  return (
    <div className="App">
      <h1>Grant's Music Library</h1>

      <div className="form">
        <label>Song Name:</label>
        <input
          type="text"
          name="songName"
          onChange={(e) => {
            setSongName(e.target.value);
          }}
        />
        <label>Artist Name:</label>
        <input
          type="text"
          name="Artist"
          onChange={(e) => {
            setSongArtist(e.target.value);
          }}
        />
        <label>Genre:</label>
        <input
          type="text"
          name="Genre"
          onChange={(e) => {
            setSongGenre(e.target.value);
          }}
        />

        <button onClick={submitSong}>Submit</button>

        {songList.map((val) => {
          return (
            <div className="card">
              <h1>{val.songName}</h1>
              <p>Artist: {val.songArtist}</p>
              <p>Genre: {val.songGenre}</p>

              <button
                onClick={() => {
                  deleteSong(val.songName);
                }}
              >
                Delete
              </button>

              <input
                type="text"
                name="updateSong"
                placeholder="Update Song"
                onChange={(e) => {
                  setNewSong(e.target.value);
                }}
              />
              <input
                type="text"
                name="updateArtist"
                placeholder="Update Artist"
                onChange={(e) => {
                  setNewArtist(e.target.value);
                }}
              />
              <input
                type="text"
                name="updateGenre"
                placeholder="Update Genre"
                onChange={(e) => {
                  setNewGenre(e.target.value);
                }}
              />

              <button>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
