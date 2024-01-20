const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/saveData", (req, res) => {
  const inputData = req.body.data;

  // Save data to the "dane.txt" file
  fs.writeFile("dane.txt", inputData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd podczas zapisywania danych do pliku.");
    } else {
      // After saving data, run the Python script
      const pythonScriptPath = "./code_compile.py";
      // const command = `python3 ${pythonScriptPath}`;
      const command = `python ${pythonScriptPath}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Błąd uruchamiania skryptu Pythona: ${error}`);
          res.status(500).send("Błąd podczas uruchamiania skryptu Pythona.");
          return;
        }

        console.log(`Wynik: ${stdout}`);
        console.error(`Błędy: ${stderr}`);
        fs.readFile("result.txt", "utf8", (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Błąd podczas odczytu danych z pliku.");
          } else {
            // Send the data back to the client
            res.send(data);
          }
        });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
