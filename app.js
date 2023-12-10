const fs = require("fs/promises");
const path = require("path");
const textCleaner = require("text-cleaner");
const { htmlToText } = require("html-to-text");
const { removeStopwords } = require("stopword");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const Trie = require("./trie");

const filesDirectory = path.resolve("input");

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
    while (userInput !== ":q") {
      const result = await trie.search(userInput);
      console.log("\nSearch Result: ");
      const resultArr = Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => ({
          "File Name": entry[0],
          Occurrence: entry[1],
        }));
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
