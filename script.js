const canvas = document.getElementById('canvas');
const range = document.getElementById('square-nr');
const rangeLabel = document.getElementById('range-label');
const squares = document.getElementsByClassName('pixel');
const selectors = document.getElementsByClassName('selector');
const blackSelector = document.getElementById('black');
const randomSelector = document.getElementById('random');
const darkerSelector = document.getElementById('darker');
const chooseColorSelector = document.getElementById('choose');
const eraserSelector = document.getElementById('eraser');
const colorInput = document.getElementById('color-input');
const canvasWidth = canvas.computedStyleMap().get('width').value;
const canvasHeight = canvas.computedStyleMap().get('height').value;

function changeRange() {
    canvas.innerHTML = '';
    const area = range.value**2;
    const squareWidth = canvasWidth / range.value
    const squareHeight = canvasHeight / range.value
    rangeLabel.textContent = `${range.value} x ${range.value}`;
    
    for(let i = 0; i < area; i++) {
        const newPixel = document.createElement('div');
        newPixel.className = 'pixel';
        newPixel.style.width = squareWidth + 'px';
        newPixel.style.height = squareHeight + 'px';
        canvas.appendChild(newPixel);
    }
    paint()
}

function paint() {
    //need to put event listener(square) here, otherwise it would stop working 
    //after range modification
    for(let square of squares) {
        square.addEventListener('mouseover', color)
    }
    //the event listener below is only here not to make the one above feel lonely
    //since pint() is called in changeRange() which is called in the global scope 
    //I don't see a reason to put it outside
    for(let selector of selectors) {
        selector.addEventListener('click', activate)
    }
}

//need to use hexadecimal values because input[type='color'].value 
//only works on hex values and not on rgb 
//(on chrome at least, did not test on other browsers)
function color(e) {
    if(blackSelector.classList.contains('active')) {
        e.target.style.backgroundColor = `#000000`;
    } else if(randomSelector.classList.contains('active')) {
        e.target.style.backgroundColor = `#${randomColor()}`;
    } else if(darkerSelector.classList.contains('active')) {
        //MIA
    } else if(chooseColorSelector.classList.contains('active')) {
        e.target.style.backgroundColor = colorInput.value;
    } else if(eraserSelector.classList.contains('active')) {
        e.target.style.backgroundColor = `#ffffff`;
    }
    
}

//get random color with hexadecimal value
function randomColor() {
    let randomHexColor = '';
    for(let i = 0; i < 6; i++) {
        randomHexColor += Math.floor(Math.random() * 17).toString(16);
    }
    return randomHexColor;
}

function activate(e) {
    Array.from(selectors).forEach(selector => {
        selector.classList.remove('active');    
    });
    if (e.target.classList.contains('selector')) {
        e.target.classList.add('active');
    }
}
//call function to get initial range value 
//and apply it to both canvas and label for range-input
changeRange();
range.addEventListener('change', changeRange)