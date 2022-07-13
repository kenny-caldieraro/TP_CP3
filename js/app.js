/* eslint-disable indent */
const app = {
  styles: ['plain', 'empty', 'light', 'highlight', 'highlight2'],

  selectedStyle: 'plain',
  customColor: null,

  init: function () {
    app.generateConfigForm();

    app.generatePalette();

    document
      .getElementById('custom-color')
      .addEventListener('change', function (event) {
        app.customColor = event.target.value;
      });

    app.createGrid(8, 32);
  },

  generateConfigForm: function () {
    const formNode = document.querySelector('.configuration');

    const gridSizeInput = document.createElement('input');
    gridSizeInput.setAttribute('type', 'number');
    gridSizeInput.setAttribute('name', 'gridSize');
    gridSizeInput.required = true;
    gridSizeInput.setAttribute('placeholder', 'Taille de la grille');
    gridSizeInput.id = 'gridSize';

    formNode.appendChild(gridSizeInput);

    const cellSizeInput = document.createElement('input');
    cellSizeInput.setAttribute('type', 'number');
    cellSizeInput.setAttribute('name', 'cellSize');
    cellSizeInput.required = true;
    cellSizeInput.setAttribute('placeholder', "Taille d'une cellule");
    cellSizeInput.id = 'cellSize';

    formNode.appendChild(cellSizeInput);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('config-form-submit');
    submitButton.textContent = 'Valider';
    formNode.appendChild(submitButton);

    const eventName = 'submit';

    formNode.addEventListener(eventName, function (event) {
      event.preventDefault();

      const gridSizeInputNode = document.getElementById('gridSize');
      const cellSizeInputNode = document.getElementById('cellSize');

      app.createGrid(gridSizeInputNode.value, cellSizeInputNode.value);
    });
  },

  generatePalette: function () {
    const paletteNode = document.getElementById('palette');

    app.styles.forEach(function (style) {
      const styleNode = document.createElement('div');
      styleNode.classList.add('style-selector');

      styleNode.setAttribute('data-style-name', style);

      styleNode.addEventListener('click', app.selectStyle);

      paletteNode.appendChild(styleNode);
    });
  },

  selectStyle: function (event) {
    const itemSelectorNode = event.target;

    app.selectedStyle = itemSelectorNode.getAttribute('data-style-name');

    app.customColor = null;
  },

  changeCellColor: function (event) {
    const cell = event.target;

    if (app.customColor) {
      cell.setAttribute('data-style-name', '');
      cell.style.backgroundColor = app.customColor;
    } else {
      cell.setAttribute('data-style-name', app.selectedStyle);
      cell.style.removeProperty('background-color');
    }
  },

  createGrid: function (gridSize, cellSize) {
    const grid = document.getElementById('invader');
    grid.innerHTML = '';
    grid.style.width = gridSize * cellSize + 'px';

    for (let cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.width = cellSize + 'px';
      cell.style.height = cellSize + 'px';

      cell.addEventListener('click', app.changeCellColor);
      grid.appendChild(cell);
    }
  },
};

document.addEventListener('DOMContentLoaded', function () {
  app.init();
});
