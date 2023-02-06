//  Função para gerar cor aleatória
const generateRandomColor = () => {
  const rRandom = Math.floor(Math.random() * (255 - 0) + 0);
  const gRandom = Math.floor(Math.random() * (255 - 0) + 0);
  const bRandom = Math.floor(Math.random() * (255 - 0) + 0);
  return `rgb(${rRandom}, ${gRandom}, ${bRandom})`;
};
//  Capturando lista das cores e botão
const colorBoxes = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');
// Criando objeto para estocar cores da paleta no localStorage

// Criando objeto para estocar cores no localStorage, ou repopulando se já houverem pixels estocados.
const createPaletteColorsObj = () => {
  if (localStorage.getItem('colorPalette') === null) {
    return {};
  }
  return JSON.parse(localStorage.getItem('colorPalette'));
};

const paletteColorsStock = createPaletteColorsObj();

//  Adicionando event listener ao botão
const changeColor = () => {
  for (let index = 1; index < colorBoxes.length; index += 1) {
    // variável para estocar valores no localStorage
    const boxName = colorBoxes[index].id;
    colorBoxes[index].style.backgroundColor = generateRandomColor();
    const color = colorBoxes[index].style.backgroundColor;
    // Estocando valores no objeto
    paletteColorsStock[boxName] = color;
    // estocando valores no localStorage
    localStorage.setItem('colorPalette', JSON.stringify(paletteColorsStock));
  };
};
button.addEventListener('click', changeColor);
// Recuperando obj da localStorage
const paletteColorsFromStorage = JSON.parse(localStorage.getItem('colorPalette'));
//  Atribuindo palleteColorsStock, guardado no localStorage, a paleta de cores
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
const resetButton = document.getElementById('clear-board');

// Estocando valor para atribuir a id dos pixels;
let pixelNumber = 0;
// Criando função para preencher linhas do quadro de pixels
const boardRow = (size) => {
  // Criando linha
  const row = document.createElement('section');
  row.className = 'row';
  pixelBoard.appendChild(row);
  // Preenchendo linha
  for (let index = 0; index < size; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.id = `pixel-${pixelNumber}`;
    pixel.style.backgroundColor = 'white';
    row.appendChild(pixel);
    pixelNumber += 1;
  };
};
// Criando colunas
boardRow(5);
boardRow(5);
boardRow(5);
boardRow(5);
boardRow(5);
// Capturando class pixel elements
const pixelList = document.getElementsByClassName('pixel');
// Criando função para selecionar elemento da paleta de cores
for (let index = 0; index < colorBoxes.length; index += 1) {
  colorBoxes[index].addEventListener('click', (event) => {
    // Removendo classe selected anterior
    const selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    // Adicionando classe selected ao elemento clicado
    event.target.classList.add('selected');
  });
};

// Criando objeto para estocar cores no localStorage, ou repopulando se já houverem pixels estocados.
const createPixelColorsObj = () => {
  if (localStorage.getItem('pixelBoard') === null) {
    return {};
  }
  return JSON.parse(localStorage.getItem('pixelBoard'));
};

let pixelColorsStock = createPixelColorsObj();
// Função para estocar cor do pixel no localStorage
const pixelColorsToLocalStorage = (pixel) => {
  pixelColorsStock[pixel.id] = pixel.style.backgroundColor;
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColorsStock));
};
//  Criando função para aplicar cor selecionada ao elemento do quadro de pixels
// Event listener em todos os pixels
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
// Recuperando obj da localStorage
const pixelColorsFromStorage = JSON.parse(localStorage.getItem('pixelBoard'));
//  Função para resetar as cores dos pixels no storage
const resetStoragePixelColors = () => {
  for (let index = 0; index < pixelList.length; index += 1) {
    pixelList[index].style.backgroundColor = 'white';
    // Resetando localStorage e objeto pixelColorsStock
    localStorage.removeItem('pixelBoard');
    pixelColorsStock = {};
  }
};
// Event listener para o botão reset resetar as cores
resetButton.addEventListener('click', resetStoragePixelColors);

//  Atribuindo cores, guardadas no localStorage, aos pixels
const localStoragePixelsColors = () => {
  for (let index = 0; index < pixelList.length; index += 1) {
    const pixelName = pixelList[index].id;
    pixelList[index].style.backgroundColor = pixelColorsFromStorage[pixelName];
  }
};
if (pixelColorsFromStorage !== null) {
  localStoragePixelsColors();
}
// Fazendo com que o valor do input seja transformado no tamanho dos pixels ao clicar no botão VQV
const rows = document.getElementsByClassName('row');
const deleteOldBoard = () => {
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    rows[index].remove();
  }
};
// Capturando elementos que serão usados
const sizeInput = document.getElementById('board-size');
const sizeButton = document.getElementById('generate-board');
sizeButton.addEventListener('click', () => {
  if (sizeInput.value === '') {
    return alert('Board inválido!');
  }
  let inputNumber = +sizeInput.value;
  if (inputNumber < 5) {
    inputNumber = 5;
  } else if (inputNumber > 50) {
    inputNumber = 50;
  }
  pixelNumber = 0;
  deleteOldBoard();
  for (let index = 0; index < inputNumber; index += 1) {
    boardRow(inputNumber);
  }
  ChangePixelCollor();
});
