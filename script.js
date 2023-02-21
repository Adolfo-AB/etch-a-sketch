// Define constants
const DEFAULT_GRID_SIZE = 16;
const BACKGROUND_COLOR = "#ffffff";
const ColorModes = {
  PEN: "color-mode-pen",
  ERASER: "color-mode-eraser",
  CONFETTI: "color-mode-confetti",
};

// Get all the dynamic elements
const gridContainer = document.getElementById("grid-container");
const gridSizeSlider = document.getElementById("grid-size-slider");
const clearButton = document.getElementById("clear-button");
const colorPicker = document.getElementById('color');
const colorModeButtons = document.querySelectorAll('.color-mode-container input[type="radio"]');

// Change mouseDown boolean value used in changeColor function
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Update dynamic behavior based on input values
gridSizeSlider.onchange = (e) => createGridCells(e.target.value);
clearButton.onclick = () => clearGridCells();
clearButton.addEventListener('click', function() {
  // Add the button-pressed class to the button
  clearButton.classList.add('button-pressed');

  // Remove the button-pressed class after a short delay
  setTimeout(function() {
    clearButton.classList.remove('button-pressed');
  }, 500); // Change the delay time (in milliseconds) as desired
});

// Logic to keep the color mode buttons pressed until another one is pressed.
let colorMode = ColorModes.PEN;
colorModeButtons.forEach(button => {
  button.addEventListener('click', () => {
    colorMode = button.value;
    console.log(button.value)
    colorModeButtons.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.checked = false;
      }
    });
  });
});

// Create all the grid cells
function createGridCells(gridSize) {
    deleteGridCells();
    gridContainer.style.setProperty('--grid-rows', gridSize);
    gridContainer.style.setProperty('--grid-cols', gridSize);
    for (c = 0; c < (gridSize**2); c++) {
        let cell = document.createElement("div");
        cell.addEventListener("mouseover", changeColor);
        cell.addEventListener("mousedown", changeColor);
        gridContainer.appendChild(cell).className = "grid-item";
  };
};

// Delete all the grid cells
function deleteGridCells() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
};

// Change the color of a cell
function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return

  if (colorMode === ColorModes.PEN) {
    e.target.style.backgroundColor = colorPicker.value;
  } else if (colorMode === ColorModes.ERASER) {
    e.target.style.backgroundColor = BACKGROUND_COLOR;
  } else if (colorMode === ColorModes.CONFETTI) {
    e.target.style.backgroundColor = getRandomColor();
  }
};

// Generate a random RGB color
function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
}

// Clear all the grid cells
function clearGridCells() {
  const gridCells = gridContainer.querySelectorAll(".grid-item");
  gridCells.forEach(cell => cell.style.backgroundColor=BACKGROUND_COLOR);
}

createGridCells(DEFAULT_GRID_SIZE);
