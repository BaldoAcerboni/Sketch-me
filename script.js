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
const cleanCanvasBtn = document.getElementById('new-canvas');
const canvasWidth = canvas.computedStyleMap().get('width').value;
const canvasHeight = canvas.computedStyleMap().get('height').value;

function changeRange() {
    //clear the canvas after each range modification
    canvas.innerHTML = '';
    //do calculations here to avoid doing them inside the loop and slowing the whole thing
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
    for(let square of squares) {
        square.addEventListener('mouseover', color)
    }
}

function paint() {
    //need to put event listener(square) here, otherwise it would stop working 
    //after range modification
    
    //the event listener below is only here not to make the one above feel lonely
    //since paint() is called in changeRange() which is called in the global scope
    //or when range is changed, I don't see a reason to put it outside
    
}

//input[type='color'].value always returns hex value, for whatever reason
//element.style.backgroundColor always returns rgb values, because of course it does
//(on chrome at least, did not test on other browsers)
//I wanted to be consistent but it seems i can not
function color(e) {
    if(blackSelector.classList.contains('active')) {
        e.target.style.backgroundColor = `#000000`;
    } else if(randomSelector.classList.contains('active')) {
        e.target.style.backgroundColor = `#${randomColor()}`;
    } else if(darkerSelector.classList.contains('active')) {
        e.target.style.backgroundColor = darkenColor(e.target)
    } else if(chooseColorSelector.classList.contains('active')) {
        e.target.style.backgroundColor = colorInput.value;
    } else if(eraserSelector.classList.contains('active')) {
        e.target.style.backgroundColor = `#ffffff`;
    }
}
//extract rgb values subtract 20 from each one and return new rgb value
function darkenColor(element) {
    const initialColor = element.style.backgroundColor;
    const colorValues = initialColor.slice(4, initialColor.length - 1).split(', ');
    let darkerColor = '';
    if(initialColor) {
        for(let i = 0; i < colorValues.length; i++) {
            if(colorValues[i] > 20) {
                colorValues[i] -= 20;
            } else {
                colorValues[i] = 0;
            }
        }
        darkerColor = `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`;
    } else { //if initialColor has not yet been set initialColor === undefined
        darkerColor = `rgb(235, 235, 235)`;
    }
    return darkerColor
}
//get random color with hexadecimal value
function randomColor() {
    let randomHexColor = '';
    for(let i = 0; i < 6; i++) {
        randomHexColor += Math.floor(Math.random() * 17).toString(16);
    }
    return randomHexColor;
}
//deactivate all other selectors and activate selected one
function activate(e) {
    Array.from(selectors).forEach(selector => {
        selector.classList.remove('active');    
    });
    if (e.target.classList.contains('selector')) {
        e.target.classList.add('active');
    }
}
function clearCanvas() {
    Array.from(canvas.children).forEach(e => {
        e.style.backgroundColor = 'rgb(255, 255, 255)';
    })
}
//call function to get initial range value 
//and apply it to both canvas and label for range-input
changeRange();
range.addEventListener('change', changeRange)
for(let selector of selectors) {
    selector.addEventListener('click', activate)
}
cleanCanvasBtn.addEventListener('click', clearCanvas)