const fs = require("fs/promises");
const path = require("path");
const textCleaner = require("text-cleaner");
const { htmlToText } = require("html-to-text");
const { removeStopwords } = require("stopword");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
/* Import Understanding:
promises - for reading files asynchronously
path - for path manipulation
text-cleaner - for cleaning text data
html-to-text - for converting HTML to text
stopword - for for removing stop words
readline - for reading user input
*/

const Trie = require("./trie");

// Acceses files within input folder or sets the path to input folder
const filesDirectory = path.resolve("input");

// Fn that reads the file and returns an array of words as clean data
const readFileData = async (file) => {
  const data = await fs.readFile(path.join(filesDirectory, file), "utf-8");
  const cleanData = removeStopwords(
    textCleaner(htmlToText(data))
      .toLowerCase()
      .removeApostrophes()
      .removeStopWords()
      .removeChars({ exclude: "0123456789", replaceWith: " " })
      .condense()
      .valueOf()
      .split(" ")
  );
  console.log(`✔ ${file}`);
  return cleanData;
};

// Fn that reads all the files and returns an array of objects containing file name and clean data
const readFiles = async (files) => {
  await Promise.all(
    files.map(async (file, index) => {
      const data = await readFileData(file);
      files[index] = {
        file,
        data,
      };
    })
  );
  return files;
};

// Fn that provides the search query for the user
const getUserInput = async () =>
  new Promise((resolve) => {
    readline.question(
      "\n\nEnter the word you want to searh (Enter ':q' to quit): ",
      resolve
    );
  });

const main = async () => {
  try {
    console.log(`Reading files from: ${filesDirectory}`);
    let files = await fs.readdir(filesDirectory);
    files = await readFiles(files);
    const trie = new Trie(files);
    let userInput = await getUserInput();
    //Loops through until the user input is ':q'
    while (userInput !== ":q") {
      //Trie.search is the search fn
      const result = await trie.search(userInput);
      console.log("\nSearch Result: ");
      const resultArr = Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => ({
          "File Name": entry[0],
          Occurrence: entry[1],
        })); // Sorts the output and maps it into a table
      if (resultArr.length > 0) console.table(resultArr);
      else console.log("Not found");
      userInput = await getUserInput();
    }
    readline.close();
  } catch (err) {
    console.error(err);
  }
};

main();
