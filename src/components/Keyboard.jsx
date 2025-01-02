import React from "react";

const LETTER_ROWS = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M"],
];

export function Keyboard({ letterResults }) {
	return (
		<div className="key-box">
			{LETTER_ROWS.map(row => (
				<div className="key-row" key={row[0]}>
					{row.map(letter => {
						const className = "key-item" + (letterResults[letter] ? ` ${letterResults[letter]}` : "");
						return (
							<div className={className} key={letter}>
								{letter}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
