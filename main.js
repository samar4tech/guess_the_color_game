"use strict";
const startBtn = document.querySelector(".start");
const tryAgain = document.querySelector(".try");
const color_code = document.querySelector(".color_code");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const fourth = document.querySelector(".fourth");
const fifth = document.querySelector(".fifth");
const sixth = document.querySelector(".sixth");
const color_box_container = document.querySelector(".color_box");
// console.log(startBtn, tryAgain, color_box_container);
///////////////////////////////////////
let realColor;
const arr = [one, two, three, fourth, fifth, sixth];
////////////////////////////////////////

const setColor = () => {
  tryAgain.style.border = "";
  realColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  console.log(realColor);
  color_code.textContent = realColor;

  const randomSelectedBoxIndex = Math.trunc(Math.random() * 6);
  console.log(randomSelectedBoxIndex);
  const randomSelectedBox = arr[randomSelectedBoxIndex];
  randomSelectedBox.style.backgroundColor = realColor;
  arr.forEach((e) => {
    if (e != randomSelectedBox)
      e.style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
  });
};
/////////tryagain handler /////////////////
const reRender = () => {
  if (color_box_container.classList.contains("hidden")) {
    return;
  }
  color_box_container.addEventListener("click", checkColor);
  setColor();
};

///////generate random no b/w 0 to 255////
const randomColor = () => {
  return Math.trunc(Math.random() * 255 + 1);
};

//////////////////////////////////////////

const createColor = () => {
  if (!color_box_container.classList.contains("hidden")) {
    return location.reload();
  }
  color_box_container.classList.remove("hidden");
  setColor();
};

////////////////////////////////////////////////
//////////////use event delegation to click on a color box////
const checkColor = (e) => {
  if (e.target.classList.contains("box")) {
    if (realColor === e.target.style.backgroundColor) {
      console.log("samar");
      arr.forEach((e) => {
        console.log(e);
        e.style.backgroundColor = realColor;
      });
      color_code.textContent = "You Rock";
    } else {
      color_code.textContent = "Wrong Guess";
      tryAgain.style.border = "1px solid red";
      color_box_container.removeEventListener("click", checkColor);
    }
  }
};

/////////////////////////////start button//////////////
startBtn.addEventListener("click", createColor);
/////////////////////////////try again button/////////
tryAgain.addEventListener("click", reRender);
/////////////click on any color box///////////
color_box_container.addEventListener("click", checkColor);
/////////////////////////////////////////////////

////////////////////////////////////////////////////
