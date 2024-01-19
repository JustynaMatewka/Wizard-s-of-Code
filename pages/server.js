const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/saveData", (req, res) => {
  const inputData = req.body.data;

  fs.writeFile("dane.txt", inputData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd podczas zapisywania danych do pliku.");
    } else {
      res.send("Dane zostały zapisane do pliku.");
    }
  });
});

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
