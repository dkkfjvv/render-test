// import { useState, useEffect } from "react";
// import axios from "axios";
// import Note from "./components/Note";
// import notesService from "./services/notes";

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("");
//   const [showAll, setShowAll] = useState(true);
//   console.log("notes는:  ", notes);

//   useEffect(() => {
//     console.log("effect");
//     // axios.get("http://localhost:3001/notes").then((response) => {
//     //   console.log("promise fulfilled");
//     //   setNotes(response.data);
//     // });
//     notesService.getAll().then((response) => {
//       setNotes(response.data);
//     });
//   }, []);
//   console.log("render", notes.length, "notes");

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: Math.random() > 0.5,
//       // id: String(notes.length + 1),
//     };
//     axios.post("http://localhost:3001/notes", noteObject).then((response) => {
//       console.log(response);
//       console.log("what");
//     });

//     setNotes(notes.concat(noteObject));
//     setNewNote("");
//   };

//   const handleNoteChange = (event) => {
//     setNewNote(event.target.value);
//   };

//   // const toggleImportanceOf = (id) => {
//   //   const url = `http://localhost:3001/notes/${id}`;
//   //   const findObject = notes.find((note) => note.id === id);
//   //   console.log("findobject는", findObject);

//   //   const replaceObject = { ...findObject, important: !findObject.important };
//   //   console.log("replaceobject는", replaceObject);

//   //   const replaceNotes = notes.filter((note) => note.id !== id);
//   //   console.log("replaceNotes느?: ", replaceNotes);
//   //   console.log("notes전은:", notes);

//   //   axios
//   //     .put(url, replaceObject)
//   //     .then(setNotes([...replaceNotes, replaceObject]));
//   //   console.log(`importance id ${id} is importance`);
//   // };

//   //
//   //
//   //
//   const toggleImportanceOf = (id) => {
//     const url = `http://localhost:3001/notes/${id}`;
//     const note = notes.find((n) => n.id === id);
//     const changedNote = { ...note, important: !note.important };

//     axios.put(url, changedNote).then((response) => {
//       setNotes(notes.map((note) => (note.id === id ? changedNote : note)));
//     });
//   };

//   //
//   //
//   //

//   const notesToShow = showAll ? notes : notes.filter((note) => note.important);

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? "important" : "all"}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map((note) => (
//           <Note
//             key={note.id}
//             note={note}
//             toggleImportanceOf={() => toggleImportanceOf(note.id)}
//           />
//         ))}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange} />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  // //
  // const [message, setMessage] = useState("");
  // //
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // //
  // const addMessage = () => {};
  // //

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      {/* <div>{message}</div> */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
