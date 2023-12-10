# Search Engine

Basic NodeJS word search engine uses Trie as a Data Structure implemented using a JS Map that returns the number of times a word has appeared in a web page. The number of times a word has appeared is also the criteria for ranking the result, i.e., the page with the most occurrences for the searched word will be listed first.

## File System :

1. Readme - README.md file that provides a detailed explanation of the project and steps for its execution

2. Code - The '.js' files primarily app.js and trie.js have the code

3. Input - The folder 'input' which has been compressed and zipped contains multiple '.html' files which are used as input

4. Output - 'OUTPUT.md' file contains sample output obtained

5. Demo - Short Video explaining the execution of the project

## Static Data (Input Files)

For the purpose of this project, static HTML documents about Animals have been used but it could easily be changed based on requirement. The files are placed in the [`input` directory](./input/) which is zipped and needs to be unzipped prior to execution as detailed in the steps.

## DSA - Data Structure & Algorithms

The data structure used for this project is a [Trie](https://en.wikipedia.org/wiki/Trie) implemented using a JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). The implementation is in the file [`trie.js`](./trie.js). The map when viewed as a JavaScript object would look as follows:

```javascript
{
  a: {
    results: {}, // results for word 'a'
  },
  t: {
    h: {
      e: {
        results: {
          // results for word 'the'
          "Horse - Wikipedia.html": 2,
          "Wolf - Wikipedia.html": 1,
        },
      },
      results: {}, // results for word 'th'
    },
    results: {}, // results for word 't'
  },
}
```

Each key in the object has a `results` object that contains a key-value pair signifying the file name and number of times the word that is formed with the keys upto the current key has occurred. For the example above, the word formed at the key `e` would be `the`, and the `results` object tells us that the word has appeared twice and once in the files named `Horse - Wikipedia.html` and `Wolf - Wikipedia.html` respectively.

### Creating the Trie

The Trie preparation involves all the files in the input directory. The text in each file is cleaned as follows:

- remove all html tags
- convert all text to lower case
- remove all apostrophes (`'`)
- remove all [stop words](https://en.wikipedia.org/wiki/Stop_word)
- remove all non alpha numeric characters
- condense the file: remove all extra spaces, such as tabs (`\t`) and next lines (`\n`)

After this the list of words from the cleaned text for each file is added to the Trie as follows:

1. One word is taken at a time
2. Iterate over all the characters of the word starting from the first character
3. If the key already exists in the Map, we move into the the value Map for that key and continue iterating. Otherwise we initialize a key as the current letter and its value as a Map with a `results` key (which would be an empty Map)
4. Repeat step 3 till we reach the end of the word, at this stage we update the `results` Map of the final key as follows:

   - If the filename of the current file already exists in the `results` Map, then we increment the value by 1
   - Else, we add a key as current file's name and value as 1

### Searching the Trie

Getting the results for a word is very similar to how we created the Trie. We take the word user inputs, convert it to lowercase and iterate over it. We look for a key in the Map for each letter starting from the first letter and move onto the value Map for every match. At any point if there is no match, we return an empty result set. Otherwise, we keep iterating till we reach the last letter, at which stage we get the `results` Map at that key and print that in form of a table with file names sorted in descending order of number of occurrences.

## How to run

This is NodeJS project. So before running the project, make sure you have NodeJS setup. You can see the steps [here](https://nodejs.org/en/).

1. Double Tap on the 'input.zip' file or run the following command in the root directory:

```
unzip input.zip
```

This will provide the folder input which contains multiple .html files as input

2. Install dependecies. From the root directory, run the following command:

```
npm install
```

This will install all the packages required to run this project. The list of dependencies can be seen in [`package.json`](./package.json)

3. From the root directory, run the following command to start the application:

```
npm start
```

To stop searching, and quit the application you can input `:q`

## Sample Output

```
$ npm start

> search-engine@1.0.0 start
> node app.js

Reading files from: /Users/jeetmehta/Downloads/Job_Search/Projects/Search_Engine/input
✔ .DS_Store
✔ Ostrich - Wikipedia.html
✔ Horse - Wikipedia.html
✔ Wolf - Wikipedia.html
✔ Dog - Wikipedia.html
✔ Cheetah - Wikipedia.html


Enter the word you want to searh (Enter ':q' to quit): fastest

Search Result:
┌─────────┬────────────────────────────┬────────────┐
│ (index) │         File Name          │ Occurrence │
├─────────┼────────────────────────────┼────────────┤
│    0    │ 'Cheetah - Wikipedia.html' │     10     │
│    1    │  'Horse - Wikipedia.html'  │     3      │
│    2    │ 'Ostrich - Wikipedia.html' │     1      │
└─────────┴────────────────────────────┴────────────┘

```
