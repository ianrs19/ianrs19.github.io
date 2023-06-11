// Obtener elementos del DOM para la busqueda de productos por caracteres
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const productItems = document.getElementsByClassName('product-item');
const all = document.getElementById('all-prods');
const farm = document.getElementById('p-farma');
const ind = document.getElementById('p-ind');
const ali = document.getElementById('p-ali');
const agri = document.getElementById('p-agri');
const cos = document.getElementById('p-cos');
const catToggle = document.getElementById('op-cl-catlist');
const catList = document.getElementById('cat_list');
const catContainer = document.getElementById('cat-cont');
const arrowCategories = document.getElementById('arrowCategories');
const prodTitles = document.querySelectorAll('.prod-title');
var opened = 0; // Esta cerrada por defecto

if (window.innerWidth <= 1000) {
    catList.classList.add('list-closed');
    catContainer.style.height = '0';
}

const opOrCloseList = () => {
    if (opened === 0) {
        arrowCategories.style.transform = 'rotate(180deg)';
        catList.classList.remove('list-closed');
        catList.classList.add('list-opened');
        catContainer.style.height = 'fit-content';
        catToggle.style.bottom = '0';
        opened = 1; // Actualiza el estado a "abierta"
    } else {
        arrowCategories.style.transform = 'rotate(0deg)';
        catContainer.style.height = '0';
        catList.classList.add('list-closed');
        catList.classList.remove('list-opened');
        catToggle.style.bottom = '20px';
        opened = 0; // Actualiza el estado a "cerrada"
    }
};

catToggle.addEventListener('click', () => {
    if (window.innerWidth <= 1000) {
        opOrCloseList();
    }
});


// Registrar los nombres de los productos mostrados
const shownProductNames = [];

// Agregar evento click al botón de búsqueda
searchButton.addEventListener('click', searchProducts);

// Agregar evento keydown al campo de entrada
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// Función de normalización de caracteres con tilde
function normalizeString(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchProducts() {
    const searchTerm = normalizeString(searchInput.value.toLowerCase()); // Normalizar y convertir el valor del campo de entrada a minúsculas

    // Limpiar los registros de nombres de productos mostrados
    shownProductNames.length = 0;

    // Iterar sobre los productos y mostrar u ocultar según el término de búsqueda
    for (let i = 0; i < productItems.length; i++) {
        const productName = normalizeString(productItems[i].querySelector('div').textContent.toLowerCase()); // Normalizar y convertir el nombre del producto a minúsculas

        all.classList.add('ct_item-active');
        farm.classList.remove('ct_item-active');
        ind.classList.remove('ct_item-active');
        ali.classList.remove('ct_item-active');
        agri.classList.remove('ct_item-active');
        cos.classList.remove('ct_item-active');

        // Mostrar u ocultar productos según el término de búsqueda
        if ((productName.includes(searchTerm) || searchTerm === '') && !shownProductNames.includes(productName)) {
            searchInput.value = "";
            productItems[i].style.display = 'flex'; // Mostrar producto
            productItems[i].style.transform = 'scale(0)'; // Establecer escala inicial a 0
            productItems[i].style.transition = 'transform 400ms'; // Establecer duración de la transición

            setTimeout(function () {
                productItems[i].style.transform = 'scale(1)'; // Establecer escala a 1 después de 400ms
            }, 0); // Esperar un ciclo para aplicar la transición

            shownProductNames.push(productName); // Registrar el nombre del producto mostrado
        } else {
            productItems[i].style.display = 'none'; // Ocultar producto
        }
    }
}



// Obtener elementos del DOM para la muestra de la descripcion del producto seleccionado
if (window.innerWidth <= 850) {
    const prodTitles = document.querySelectorAll('.prod-title');
    const prodImgs = document.querySelectorAll('.img-Prod');
    const infoBtnImgs = document.querySelectorAll('.info-btn-Prod');

    prodTitles.forEach(function (prodTitle, index) {
        prodTitle.addEventListener('click', function () {
            const prodAttrList = this.nextElementSibling;
            const prodImg = prodImgs[index];
            const infoBtnImg = infoBtnImgs[index];

            if (prodAttrList.style.display === 'flex') {
                prodAttrList.style.display = 'none';
                prodImg.classList.remove('disable-atribs');
                prodImg.classList.add('enable-flex');
                infoBtnImg.src = "/assets/img/icons/zoom-in.svg"; // Cambiar la imagen a su valor original
            } else {
                prodImg.classList.remove('enable-flex');
                prodImg.classList.add('disable-atribs');
                prodAttrList.style.display = 'flex';
                prodImg.style.display = 'none';
                infoBtnImg.src = "/assets/img/icons/arrows-minimize.svg"; // Cambiar la imagen al desplegar la lista
            }
        });
    });
}


