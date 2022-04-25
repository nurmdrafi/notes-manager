import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    // GET Method 🐼
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [isReload]);

  // handleSearch by query 🐼
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    // clear input
    e.target.searchText.value = "";
    fetch(`http://localhost:5000/notes?userName=${searchText}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };

  // DELETE Method 🐼
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/note/${id}`, {
      method: "DELETE",
    });
    setIsReload(!isReload);
  };

  // POST Method 🐼
  const handlePost = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const textData = e.target.textData.value;
    // clear input
    e.target.userName.value = "";
    e.target.textData.value = "";

    fetch("http://localhost:5000/note", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({ userName, textData }),
      /* body:JSON.stringify({
        "userName": userName,
        "textData": textData
      }) */
    }).then((res) => res.json());
    // .then((data) => console.log(data));
    setIsReload(!isReload);
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            handleDelete={handleDelete}
            isReload={isReload}
            setIsReload={setIsReload}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
