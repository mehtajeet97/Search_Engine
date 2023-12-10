const createNode = () => {
	const node = new Map();
	node.set("results", new Map());
	return node;
};

class Trie {
	#root = createNode();
	constructor(files) {
		this.#buildTrie(files);
	}

	#buildTrie = (files) => {
		const processWord = (fileName, word) => {
			let current = this.#root;

			word.split("").forEach((char) => {
				let occurrence = 0;
				if (!current.has(char)) current.set(char, createNode());
				current = current.get(char);
				if (current.get("results").has(fileName))
					occurrence = current.get("results").get(fileName);
				current.get("results").set(fileName, occurrence + 1);
			});
		};

		const processTextSnippet = (fileName, fileData) => {
			fileData.forEach((word) => {
				processWord(fileName, word);
			});
		};

		files.forEach((file) => {
			processTextSnippet(file.file, file.data);
		});
	};

	getTrie = () => {
		return this.#root;
	};

	search = (text) => {
		const renderSearchResults = (resultMap) => {
			return Object.fromEntries(resultMap);
		};
		let trieMap = this.#root;
		text = text
			.split("")
			.map((char) => char.trim().toLowerCase())
			.filter((char) => char !== "")
			.join("");
		for (const letter of text.toLowerCase()) {
			if (!trieMap.has(letter)) {
				return renderSearchResults(new Map());
			}
			trieMap = trieMap.get(letter);
		}
		return renderSearchResults(trieMap.get("results"));
	};
}

module.exports = Trie;
