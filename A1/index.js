const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`it's Working`);
});

app.get("/checksum", (req, res) => {
  res.status(200).send({
    file: "You have to submit File name through POST request in JSON Formate.",
  });
});

app.post("/checksum", (req, res) => {
  const { file } = req.body;
  if (!file) {
    res.status(403).send({ file: null, error: "Invalid JSON input." });
  }
  if (fs.existsSync(`./${file}`)) {
    axios
      .post("http://server:8000/checksum-cal", {
        file: `${file}`,
      })
      .then(function (response) {
        console.log(response);
        res
          .status(200)
          .send({ file: response.data.file, checksum: response.data.checksum });
      })
      .catch(function (error) {
        console.log(error);
      });
    return;
  } else {
    res.status(404).send({ file: `${file}`, error: "File not found." });
  }
});
