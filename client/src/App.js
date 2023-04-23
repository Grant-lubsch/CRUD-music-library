import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Grant's Music Library</h1>

      <div className="form">
        <label>Song Name:</label>
        <input type="text" name="songName" />
        <label>Artist Name:</label>
        <input type="text" name="artistName" />
        <label>Genre:</label>
        <input type="text" name="genre" />
      </div>
    </div>
  );
}

export default App;
