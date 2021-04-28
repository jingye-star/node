const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const port = 3001;
const url = `mongodb+srv://zhangjingye:NRpBtntU8j0gqLSf@cluster0.bn6hs.mongodb.net/cloud?retryWrites=true&w=majority`;

app.use(cors())
app.use(express.static('build'))


app.use(urlencodedParser);
app.use(jsonParser);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});




const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
// app.get("/", async (req, res) => {
//   const notes = await Note.find({})
//   res.json(notes);
// });
app.get("/v2", async (req, res) => {
  const notes = await Note.find({})
  res.json(notes);
});
app.post("/add", async (req, res) => {
  const note = new Note(req.body);
  await note.save().then((res) => {
    console.log(res, "done");
  });
  res.send("done");
});

// app.listen(3001, function () {
//   //在3001端口启动
//   console.log("Example app listening on port 3001");
// });


module.exports = app
