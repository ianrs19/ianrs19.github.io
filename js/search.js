// Obtener elementos del DOM
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

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase(); // Obtener el valor del campo de entrada y convertirlo a minúsculas

    // Limpiar los registros de nombres de productos mostrados
    shownProductNames.length = 0;

    // Iterar sobre los productos y mostrar u ocultar según el término de búsqueda
    for (let i = 0; i < productItems.length; i++) {
        const productName = productItems[i].querySelector('a').textContent.toLowerCase(); // Obtener el nombre del producto y convertirlo a minúsculas

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

