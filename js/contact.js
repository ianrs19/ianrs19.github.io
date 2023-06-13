const contenidoDiv = document.getElementById('contact-media');
const alturaDefinida = 2400; // Altura en píxeles a partir de la cual se oculta el div
let isVisible = true; // Bandera para controlar la visibilidad del div

window.addEventListener('scroll', function () {
    if (window.innerWidth > 768) { // Dispositivos de escritorio (ancho mayor a 768px)
        if (window.pageYOffset >= 2300 && isVisible) {
            // El scroll ha alcanzado la altura definida y el div está visible, entonces se oculta
            contenidoDiv.style.display = 'none';
            isVisible = false;
        } else if (window.pageYOffset < 2300 && !isVisible) {
            // El scroll está por debajo de la altura definida y el div está oculto, entonces se muestra
            contenidoDiv.style.display = 'block';
            isVisible = true;
        }
    } else { // Dispositivos móviles (ancho menor o igual a 768px)
        if (window.pageYOffset >= 4500 && isVisible) {
            // El scroll ha alcanzado la altura definida y el div está visible, entonces se oculta
            contenidoDiv.style.display = 'none';
            isVisible = false;
        } else if (window.pageYOffset < 4500 && !isVisible) {
            // El scroll está por debajo de la altura definida y el div está oculto, entonces se muestra
            contenidoDiv.style.display = 'block';
            isVisible = true;
        }
    }
});