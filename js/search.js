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

// Registrar los nombres de los productos mostrados
const shownProductNames = [];

// Agregar evento de clic al botón de búsqueda
searchButton.addEventListener('click', function () {
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
            productItems[i].style.display = 'block'; // Mostrar producto
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
});