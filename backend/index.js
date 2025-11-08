require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const Note = require("./models/note.js");

//////
//////mongo
////////// models.mongo.js에 넣어놔서 주석처리해보자

// const mongoose = require("mongoose");

// // DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const password = process.argv[2];
// const url = `mongodb+srv://fullstack:${password}@cluster0.tqjqxo4.mongodb.net/noteApp?appName=Cluster0`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

//////////////
//////////
/////

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
  //mongo
  Note.find({}).then((result) => {
    res.status(200).json(result);
  });
});

// app.get("/api/notes/:id", (req, res) => {
//   Note.findById(req.params.id)
//     .then((note) => {
//       if (note) {
//         res.status(200).json(note);
//       } else {
//         console.log("아이디없는거찾음: ", error);
//         res.status(404).end();
//       }
//     })
//     .catch((error) => {
//       console.log("아이디 포맷이 잘못되었습니다", error);
//       res.status(400).end();
//     });
// });

/**오류처리 next추가 */
app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.status(200).json(note);
      } else {
        console.log("아이디없는거찾음: ", error);
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log("아이디 포맷이 잘못되었습니다", error);
      res.status(400).end();
    });
});

// app.post("/api/notes", (req, res) => {
app.post("/api/notes", (req, res, next) => {
  console.log("post 들어왔다잇 최상단");

  let body = req.body;
  // filterNotes = notes.filter((note) => Number(note.id));
  // let newId = Math.max(...filterNotes) + 1;
  ///// id는 알아서 만드니까?

  // const note = {
  //   id: String(newId),
  //   content: body.content,
  //   important: body.important || false,
  // };
  if (!body.content) {
    return res.status(400).send("컨텐트 비워짐");
  }

  //mongo
  // const mongoNote = new Note({
  //   id: String(newId),
  //   content: body.content,
  //   important: body.important || false,
  // });
  let mongoNote = new Note({
    content: body.content,
    important: body.important || false,
  });
  console.log("mongoNote", mongoNote);

  mongoNote
    .save()
    .then((result) => {
      console.log("result", result);

      // notes.concat(mongoNote); // 어짜피 db쓴다는 가정이니까..?
      console.log("찍히냐 post", body.content);

      /**db에서온 result는 저장된 새 노트객체로 toJSON메서드에 의해 자동으로 포맷된 버전 */
      // res.status(201).json(mongoNote);
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log("error:::", error);
      console.log("error Message: ", error.message);
      console.log("error.name::", error.name);

      next(error); //* 추가했음
    });
  /////

  // notes.concat(note);
  // console.log("찍히냐 post", body.content);
  // res.status(201).json(note);
});

// const PORT = process.env.port || 3001;

/** error 핸들러 */
const errorHandler = (error, request, response, next) => {
  console.log("error메세지:", error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformateed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler); // 마지막에 오류핸들러를 등록하는데 미들웨어랑 라우터도 정의된 이후로 정의

const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`server 들어왔다 포트:${PORT}`);
});
