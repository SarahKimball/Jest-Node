const fs = require("fs");
const axios = require("axios");
const MarkovMachine = require("./markov");

let args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a file path or URL.");
  process.exit(1);
}

let input = args[0];

if (input.startsWith("http://") || input.startsWith("https://")) {
  generateTextFromURL(input);
} else {
  generateTextFromFile(input);
}

function generateTextFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err.message);
      process.exit(1);
    }
    generateText(data);
  });
}

async function generateTextFromURL(url) {
  try {
    const response = await axios.get(url);
    generateText(response.data);
  } catch (error) {
    console.error("Error fetching URL:", error.message);
    process.exit(1);
  }
}

function generateText(data) {
  let mm = new MarkovMachine(data);
  let text = mm.makeText();
  console.log(text);
}
