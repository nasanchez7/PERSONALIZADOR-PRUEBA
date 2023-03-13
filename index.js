var canvas = new fabric.Canvas('canvas', { width: 800, height: 1000 });
var padding = 10;


//Delimitador
canvas.on('object:moving', function(e) {
    var obj = e.target;
    
    // if object is too big ignore
    if (obj.currentHeight > obj.canvas.height - padding * 2 ||
        obj.currentWidth > obj.canvas.width - padding * 2) {
        return;
    }
    obj.setCoords();

    // top-left corner
    if (obj.getBoundingRect().top < padding ||
    	obj.getBoundingRect().left < padding) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top + padding);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left + padding);
    }
    
    // bot-right corner
    if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height - padding || 
    	obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width - padding) {
        obj.top = Math.min(
        	obj.top,
        	obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top - padding);
        obj.left = Math.min(
        	obj.left,
            obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left - padding);
    }
});

//Controles
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.3,
    y: -0.65,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 40
});

function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
        canvas.remove(target);
    canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size/2, -size/2, size, size);
    ctx.restore();
}

const formularioTexto = document.getElementById('formulario');
const formularioImagen = document.getElementById('formularioImage')

const textoInput = document.getElementById('texto')

const imagen = document.getElementById('imagen')

formularioTexto.addEventListener('submit',(e)=> {
    e.preventDefault()
    let text = new fabric.IText(textoInput.value, { left: 100, top: 100 });
    canvas.add(text);
})

const handleFiles = (files) => {
    console.log(files[0])
    fabric.Image.fromURL(`${URL.createObjectURL(files[0])}`, function(oImg) {
        canvas.add(oImg);
    }, {
        left: 100,
        top: 100,
        scaleX: 0.2,
        scaleY: 0.2
    });
}

formularioImagen.addEventListener('submit',(e)=> {
    e.preventDefault()
})


window.addEventListener('keyup', (e) => {
    switch (e.key) {
         case 'Delete': // delete
            var activeObject = canvas.getActiveObject();
            if (activeObject) canvas.remove(activeObject);
    }
e.preventDefault(); 
})
