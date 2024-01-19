const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/saveData", (req, res) => {
  const inputData = req.body.data;

  // Zapisz dane do pliku dane.txt
  fs.writeFile("dane.txt", inputData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd podczas zapisywania danych do pliku.");
    } else {
      res.send("Dane zostały zapisane do pliku.");

      // Po zapisaniu danych, uruchom skrypt Pythona
      runPythonScript();
    }
  });
});

function runPythonScript() {
  const pythonScriptPath = './code_compile.py';

  // Komenda do uruchomienia skryptu Pythona uzależniona jest od tego, jak masz skonfigurowany swój system.
  const command = `python3 ${pythonScriptPath}`;
  // const command = `python ${pythonScriptPath}`;
  // const command = `py ${pythonScriptPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Błąd uruchamiania skryptu Pythona: ${error}`);
      return;
    }

    console.log(`Wynik: ${stdout}`);
    console.error(`Błędy: ${stderr}`);
  });
}

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
