const canvas = document.getElementById('canvas');
for(let i = 0; i < 100; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.width = canvas.computedStyleMap().get('width').value / 10 + 'px';
    pixel.style.height = canvas.computedStyleMap().get('height').value / 10 + 'px';
    canvas.appendChild(pixel);
}
//console.log(canvas.computedStyleMap().get('width').value)