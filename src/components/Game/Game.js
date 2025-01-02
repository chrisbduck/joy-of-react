import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { Board } from "../Board";
import { GuessInput } from "../GuessInput";
import { Banner } from "../Banner";
import { NUM_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const initGuesses = () => {
	const guesses = [];
	for (let index = 0; index < 6; ++index) {
		guesses.push({ text: "     ", id: Math.random() });
	}
	return guesses;
};

function Game() {
	const [guesses, setGuesses] = React.useState(initGuesses);
	const [numGuesses, setNumGuesses] = React.useState(0);
	const submitGuess = text => {
		if (numGuesses >= NUM_GUESSES_ALLOWED) return;

		const newGuesses = [...guesses];
		newGuesses[numGuesses].text = text;
		setGuesses(newGuesses);
		const newNumGuesses = numGuesses + 1;
		setNumGuesses(newNumGuesses);

		if (text === answer) setGameState("won");
		else if (newNumGuesses === NUM_GUESSES_ALLOWED) setGameState("lost");
	};
	const [gameState, setGameState] = React.useState("active");

	return (
		<>
			<Board guesses={guesses} answer={answer} />
			<GuessInput submitGuess={submitGuess} gameState={gameState} />
			<Banner gameState={gameState} numGuesses={numGuesses} answer={answer} />
		</>
	);
}

export default Game;
