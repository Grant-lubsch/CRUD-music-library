import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [songList, setSongList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    Axios.get("http://localhost:3006/api/get").then((response) => {
      setSongList(response.data);
    });
  }, []);

  const submitInfo = () => {
    Axios.post("http://localhost:3006/api/insert", {
      songName: songName,
      songArtist: songArtist,
      songGenre: songGenre,
    }).then(() => {
      setSongList([
        ...songList,
        { songName: songName, songArtist: songArtist, songGenre: songGenre },
      ]);
      setSongName("");
      setSongArtist("");
      setSongGenre("");
    });
  };

  const handleUpdate = (id) => {
    setEditing(true);
    setEditId(id);
    const songToUpdate = songList.find((val) => val.id === id);
    setSongName(songToUpdate.songName);
    setSongArtist(songToUpdate.songArtist);
    setSongGenre(songToUpdate.songGenre);
  };

  const handleUpdateSubmit = () => {
    Axios.put(`http://localhost:3006/api/update/${editId}`, {
      songName: songName,
      songArtist: songArtist,
      songGenre: songGenre,
    }).then(() => {
      setSongName("");
      setSongArtist("");
      setSongGenre("");
      setEditId(null);
      setEditing(false);
      Axios.get("http://localhost:3006/api/get").then((response) => {
        setSongList(response.data);
      });
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3006/api/delete/${id}`).then(() => {
      Axios.get("http://localhost:3006/api/get").then((response) => {
        setSongList(response.data);
      });
    });
  };

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (id === "next" && currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(id)) {
      setCurrentPage(Number(id));
    }
  };

  const handleNext = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePrev = () => {
    setCurrentPage((page) => page - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = songList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(currentPage + 2, Math.ceil(songList.length / itemsPerPage));
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>Grant's Music Library</h1>
      <div className="info">
        <input
          type="text"
          name="songName"
          placeholder="Song Name:"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <input
          type="text"
          name="songArtist"
          placeholder="Artist:"
          value={songArtist}
          onChange={(e) => setSongArtist(e.target.value)}
        />
        <input
          type="text"
          name="songGenre"
          placeholder="Genre:"
          value={songGenre}
          onChange={(e) => setSongGenre(e.target.value)}
        />
        {editing ? (
          <button onClick={handleUpdateSubmit}>Update Contact</button>
        ) : (
          <button onClick={submitInfo}>Submit Contact</button>
        )}
        <br />
        <table border="1">
          <thead>
            <tr>
              <td>Song Title</td>
              <td>Artist</td>
              <td>Genre</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.songName}</td>
                  <td>{val.songArtist}</td>
                  <td>{val.songGenre}</td>
                  <td>
                    <button onClick={() => handleUpdate(val.id)}>Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleDelete(val.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <nav>
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-item disabled" : "page-item"
                }
              >
                <button className="page-link" onClick={handlePrev}>
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => {
                if (number < currentPage - 1 || number > currentPage + 1) {
                  return null;
                }
                return (
                  <li
                    key={number}
                    className={
                      currentPage === number ? "page-item active" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      id={number}
                      onClick={handleClick}
                    >
                      {number}
                    </button>
                  </li>
                );
              })}
              <li
                className={
                  currentPage === pageNumbers.length
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <button className="page-link" onClick={handleNext}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
