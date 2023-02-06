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
const palleteColorsStock = {};
//  Adicionando event listener ao botão
const changeColor = () => {
  for (let index = 1; index < colorBoxes.length; index += 1) {
    // variável para estocar valores no localStorage
    const boxName = colorBoxes[index].id;
    colorBoxes[index].style.backgroundColor = generateRandomColor();
    const color = colorBoxes[index].style.backgroundColor;
    // Estocando valores no objeto
    palleteColorsStock[boxName] = color;
    // estocando valores no localStorage
    localStorage.setItem('colorPallete', JSON.stringify(palleteColorsStock));
  };
};
button.addEventListener('click', changeColor);
// Recuperando obj da localStorage
const palleteColorsFromStorage = JSON.parse(localStorage.getItem('colorPallete'));
//  Atribuindo palleteColorsStock, guardado no localStorage, a paleta de cores
const localStorageColorsPallete = () => {
  for (let index = 1; index < colorBoxes.length; index += 1) {
    const boxName = colorBoxes[index].id;
    colorBoxes[index].style.backgroundColor = palleteColorsFromStorage[boxName];
  };
};
if (palleteColorsFromStorage !== null) {
  localStorageColorsPallete();
};
//  Adicionando quadro com 25px:
// Capturando seção do quadro de pixels
const pixelBoard = document.getElementById('pixel-board');
// Criando input section
const inputSection = document.createElement('section');
inputSection.id = 'input-section';
pixelBoard.appendChild(inputSection);
// Criando input
const inputBoardSize = document.createElement('input');
inputBoardSize.id = 'board-size';
inputBoardSize.setAttribute('type', 'number');
inputBoardSize.setAttribute('min', '1');
inputSection.appendChild(inputBoardSize);
// Criando botão
const inputButton = document.createElement('button');
inputButton.id = 'generate-board'
inputButton.innerHTML = 'VQV';
inputSection.appendChild(inputButton);
// Criando botão para os pixels retornarem à cor branca
const resetButton = document.createElement('button');
resetButton.id = 'clear-board';
resetButton.innerHTML = 'Limpar';
pixelBoard.appendChild(resetButton);

// Estocando valor para atribuir a id dos pixels;
let pixelNumber = 0;
// Criando função para preencher linhas do quadro de pixels
const boardRow = (idName) => {
  // Criando linha
  const row = document.createElement('section');
  row.id = idName;
  pixelBoard.appendChild(row);
  // Preenchendo linha
  for (let index = 0; index < 5; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.id = `pixel-${pixelNumber}`;
    pixel.classList.backgroundColor = 'white';
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
    pixel.style.backgroundColor = 'white';
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
inputButton.addEventListener('click', () => {
  //Colocando valor do input numa variável
  const input = inputBoardSize.value;
  //Alerta p/ input vazio
  if (input === '') {
    return alert('Board inválido!');
  };
  //Iterando pixelList e modificando valores
  for (pixel of pixelList) {
    if (parseInt(input) < 5) {
      pixel.style.height = '5px';
      pixel.style.width = '5px';
    } else if (parseInt(input) > 50) {
      pixel.style.height = '50px';
      pixel.style.width = '50px';
    } else {
      pixel.style.height = `${input}px`;
      pixel.style.width = `${input}px`;
    }
  };
  //Resetando cores dos pixels
  resetStoragePixelColors();
  //Estocando valor do input no localStorage
  localStorage.setItem('boardSize', `${input}px`);
});
//  Atribuindo boardSize, guardado no localStorage, aos pixels
for (pixel of pixelList) {
  pixel.style.height = localStorage.getItem('boardSize');
  pixel.style.width = localStorage.getItem('boardSize');
};