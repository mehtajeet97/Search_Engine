const createNode = () => {
  const node = new Map();
  // Add a key "results" with another Map object to store file occurrences
  node.set("results", new Map());
  return node;
};

// Using a class to represent the Trie data structure
class Trie {
  // Private variable to store the root node
  #root = createNode();

  // Constructor takes an array of files as input
  constructor(files) {
    // Build the trie using the provided files
    this.#buildTrie(files);
  }

  // Private method to build the trie
  #buildTrie = (files) => {
    // Define a function to process a single word
    const processWord = (fileName, word) => {
      // Start at the root node
      let current = this.#root;

      // Loop through each character in the word
      for (const char of word.split("")) {
        // Check if the current node has the character
        if (!current.has(char)) {
          // Create a new node for the character if it doesn't exist
          current.set(char, createNode());
        }

        // Move to the child node for the current character
        current = current.get(char);

        // Get the occurrence count for the current file
        let occurrence = 0;
        if (current.get("results").has(fileName)) {
          occurrence = current.get("results").get(fileName);
        }

        // Increment the occurrence count for the file
        current.get("results").set(fileName, occurrence + 1);
      }
    };

    // Define a function to process the text snippet of a file
    const processTextSnippet = (fileName, fileData) => {
      // Process each word in the file data
      fileData.forEach((word) => processWord(fileName, word));
    };

    // Loop through each file in the input array
    files.forEach((file) => {
      // Process the text snippet of the file
      processTextSnippet(file.file, file.data);
    });
  };

  // Public method to access the root node
  getTrie = () => {
    return this.#root;
  };

  // Public method to search for a text in the trie
  search = (text) => {
    // Define a function to render the search results
    const renderSearchResults = (resultMap) => {
      return Object.fromEntries(resultMap);
    };

    // Start at the root node
    let trieMap = this.#root;

    // Convert the text to lowercase and remove whitespace
    text = text
      .split("")
      .map((char) => char.trim().toLowerCase())
      .filter((char) => char !== "")
      .join("");

    // Loop through each letter of the search text
    for (const letter of text.toLowerCase()) {
      // Check if the current node has the letter
      if (!trieMap.has(letter)) {
        // Return empty results if no matching path exists
        return renderSearchResults(new Map());
      }

      // Move to the child node for the current letter
      trieMap = trieMap.get(letter);
    }

    // Return the results map with file occurrences
    return renderSearchResults(trieMap.get("results"));
  };
}

// Export the Trie class for use in other modules
module.exports = Trie;
