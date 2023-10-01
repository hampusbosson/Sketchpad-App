const container = document.getElementById('grid-container');
const buttons = document.querySelectorAll('.text2');
const penColor = document.getElementById('pen-color');
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
let globalNumValue = Number(rangeSlider.value);


//eventlisteners

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

/*rangeSlider.addEventListener('input', function() {
    const numValue = Number(rangeSlider.value);
    globalNumValue = numValue;
    rangeValue.forEach(rangeValue => rangeValue.textContent = rangeSlider.value);

    console.log(globalNumValue);
});
*/

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
        square.style.border = '1px solid black'
    }
  });
  
}

function createGrid(numOfSquares) {
    container.innerHTML = '';
    for (let i = 0; i < numOfSquares; i++) {
        let square = document.createElement('div');
        square.className = 'square';
    
        square.addEventListener('click', function() {
            if (isEraserActive) {
                square.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            } else {
                square.style.backgroundColor = 'black';
            }
        });
    
        square.addEventListener('mouseenter', () => {
            if (isMouseDown()) {
                if (isEraserActive) {
                    square.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                } else {
                    square.style.backgroundColor = 'black';
                }
            }
        });

        container.appendChild(square);
    }
}



function startDrawing() {
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





