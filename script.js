const main = document.getElementsByTagName('main')[0];
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
const inputBoardSize = document.getElementById('board-size');
const inputButton = document.getElementById('generate-board');
const resetButton = document.getElementById('clear-board');

// Estocando valor para atribuir a id dos pixels;
let pixelNumber = 0;
// Criando função para preencher linhas do quadro de pixels
const boardRow = (idName) => {
  // Criando linha
  const row = document.createElement('section');
  row.id = idName;
  row.className = 'row';
  pixelBoard.appendChild(row);
  // Preenchendo linha
  for (let index = 0; index < 5; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.id = `pixel-${pixelNumber}`;
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
    row.appendChild(pixel);
    pixelNumber += 1;
  };
};
// Criando colunas
boardRow('box-first-row');
boardRow('box-second-row');
boardRow('box-third-row');
boardRow('box-fourth-row');
boardRow('box-fifth-row');
// Capturando class pixel elements
const pixelList = document.getElementsByClassName('pixel');
// Criando função para selecionar elemento da paleta de cores
for (box of colorBoxes) {
  box.addEventListener('click', (event) => {
    //Removendo classe selected anterior
    const selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    //Adicionando classe selected ao elemento clicado
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
//  Criando função para aplicar cor selecionada ao elemento do quadro de pixels
// Event listener em todos os pixels
for (pixel of pixelList){
  pixel.addEventListener('click', (event) => {
    //Capturando cor do elemento da paleta de cores selecionado
    const colorOfSelected = document.querySelector('.selected').style.backgroundColor;
    //Adicionando a cor ao pixel selecionado
    event.target.style.backgroundColor = colorOfSelected;
    //Atribuindo a id do pixel a uma variavel (para estocar no objeto)
    const pixelId = event.target.id;
    //Estocando cor no objeto pixelColorsStock
    pixelColorsStock[pixelId] = colorOfSelected;
    //Estocando cor no localStorage
    localStorage.setItem('pixelBoard', JSON.stringify(pixelColorsStock));
  });
};

// Recuperando obj da localStorage
const pixelColorsFromStorage = JSON.parse(localStorage.getItem('pixelBoard'));
//  Função para resetar as cores dos pixels no storage
const resetStoragePixelColors = () => {
  for (pixel of pixelList){
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
    // Resetando localStorage e objeto pixelColorsStock
    localStorage.removeItem('pixelBoard');
    pixelColorsStock = {};
  };
};
// Event listener para o botão reset resetar as cores
resetButton.addEventListener('click', resetStoragePixelColors);

//  Atribuindo cores, guardadas no localStorage, aos pixels
const localStoragePixelsColors = () => {
  for (index = 0; index < pixelList.length; index += 1) {
    const pixelName = pixelList[index].id;
    pixelList[index].style.backgroundColor = pixelColorsFromStorage[pixelName];
  };
};
if (pixelColorsFromStorage !== null) {
  localStoragePixelsColors();
};
// Fazendo com que o valor do input seja transformado no tamanho dos pixels ao clicar no botão VQV
const rows = document.getElementsByClassName('row');




const changingRowSize = (string) => {
  for (let index = 0; index < rows.length; index += 1) {
    rows[index].style.height = string;
  }
};

const changingSize = (input) => {
  for (let index = 0; index < pixelList.length; index += 1) {
    if (parseInt(input) < 5) {
      pixelList[index].style.height = '5px';
      pixelList[index].style.width = '5px';
      changingRowSize('5px');
    } else if (parseInt(input) > 50) {
      pixelList[index].style.height = '50px';
      pixelList[index].style.width = '50px';
      changingRowSize('50px');
    } else {
      pixelList[index].style.height = `${input}px`;
      pixelList[index].style.width = `${input}px`;
      changingRowSize(`${input}px`);
    }
  }
};

inputButton.addEventListener('click', () => {
  // Colocando valor do input numa variável
  const input = inputBoardSize.value;
  // Alerta p/ input vazio
  if (input === '') {
    return alert('Board inválido!');
  };
  // Iterando pixelList e modificando valores
  changingSize(input);
  // Resetando cores dos pixels
  resetStoragePixelColors();
  // Estocando valor do input no localStorage
  localStorage.setItem('boardSize', `${input}px`);
});
//  Atribuindo boardSize, guardado no localStorage, aos pixels
for (let index = 0; index < pixelList.length; index += 1) {
  pixelList[index].style.height = localStorage.getItem('boardSize');
  pixelList[index].style.width = localStorage.getItem('boardSize');
  // row.style.height = localStorage.getItem('boardSize');
};