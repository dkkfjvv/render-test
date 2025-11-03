const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: true,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/notes", (req, res) => {
  res.status(200).json(notes);
});

app.post("/api/notes", (req, res) => {
  console.log("post 들어왔다잇 최상단");

  const body = req.body;
  filterNotes = notes.filter((note) => Number(note.id));
  const newId = Math.max(...filterNotes) + 1;

  const note = {
    id: String(newId),
    content: body.content,
    important: body.important || false,
  };
  if (!body.content) {
    return res.status(400).send("컨텐트 비워짐");
  }
  notes.concat(note);
  console.log("찍히냐 post", body.content);
  res.status(201).json(note);
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`server 들어왔다 포트:${PORT}`);
});
