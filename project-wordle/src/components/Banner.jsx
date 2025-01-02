import React from "react";

export function Banner({ gameState, numGuesses, answer }) {
	switch (gameState) {
		case "won":
			return (
				<div class="happy banner">
					<p>
						<strong>Congratulations!</strong> Got it in
						<strong> {numGuesses} guesses</strong>.
					</p>
				</div>
			);
		case "lost":
			return (
				<div class="sad banner">
					<p>
						Sorry, the correct answer is <strong>{answer}</strong>.
					</p>
				</div>
			);
		default:
			return null;
	}
}
