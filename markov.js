// markov.js
class MarkovMachine {
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    makeChains() {
      this.chains = {};
      for (let i = 0; i < this.words.length - 1; i++) {
        let word = this.words[i];
        let nextWord = this.words[i + 1];
        if (!this.chains[word]) {
          this.chains[word] = [];
        }
        this.chains[word].push(nextWord);
      }
      let lastWord = this.words[this.words.length - 1];
      if (!this.chains[lastWord]) {
        this.chains[lastWord] = [null];
      } else {
        this.chains[lastWord].push(null);
      }
    }
  
    makeText(numWords = 100) {
      let startWord = this._getRandomWord();
      let output = [startWord];
      while (output.length < numWords) {
        let currentWord = output[output.length - 1];
        if (!this.chains[currentWord]) break;
        let nextWord = this._getRandomWordFromChain(this.chains[currentWord]);
        if (nextWord === null) break;
        output.push(nextWord);
      }
      return output.join(" ");
    }
  
    _getRandomWord() {
      let words = Object.keys(this.chains);
      let randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    }
  
    _getRandomWordFromChain(chain) {
      let randomIndex = Math.floor(Math.random() * chain.length);
      return chain[randomIndex];
    }
  }
  
  module.exports = MarkovMachine;
  