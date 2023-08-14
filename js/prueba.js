var swiper = new Swiper(".mySwiper", {
    freeMode: true,

    effect: "coverflow",

    slidesPerGroup: 1,

    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },

    breakpoints: {
        1300: {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 200,

        },

        992: {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 200,
        },

        576: {
            slidesPerView: 2,
            spaceBetween: 20,
            speed: 200,
        },

        0: {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 200,
        },
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

window.addEventListener('load', (e) => {
    eventosCarta();
    pasarHojas();
    efectoImagenes();
});


function eventosCarta() {
    const carta = document.getElementById('carta');
    const btnCerrar = document.getElementById('btnCerrar');
    const fondoImagen = document.querySelector('.fondoImagen');

    carta.addEventListener('mouseover', (e) => {
        carta.classList.add("hover");
    });

    if (screen.width > 768) {
        carta.addEventListener('mouseout', (e) => {
            if(!fondoImagen.classList.contains("abierto")){
                carta.classList.remove("hover");
            }
        });
    } else {
        btnCerrar.addEventListener('click', (e) => {
            carta.classList.remove("hover");
        });
    }
}

function pasarHojas() {
    const hojas = document.querySelectorAll('main .carta .contenido .posiciones #mensajes .cuaderno .hoja');
    let limite = hojas.length*10;
    console.log(hojas);

    for(let i = 0; i < hojas.length; i++){
        const limiteInterior = limite;
        hojas[i].addEventListener('click',(e)=>{
            console.log(i);
            if(hojas[i].classList.contains("pasar")){
                if(i===0 || !hojas[i-1].classList.contains("pasar")){
                    hojas[i].classList.remove("pasar");
                    hojas[i].removeAttribute("style");
                }
            }else{
                if(i===6 || hojas[i+1].classList.contains("pasar")){
                    hojas[i].classList.add("pasar");
                    hojas[i].setAttribute("style","z-index:"+ limiteInterior);
                }
            }
        });
        limite -= 10; 
    }
}

function efectoImagenes(){
    const imagenes = document.querySelectorAll('.img img');
    const fondoImagen = document.querySelector('.fondoImagen');
    
    imagenes.forEach(imagen => {
        imagen.addEventListener('click',(e)=>{
            const ruta = imagen.getAttribute("src");
            fondoImagen.lastElementChild.setAttribute("src", ruta);
            console.log(fondoImagen.firstElementChild);
            fondoImagen.classList.add("abierto");
        });
    });

    fondoImagen.firstElementChild.addEventListener('click',(e)=>{
        fondoImagen.classList.remove("abierto");
    });
    
}