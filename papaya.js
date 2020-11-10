class Papaya {
	constructor (alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") {
		this.generators = {
			lengthSpecifier (min, max) {return Math.round(Math.random() * (max - min) + min)},
			word (minLetters = 1, maxLetters = 10) {
				let length = this.lengthSpecifier(minLetters, maxLetters);
				let string = "";
				for (let i = 0; i < length; i++) string += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
				return string;
			},
			sentence (
				minLetters = 1, maxLetters = 10,
				minWords = 4, maxWords = 15
				) {
				let length = this.lengthSpecifier(minWords, maxWords);
				let string = "";
				for (let i = 0; i < length; i++) string += this.word(minLetters, maxLetters) + ((Math.random() < 0.1) ? "," : " ");
				return string + ".";
			},
			paragraph (
				minLetters = 1, maxLetters = 10,
				minWords = 4, maxWords = 15,
				minSentences = 6, maxSentences = 20
				) {
				let length = this.lengthSpecifier(minSentences, maxSentences);
				let string = "";
				for (let i = 0; i < length; i++) string += this.sentence(minLetters, maxLetters, minWords, maxWords);
				return string + "\n";
			}
		}
	}

	Init () {
		document.querySelectorAll("*[papaya]").forEach(elem => {
			let parameters = elem.getAttribute("papaya").split("-");
			for (let i = 0; i < parameters.length; i++) parameters[i] = parseInt(parameters[i])
			
			console.log(parameters);

			if (parameters.length == 2) 
				elem.innerHTML = this.generators.paragraph (
					parameters[0], parameters[1]
				);
			else if (parameters.length == 4) 
				elem.innerHTML = this.generators.paragraph (
					parameters[0], parameters[1],
					parameters[2], parameters[3]
				);
			else if (parameters.length == 6) 
				elem.innerHTML = this.generators.paragraph (
					parameters[0], parameters[1],
					parameters[2], parameters[3],
					parameters[4], parameters[5]
				);
			else elem.innerHTML = this.generators.paragraph();
		});
	}
}