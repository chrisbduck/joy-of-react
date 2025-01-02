import React from "react";

import { checkGuess } from "../game-helpers";

export function Board({ guesses, answer }) {
	return (
		<div className="guess-results">
			{guesses.map(guess => {
				const results = checkGuess(guess.text, answer);
				return (
					<p className="guess" key={guess.id}>
						{results.map((result, index) => (
							<span key={index} className={`cell ${result.status}`}>
								{result.letter}
							</span>
						))}
					</p>
				);
			})}
		</div>
	);
}
