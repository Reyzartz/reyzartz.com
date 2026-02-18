import './style.css'
function getDistanceBetweenPoints(dot1, dot2, offset) {
	return Math.sqrt(
		Math.pow(dot1.x - dot2.x - offset, 2) +
		Math.pow(dot1.y - dot2.y - offset, 2)
	);
}

const leftEye = document.querySelector("#left-eye");

const leftPupil = document.querySelector("#left-pupil");

const rightEye = document.querySelector("#right-eye");

const rightPupil = document.querySelector("#right-pupil");

function calculateEyePosition(mousePos, eyePos, offset, pupilRad) {
	const dist = getDistanceBetweenPoints(mousePos, eyePos, offset);

	const boundryRad = offset - pupilRad * 2;

	if (dist <= boundryRad) {
		return {
			x: mousePos.x - pupilRad,
			y: mousePos.y - pupilRad,
			position: "fixed"
		};
	}

	const angle = Math.atan2(
		eyePos.y - mousePos.y + eyePos.height / 2,
		eyePos.x - mousePos.x + eyePos.width / 2
	);

	return {
		x: -boundryRad * Math.cos(angle) + (boundryRad - pupilRad),
		y: -boundryRad * Math.sin(angle) + (boundryRad - pupilRad),
		position: "absolute"
	};
}

window.addEventListener("mousemove", (e) => {
	const leftEyePos = leftEye.getBoundingClientRect();

	const leftPupilPos = calculateEyePosition(
		e,
		leftEyePos,
		leftEyePos.width / 2,
		leftPupil.getBoundingClientRect().width / 2
	);

	leftPupil.style.left = `${leftPupilPos.x}px`;
	leftPupil.style.top = `${leftPupilPos.y}px`;
	leftPupil.style.position = leftPupilPos.position;

	const rightEyePos = rightEye.getBoundingClientRect();

	const rightPupilPos = calculateEyePosition(
		e,
		rightEyePos,
		rightEyePos.width / 2,
		rightPupil.getBoundingClientRect().width / 2
	);

	rightPupil.style.left = `${rightPupilPos.x}px`;
	rightPupil.style.top = `${rightPupilPos.y}px`;
	rightPupil.style.position = rightPupilPos.position;
});

