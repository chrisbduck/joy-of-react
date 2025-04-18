import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { Board } from "../Board";
import { GuessInput } from "../GuessInput";
import { Banner } from "../Banner";
import { RestartButton } from "../RestartButton";
import { NUM_GUESSES_ALLOWED } from "../../constants";
import { Keyboard } from "../Keyboard";
import { checkGuess } from "../../game-helpers";

const initAnswer = () => {
	const answer = sample(WORDS);
	console.info({ answer });
	return answer;
};

const initGuesses = () => {
	const guesses = [];
	for (let index = 0; index < 6; ++index) {
		guesses.push({ text: "     ", id: Math.random() });
	}
	return guesses;
};

function Game() {
	const [answer, setAnswer] = React.useState(initAnswer);
	const [guesses, setGuesses] = React.useState(initGuesses);
	const [numGuesses, setNumGuesses] = React.useState(0);
	const [gameState, setGameState] = React.useState("active");
	const [letterResults, setLetterResults] = React.useState({});

	const submitGuess = text => {
		if (numGuesses >= NUM_GUESSES_ALLOWED) return;

		const newGuesses = [...guesses];
		newGuesses[numGuesses].text = text;
		setGuesses(newGuesses);
		const newNumGuesses = numGuesses + 1;
		setNumGuesses(newNumGuesses);

		const newLetterResults = { ...letterResults };
		checkGuess(text, answer).forEach(({ letter, status }) => {
			// Overwrite existing status if there isn't one or if the new one is not incorrect.
			// This stops guesses with multiple letters overwriting the first letter's status.
			const overwrite = !newLetterResults[letter] || status !== "incorrect";
			if (overwrite) newLetterResults[letter] = status;
		});
		setLetterResults(newLetterResults);

		if (text === answer) setGameState("won");
		else if (newNumGuesses === NUM_GUESSES_ALLOWED) setGameState("lost");
	};

	const restartGame = () => {
		setAnswer(initAnswer());
		setGuesses(initGuesses());
		setNumGuesses(0);
		setGameState("active");
		setLetterResults({});
	};

	return (
		<>
			<RestartButton onClick={restartGame} isEnabled={numGuesses > 0} />
			<Board guesses={guesses} answer={answer} />
			<GuessInput submitGuess={submitGuess} gameState={gameState} />
			<Keyboard letterResults={letterResults} />
			<Banner gameState={gameState} numGuesses={numGuesses} answer={answer} />
		</>
	);
}

export default Game;
