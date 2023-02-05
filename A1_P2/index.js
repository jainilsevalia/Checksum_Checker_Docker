const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(express.json());
app.listen(PORT);

app.post("/checksum-cal", (req, res) => {
  const { file } = req.body;
  fs.readFile(`./${file}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      var checksum = crypto.createHash("md5").update(data).digest("hex");
      console.log(checksum);
      res.status(200).send({ file: `${file}`, checksum: checksum });
    }
  });
});
