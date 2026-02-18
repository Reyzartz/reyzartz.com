import "./style.css";

interface Point {
  x: number;
  y: number;
}

interface EyePosition {
  x: number;
  y: number;
  position: "fixed" | "absolute";
}

function getDistanceBetweenPoints(
  dot1: Point,
  dot2: Point,
  offset: number,
): number {
  return Math.sqrt(
    Math.pow(dot1.x - dot2.x - offset, 2) +
      Math.pow(dot1.y - dot2.y - offset, 2),
  );
}

function calculateEyePosition(
  mousePos: Point,
  eyePos: DOMRect,
  offset: number,
  pupilRad: number,
): EyePosition {
  const dist = getDistanceBetweenPoints(mousePos, eyePos, offset);
  const boundryRad = offset - pupilRad * 2;

  if (dist <= boundryRad) {
    return {
      x: mousePos.x - pupilRad,
      y: mousePos.y - pupilRad,
      position: "fixed",
    };
  }

  const angle = Math.atan2(
    eyePos.y - mousePos.y + eyePos.height / 2,
    eyePos.x - mousePos.x + eyePos.width / 2,
  );

  return {
    x: -boundryRad * Math.cos(angle) + (boundryRad - pupilRad),
    y: -boundryRad * Math.sin(angle) + (boundryRad - pupilRad),
    position: "absolute",
  };
}

const leftEye = document.querySelector<HTMLElement>("#left-eye");
const leftPupil = document.querySelector<HTMLElement>("#left-pupil");
const rightEye = document.querySelector<HTMLElement>("#right-eye");
const rightPupil = document.querySelector<HTMLElement>("#right-pupil");

if (leftEye && leftPupil && rightEye && rightPupil) {
  const leftPupilRad = leftPupil.getBoundingClientRect().width / 2;
  const rightPupilRad = rightPupil.getBoundingClientRect().width / 2;

  function updatePupilPosition(
    pupil: HTMLElement,
    eyePos: DOMRect,
    offset: number,
    pupilRad: number,
    mousePos: Point,
  ): void {
    const pos = calculateEyePosition(mousePos, eyePos, offset, pupilRad);
    pupil.style.left = `${pos.x}px`;
    pupil.style.top = `${pos.y}px`;
    pupil.style.position = pos.position;
  }

  window.addEventListener("mousemove", (e) => {
    const leftEyePos = leftEye.getBoundingClientRect();
    updatePupilPosition(
      leftPupil,
      leftEyePos,
      leftEyePos.width / 2,
      leftPupilRad,
      e,
    );

    const rightEyePos = rightEye.getBoundingClientRect();
    updatePupilPosition(
      rightPupil,
      rightEyePos,
      rightEyePos.width / 2,
      rightPupilRad,
      e,
    );
  });
}
