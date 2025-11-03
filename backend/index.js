const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

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

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`server 들어왔다 포트:${PORT}`);
});
