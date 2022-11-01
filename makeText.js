/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const {MarkovMachine} = require("./markov");
const axios = require("axios");

function makeTextFromFile(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        let markov = new MarkovMachine(data);
        console.log(markov.makeText());
    });
}

async function makeTextFromUrl(path){
  try {
    let response = await axios.get(path);
    let markov = new MarkovMachine(response.data);
    console.log(markov.makeText());
  } catch {
    console.error(err);
    process.exit(1);
  }
}

let path = process.argv[3];

if(process.argv[2] == "file"){
  makeTextFromFile(path);
} else if(process.argv[2] == "url"){
    makeTextFromUrl(path);
} else{
    console.log("use either 'file' or 'url' before a path to designate the type of source");
}