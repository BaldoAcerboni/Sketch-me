const canvas = document.getElementById('canvas');
const range = document.getElementById('square-nr');
const rangeLabel = document.getElementById('range-label');
const squares = document.getElementsByClassName('pixel');
const selectors = document.getElementsByClassName('selector');
const canvasWidth = 600;
const canvasHeight = 600;



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
    for(let square of squares) {
        square.addEventListener('mouseover', color)
    }
    for(let selector of selectors) {
        selector.addEventListener('click', activate)
    }
}
function color(e) {
    //WTF am I doing? go to sleep 

    e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    //console.log(e.target)
}
function randomColor() {
    return Math.floor(Math.random() * 256);
}

//WTF am I doing? go to sleep 
function activate(e) {
    e.target.style.borderColor = 'green';
}
changeRange();
range.addEventListener('change', changeRange)