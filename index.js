const area = document.querySelector('.bubble-area');
const colores = [];

let guardadas = localStorage.getItem('burbujas');
if(guardadas){
    guardadas = JSON.parse(guardadas);
    guardadas.forEach(element => {
        const nueva =  document.createElement('div');
        nueva.classList.add('bubble');    
        nueva.style.left = element.left
        nueva.style.top = element.top;
        nueva.style.width = element.size;
        nueva.style.height = element.size;
        nueva.style.backgroundColor = element.color;
        area.append(nueva);
    });
}

function bubbler(){
    const nueva =  document.createElement('div');
    nueva.classList.add('bubble');
    const size = randomInt(200);
    const posX = randomInt(window.innerWidth);
    const posY = randomInt(window.innerHeight);
    nueva.style.left = `${posX}px`;
    nueva.style.top = `${posY}px`;
    nueva.style.width = `${size}px`;
    nueva.style.height = `${size}px`;
    nueva.style.backgroundColor = randomColor();
    area.append(nueva);
}

function randomInt(limite){
    return Math.round(Math.random() * limite);
}

function randomColor(){
    return `rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`;
}

function randomColor2(){
    if(colores.length === 0){
        for(let i = 0; i<10;i++){
            colores.push(randomColor());
        }
    }
    return colores[randomInt(colores.length)];
}

document.addEventListener('keydown', (event) => {
    switch(event.key){
        case ' ':
            bubbler();
            break;
        case 'e':
            console.log('borrado');
        case 'd':
            const bubble = document.querySelector('.bubble_active');
            if(bubble){
                bubble.remove();
            }        
            break;
        case 'g':
            let burbujas = document.querySelectorAll('.bubble');
            burbujas = Array.from(burbujas);
            burbujas = burbujas.map(item => {
                return {color: item.style.backgroundColor, top: item.style.top, left: item.style.left, size: item.style.width}
            });
            localStorage.setItem('burbujas', JSON.stringify(burbujas));
            break;
        default:
            console.log('opción invalida');    
            break;
    }
});

function bubbleClick(event){
    const target = event.target;
    if(target.classList.contains('bubble')){
        desactivarBubble();
        event.target.classList.add('bubble_active');
    }else{
        desactivarBubble();
    }
}

function desactivarBubble(){
    const bubble = document.querySelector('.bubble_active');
    if(bubble){
        bubble.classList.remove('bubble_active');
    }
}

document.addEventListener('click', bubbleClick);

document.addEventListener('mousemove', (event) => {
    const bubble = document.querySelector('.bubble_active');
    if(bubble){
        bubble.style.top = `${event.clientY}px`;
        bubble.style.left = `${event.clientX}px`;
    }
});