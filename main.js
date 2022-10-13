let resultFinal = document.querySelector(".result");
let mainC = document.querySelector(".main-container");
let rowId = 1;
let word = "texto";
let wordArr = word.toUpperCase().split("");

let row = document.querySelector(".row");
drawSquares(row);
listenInput(row);

addFocus(row);
let cont = 1;
function listenInput(actualRow) {
  let squares = actualRow.querySelectorAll(".square");
  squares = [...squares];
  let arr = [];
  squares.forEach((e) => {
    e.addEventListener("input", (e) => {
      if (e.inputType !== "deleteContentBackward") {
        arr.push(e.target.value.toUpperCase());
        console.log(arr);
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.focus();
        } else {
          let rightIndex = compareArray(wordArr, arr);
          rightIndex.forEach((e) => {
            squares[e].style.backgroundColor = "green";
          });
          if (rightIndex.length == wordArr.length) {
            viewResult("Ganaste");
            return;
          }
          let existIndexArr = existWords(wordArr, arr);
          existIndexArr.forEach((e) => {
            squares[e].style.backgroundColor = "gold";
          });
          console.log(cont);
          if (cont <= 5) {
            let actualRow = createRow();
            drawSquares(actualRow);
            listenInput(actualRow);
            addFocus(actualRow);
          } else {
            viewResult(`Perdiste,la palabra correcta era: "${word}"`);
            return;
          }
        }
      }else{
        arr.pop()
      }
    });
  });
}

function compareArray(arr1, arr2) {
  let equalIndex = [];
  arr1.forEach((e, i) => {
    if (e == arr2[i]) {
      equalIndex.push(i);
    } else {
    }
  });
  return equalIndex;
}
function existWords(arr1, arr2) {
  let existIndexArr = [];
  arr2.forEach((e, i) => {
    if (arr1.includes(e) && e !== arr1[i]) {
      existIndexArr.push(i);
    }
  });
  return existIndexArr;
}
function createRow() {
  rowId++;
  let newRow = document.createElement("div");
  newRow.classList.add("row");
  newRow.setAttribute("id", rowId);
  mainC.appendChild(newRow);
  return newRow;
}
function drawSquares(row) {
  wordArr.forEach((e, i) => {
    if (i === 0) {
      row.innerHTML += `<input type="text" maxlength="1" class="square focus"></input>`;
    } else {
      row.innerHTML += `<input type="text" maxlength="1" class="square"></input>`;
    }
  });
}
function addFocus(actualRow) {
  let focusC = actualRow.querySelector(".focus");
  focusC.focus();
}
function viewResult(t) {
  resultFinal.innerHTML = `<p>${t}</p>
    <button class="button">Reiniciar</button>`;
  let resetBtn = document.querySelector(".button");
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
}
