import React from "react";

export function RestartButton({ onClick, isEnabled }) {
	return (
		<div className="restart-button-container">
			<button className="restart-button" onClick={onClick} disabled={!isEnabled}>
				Restart
			</button>
		</div>
	);
}
