const screen = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const signs = document.querySelectorAll(".signs");
const btns = document.querySelector(".buttons");
const numArrays = Array.from(numbers).map((e) => e.innerHTML);
const signArrays = Array.from(signs).map((e) => e.innerHTML);
let totalentry = [];
let copyTotalEntry = [];
let num = "";

//////////////////////////
//////////Reset//////////

const reset = (clickedElem) => {
  // console.log("samar");
  totalentry.length = 0;
  copyTotalEntry.length = 0;

  clickedElem.classList.remove("highlighter");
  screen.textContent = "Calculator";
};

//////////////////////////////////////
//////////////show error alert///////
const handlingInfinity = (target) => {
  alert("Can't divided by zero");
  console.log(target);
  reset(target);
};
////////////////////////show result//////

const showResult = (result) => {
  totalentry.length = 0;
  copyTotalEntry.length = 0;
  return result.toFixed(2);
};
////////////////////////////////////////////////
///////////////event delegation used/////////////
btns.addEventListener("click", (e) => {
  let enteredNo;
  let enteredSign;
  const clickedBtn = e.target;

  ///////remove highlighter to all buttons//////
  Array.from(clickedBtn.parentElement.children).forEach((e) =>
    e !== clickedBtn ? e.classList.remove("highlighter") : e
  );

  ///////////add highlighter to clicked button only/////
  e.target.classList.toggle("highlighter");

  /////identify entered no and entered sign////
  numArrays.includes(e.target.textContent)
    ? (enteredNo = e.target.textContent)
    : signArrays.includes(e.target.textContent)
    ? (enteredSign = e.target.textContent)
    : console.log("signs not found");

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  //////////////////display entered inputs on the screen/////

  if (enteredNo) {
    num += enteredNo;
    /////////save numbers in totalentry and copyTotalEntry array//////
    totalentry.push(enteredNo);
    copyTotalEntry.push(enteredNo);

    ///////////////identify previous entered element is a sign or number//////
    const prevElemIndex = totalentry.indexOf(enteredNo) - 1;
    const prevElem = totalentry[prevElemIndex];
    let joint;

    ///////////////if prev elem is also number then concatenates it with the recent entered no////
    if (prevElem && Number.isInteger(+prevElem)) {
      joint = totalentry[prevElemIndex] + enteredNo;

      ///////previous and current element both are popped and their joint will be pushed in totalentry array
      totalentry.pop();
      totalentry.pop();

      totalentry.push(+joint);
      screen.textContent = joint;
    }
    screen.textContent = totalentry.join("");
  }

  /////////////////////////////////////////////////
  ///////////////entered sign other than numbers//////
  else {
    totalentry.push(enteredSign);
    copyTotalEntry.push(enteredSign);
    screen.textContent = totalentry.join("");

    ////////////////////////////////////////
    /////////display overall results//////////////
    if (enteredSign == "=" && totalentry.length != 0) {
      //////////////////to tackle condition if weird entered calculation encounter like "2--3"
      try {
        const result = eval(
          totalentry.slice(0, totalentry.length - 1).join("")
        );

        screen.textContent = isFinite(result)
          ? showResult(result)
          : handlingInfinity(e.target);
      } catch (error) {
        alert("Invalid calculation");
        console.log(e);
        reset(e.target);
      }
    }
    /////////////////////////////////////
    ///////////////////////////////////////
    ///////////clear all entered input/////////////
    if (enteredSign == "C") {
      reset(e.target);
    }
    /////////////////////////////////////
    ////////////////////////////////////
    //////////clear previous input/////////
    if (enteredSign == "❌") {
      // console.log("samar");
      ////////////pop the "❌" from totalentry//////
      totalentry.pop();
      ////////////pop the "❌" and the prev eht from copytotalentry//////
      copyTotalEntry.pop();
      copyTotalEntry.pop();

      ////////////replace the last eht of copytotalentry to totalentry//////
      totalentry[totalentry.length - 1] =
        +copyTotalEntry[copyTotalEntry.length - 1];
      //////////////if user clear all inputs////////
      copyTotalEntry.length == 0
        ? reset(e.target)
        : (screen.textContent = copyTotalEntry.join(""));
    }
  }
});
