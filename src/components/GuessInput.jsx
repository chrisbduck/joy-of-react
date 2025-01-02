import React from "react";

export function GuessInput({ submitGuess, gameState }) {
	const [text, setText] = React.useState("");
	const onSubmit = event => {
		event.preventDefault();
		submitGuess(text);
		setText("");
	};

	return (
		<form className="guess-input-wrapper" onSubmit={onSubmit}>
			<label htmlFor="guess-input">Guess a five-letter word:</label>
			<input
				id="guess-input"
				type="text"
				value={text}
				pattern="[a-zA-Z]{5}"
				onChange={event => setText(event.target.value.toUpperCase())}
				disabled={gameState !== "active"}
			/>
		</form>
	);
}
