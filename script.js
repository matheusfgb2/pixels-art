// Requisito 4
const generateRandomColor = () => {
  const rRandom = Math.floor(Math.random() * 255);
  const gRandom = Math.floor(Math.random() * 255);
  const bRandom = Math.floor(Math.random() * 255);
  return `rgb(${rRandom}, ${gRandom}, ${bRandom})`;
};

// Requisito 5
const createPaletteColorsObj = () => {
  if (localStorage.getItem('colorPalette') === null) {
    return {};
  }
  return JSON.parse(localStorage.getItem('colorPalette'));
};
const paletteColorsStock = createPaletteColorsObj();

// Requisito 4
const colorBoxes = document.getElementsByClassName('color');
const changeColor = () => {
  for (let index = 1; index < colorBoxes.length; index += 1) {
    colorBoxes[index].style.backgroundColor = generateRandomColor();
    const color = colorBoxes[index].style.backgroundColor;
    // Requisito 5
    const boxName = colorBoxes[index].id;
    paletteColorsStock[boxName] = color;
    localStorage.setItem('colorPalette', JSON.stringify(paletteColorsStock));
  }
};
const button = document.getElementById('button-random-color');
button.addEventListener('click', changeColor);
// Requisito 5
const paletteColorsFromStorage = JSON.parse(localStorage.getItem('colorPalette'));
const localStorageColorsPalette = () => {
  for (let index = 1; index < colorBoxes.length; index += 1) {
    const boxName = colorBoxes[index].id;
    colorBoxes[index].style.backgroundColor = paletteColorsFromStorage[boxName];
  }
};
if (paletteColorsFromStorage !== null) {
  localStorageColorsPalette();
}
//  Adicionando quadro com 25px:
// Capturando elementos que serão usados
const pixelBoard = document.getElementById('pixel-board');

// Requisito 6
let pixelNumber = 0;
const boardRow = (size) => {
  const row = document.createElement('section');
  row.className = 'row';
  pixelBoard.appendChild(row);
  for (let index = 0; index < size; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.id = `pixel-${pixelNumber}`;
    pixel.style.backgroundColor = 'white';
    row.appendChild(pixel);
    pixelNumber += 1;
  }
};
// Requisito 15
if (localStorage.getItem('boardSize') !== null) {
  const boardSize = localStorage.getItem('boardSize');
  for (let index = 0; index < boardSize; index += 1) {
    boardRow(boardSize);
  }
} else {
  // Requisito 6
  for (let index = 0; index < 5; index += 1) {
    boardRow(5);
  }
}
// Requisito 9
const pixelList = document.getElementsByClassName('pixel');
for (let index = 0; index < colorBoxes.length; index += 1) {
  colorBoxes[index].addEventListener('click', (event) => {
    const selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    event.target.classList.add('selected');
  });
}

// Requisito 12
const createPixelColorsObj = () => {
  if (localStorage.getItem('pixelBoard') === null) {
    return {};
  }
  return JSON.parse(localStorage.getItem('pixelBoard'));
};

let pixelColorsStock = createPixelColorsObj();
const pixelColorsToLocalStorage = (pixel) => {
  pixelColorsStock[pixel.id] = pixel.style.backgroundColor;
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColorsStock));
};
// Requisito 10
const ChangePixelCollor = () => {
  for (let index = 0; index < pixelList.length; index += 1) {
    pixelList[index].addEventListener('click', (event) => {
      const pixel = event.target;
      // Capturando cor do elemento da paleta de cores selecionado
      const colorOfSelected = document.querySelector('.selected').style.backgroundColor;
      // Adicionando a cor ao pixel selecionado
      pixel.style.backgroundColor = colorOfSelected;
      // Estocando cor no localStorage
      pixelColorsToLocalStorage(pixel);
    });
  }
};
ChangePixelCollor();
// Requisito 11
const resetStoragePixelColors = () => {
  for (let index = 0; index < pixelList.length; index += 1) {
    pixelList[index].style.backgroundColor = 'white';
    localStorage.removeItem('pixelBoard');
    pixelColorsStock = {};
  }
};
const resetButton = document.getElementById('clear-board');
resetButton.addEventListener('click', resetStoragePixelColors);

// Requisito 12
const pixelColorsFromStorage = JSON.parse(localStorage.getItem('pixelBoard'));
const localStoragePixelsColors = () => {
  for (let index = 0; index < pixelList.length; index += 1) {
    const pixelName = pixelList[index].id;
    pixelList[index].style.backgroundColor = pixelColorsFromStorage[pixelName];
  }
};
if (pixelColorsFromStorage !== null) {
  localStoragePixelsColors();
}
// Requisito 13
const rows = document.getElementsByClassName('row');
const deleteOldBoard = () => {
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    rows[index].remove();
  }
};
const sizeInput = document.getElementById('board-size');
const sizeButton = document.getElementById('generate-board');

sizeButton.addEventListener('click', () => {
  if (sizeInput.value === '') {
    return alert('Board inválido!');
  }
  let inputNumber = +sizeInput.value;
  if (inputNumber < 5) { // Requisito 14
    inputNumber = 5;
  } else if (inputNumber > 50) { // Requisito 14
    inputNumber = 50;
  }
  pixelNumber = 0;
  deleteOldBoard();
  for (let index = 0; index < inputNumber; index += 1) {
    boardRow(inputNumber);
  }
  localStorage.removeItem('pixelBoard');
  // Requisito 15
  localStorage.setItem('boardSize', inputNumber);
  ChangePixelCollor();
});
