(function () {
    function canvasPosition(event) {
        x = event.clientX - ctx.canvas.offsetLeft;
        y = event.clientY - ctx.canvas.offsetTop;
        console.log(`x,y:${x},${y}`);
    }

    ctx.canvas.addEventListener('click', canvasPosition, false);
}());