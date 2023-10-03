const container = document.getElementById('grid-container');
const buttons = document.querySelectorAll('.text2');
const penColorButton = document.getElementById('pen-color');
const colorPicker = document.getElementById('colorPicker');
const backgroundColor = document.getElementById('background-color');
const eraser = document.getElementById('eraser');
const rainbow = document.getElementById('rainbow');
const shading = document.getElementById('shading');
const lighten = document.getElementById('lighten')
const rangeSlider = document.getElementById('range-slider');
const rangeValue = document.querySelectorAll('.range-value');
const gridLines = document.getElementById('grid-lines');
const clear = document.getElementById('clear');


let mouseIsDown = false;
let isEraserActive = false;
let isGridlinesActive = false;
let isRainbowActive = false;
let isShadingActive = false;
let isLightenActive = false; 
let globalNumValue = Number(rangeSlider.value);
let selectedPenColor = 'black';


//eventlisteners

penColorButton.addEventListener('click', function() {
    colorPicker.click(); // This will open the color picker dialog.
});

colorPicker.addEventListener('input', function(event) {
    const pickedColor = event.target.value;
    selectedPenColor = pickedColor;
    penColorButton.style.backgroundColor = pickedColor; // For example, you can update the button's color.
});

lighten.addEventListener('click', () => {
    isLightenActive = !isLightenActive;
});

shading.addEventListener('click', () => {
    isShadingActive = !isShadingActive;
});

rainbow.addEventListener('click', () => {
    isRainbowActive = !isRainbowActive;
});

gridLines.addEventListener('click', () => {
    isGridlinesActive = !isGridlinesActive;
    clearGridLines();
});

eraser.addEventListener('click', () => {
    isEraserActive = !isEraserActive; 
});

clear.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });
});

buttons.forEach(button => {
    button.addEventListener('click', function() {
        button.classList.toggle('active');
    });
});

//functions

function isMouseDown() { 
    window.addEventListener('mousedown', () => {
        mouseIsDown = true;
    });
    
    window.addEventListener('mouseup', () => {
        mouseIsDown = false;
    });

    if(mouseIsDown == true) {
        return true;
    }
}

function clearGridLines() { 
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        if(isGridlinesActive) {
        square.style.border = 'none';
    } else {
        square.style.border = '1px solid #64fcf2'
    }
  });
}

function getRandom() {
    const randomNum = Math.floor(Math.random() * 256);
    return randomNum;
}

function isDefaultColor(color) {
    return color === 'rgba(0,0,0,0)' || color === 'rgb(255,255,255)';
}

function createGrid(numOfSquares) {
    container.innerHTML = '';
    for (let i = 0; i < numOfSquares; i++) {
        let square = document.createElement('div');
        square.className = 'square';
    
        square.addEventListener('click', function() {
            let currentColor = window.getComputedStyle(square).backgroundColor;
        
            // Early exit for shading or lightening on default colors.
            if ((isShadingActive || isLightenActive) && isDefaultColor(currentColor)) {
                return;
            }

            if (isEraserActive) {
                square.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            } else if (isRainbowActive) {
                let red = getRandom();
                let green = getRandom();
                let blue = getRandom();
                square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            } else if (isShadingActive) {
                let currentColor = window.getComputedStyle(square).backgroundColor; // Get the current color of the square.
                let match = currentColor.match(/\d+/g); // Extract the RGB values.
        
                if(match) { // If RGB values are found.
                    let red = Math.max(0, match[0] - 20); // Subtract 10% of 255.
                    let green = Math.max(0, match[1] - 20);
                    let blue = Math.max(0, match[2] - 20);
            
                    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                    }
            } else if (isLightenActive) {
                let currentColor = window.getComputedStyle(square).backgroundColor;
                let match = currentColor.match(/\d+/g);
        
                if(match) {
                    let red = Math.min(255, parseInt(match[0]) + 25.5); // Add 10% of 255, and ensure it doesn’t exceed 255.
                    let green = Math.min(255, parseInt(match[1]) + 25.5);
                    let blue = Math.min(255, parseInt(match[2]) + 25.5);
            
                    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                }
            } else if (!isEraserActive && !isRainbowActive && !isShadingActive && !isLightenActive) {
                square.style.backgroundColor = selectedPenColor;
            }
        });
    
        square.addEventListener('mouseenter', () => {
            if (isMouseDown()) {
                let currentColor = window.getComputedStyle(square).backgroundColor;
        
                // Early exit for shading or lightening on default colors.
                if ((isShadingActive || isLightenActive) && isDefaultColor(currentColor)) {
                    return;
                }
        
                // Handle shading and lightening without moving forward.
                if (isShadingActive) {
                    let match = currentColor.match(/\d+/g);
                    if (match) {
                        let red = Math.max(0, match[0] - 20);
                        let green = Math.max(0, match[1] - 20);
                        let blue = Math.max(0, match[2] - 20);
                        square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                    }
                    return;  // Prevent any further logic from running.
                }
        
                if (isLightenActive) {
                    let match = currentColor.match(/\d+/g);
                    if (match) {
                        let red = Math.min(255, parseInt(match[0]) + 25.5);
                        let green = Math.min(255, parseInt(match[1]) + 25.5);
                        let blue = Math.min(255, parseInt(match[2]) + 25.5);
                        square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                    }
                    return;  // Prevent any further logic from running.
                }
        
                // If the code reaches here, it's not in shading or lightening mode.
                if (isEraserActive) {
                    square.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                } else if (isRainbowActive) {
                    let red = getRandom();
                    let green = getRandom();
                    let blue = getRandom();
                    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                } else if (!isEraserActive && !isRainbowActive && !isShadingActive && !isLightenActive) {
                    square.style.backgroundColor = selectedPenColor;
                }
            }
        });

        container.appendChild(square);
    }
}

function startingGrid() {
    const numOfSquares = 576;
    const squaresPerRow = Math.sqrt(numOfSquares);   
    const squareSize = 100 / squaresPerRow

    const style = document.createElement('style');
    style.textContent = `.square {
        min-width: ${squareSize}%;
        min-height: ${squareSize}%;
    }`;
    document.head.appendChild(style);

    createGrid(numOfSquares)
}


function startDrawing() {
    startingGrid();

    rangeSlider.addEventListener('input', function() {
        const numValue = Number(rangeSlider.value);
        globalNumValue = numValue;
        rangeValue.forEach(rangeValue => rangeValue.textContent = rangeSlider.value);
    
    const squaresPerRow = globalNumValue;
    const numOfSquares = squaresPerRow * squaresPerRow;    
    const squareSize = 100 / squaresPerRow

    const style = document.createElement('style');
    style.textContent = `.square {
        min-width: ${squareSize}%;
        min-height: ${squareSize}%;
    }`;
    document.head.appendChild(style);

        createGrid(numOfSquares)
    });
}


startDrawing()





