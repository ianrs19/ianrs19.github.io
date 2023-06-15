const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const productItems = document.getElementsByClassName('product-item');
const all = document.getElementById('all-prods');
const farm = document.getElementById('p-farma');
const ind = document.getElementById('p-ind');
const ali = document.getElementById('p-ali');
const agri = document.getElementById('p-agri');
const cos = document.getElementById('p-cos');
const psc = document.getElementById('p-psc');
const catToggle = document.getElementById('op-cl-catlist');
const catList = document.getElementById('cat_list');
const catContainer = document.getElementById('cat-cont');
const arrowCategories = document.getElementById('arrowCategories');
const prodTitles = document.querySelectorAll('.prod-title');
const prodContainer = document.getElementById('products-container');
const errorScreen = document.getElementById('search-error');
const backTop = document.getElementById('back-to-top');
var catActual = document.getElementById('cat-act-title');
var opened = 0;

all.addEventListener('click', openProdCont);
ali.addEventListener('click', openProdCont);
farm.addEventListener('click', openProdCont);
ind.addEventListener('click', openProdCont);
agri.addEventListener('click', openProdCont);
cos.addEventListener('click', openProdCont);
psc.addEventListener('click', openProdCont);

if (window.innerWidth <= 1000) {
    catList.classList.add('list-closed');
    catContainer.style.height = '0';

    all.addEventListener('click', opOrCloseList);
    all.addEventListener('click', chooseCat);

    ali.addEventListener('click', opOrCloseList);
    ali.addEventListener('click', chooseCat);

    farm.addEventListener('click', opOrCloseList);
    farm.addEventListener('click', chooseCat);

    ind.addEventListener('click', opOrCloseList);
    ind.addEventListener('click', chooseCat);

    agri.addEventListener('click', opOrCloseList);
    agri.addEventListener('click', chooseCat);

    cos.addEventListener('click', opOrCloseList);
    cos.addEventListener('click', chooseCat);

    psc.addEventListener('click', opOrCloseList);
    psc.addEventListener('click', chooseCat);
}

window.addEventListener('scroll', function () {
    var backToTopButton = document.getElementById('back-to-top');
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition >= 1000 && window.innerWidth >= 1100) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.display = 'none';
    }
});


backTop.addEventListener('click', function () {
    // scroll suave hasta el principio de la página
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});




function chooseCat() {
    catActual.textContent = this.textContent;
}

function openProdCont() {
    prodContainer.style.display = 'grid';
    errorScreen.style.display = 'none';
}


function normalizeString(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchProducts() {
    catActual.textContent = 'Todas las Categorías';
    const searchTerm = normalizeString(searchInput.value.toLowerCase()); // Normalizar y convertir el valor del campo de entrada a minúsculas
    let foundItems = false; // Variable para rastrear si se encontraron elementos

    if (searchTerm != '') {
        searchInput.value = "";
        searchInput.focus();
        searchInput.classList.remove('empty-err');
        searchInput.placeholder = 'Ej: Acido Láctico';
        // Iterar sobre los productos y mostrar u ocultar según el término de búsqueda
        for (let i = 0; i < productItems.length; i++) {

            const productName = normalizeString(productItems[i].querySelector('div').textContent.toLowerCase()); // Normalizar y convertir el nombre del producto a minúsculas

            all.classList.add('ct_item-active');
            farm.classList.remove('ct_item-active');
            ind.classList.remove('ct_item-active');
            ali.classList.remove('ct_item-active');
            agri.classList.remove('ct_item-active');
            cos.classList.remove('ct_item-active');
            if (window.innerWidth <= 1000) {
                closeList();
            }

            if (productName.includes(searchTerm) || searchTerm === '') {

                productItems[i].style.display = 'flex';
                productItems[i].style.transform = 'scale(0)';
                productItems[i].style.transition = 'transform 400ms';

                setTimeout(function () {
                    productItems[i].style.transform = 'scale(1)';
                }, 0);

                foundItems = true; // Se encontró al menos un elemento
                prodContainer.style.display = 'grid';
                errorScreen.style.display = 'none';
            } else {
                productItems[i].style.display = 'none';
            }
        }

        // Mostrar mensaje de error si no se encontraron elementos
        if (!foundItems) {
            prodContainer.style.display = 'none';
            errorScreen.style.display = 'flex';
        }
    } else {
        searchInput.classList.add('empty-err');
        searchInput.placeholder = 'El campo no puede estar vacío';
    }

}



function opOrCloseList() {
    if (opened === 0) {
        arrowCategories.style.transform = 'rotate(180deg)';
        catList.classList.remove('list-closed');
        catList.classList.add('list-opened');
        catContainer.style.height = 'fit-content';
        catToggle.style.bottom = '0';
        catToggle.style.marginBottom = '22px';
        opened = 1;
    } else {
        closeList();
    }
};

function closeList() {
    arrowCategories.style.transform = 'rotate(0deg)';
    catContainer.style.height = '0';
    catList.classList.add('list-closed');
    catList.classList.remove('list-opened');
    catToggle.style.bottom = '20px';
    catToggle.style.marginBottom = '0px';
    opened = 0;
}

catToggle.addEventListener('click', () => {
    if (window.innerWidth <= 1000) {
        opOrCloseList();
    }
});

searchButton.addEventListener('click', searchProducts);

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

if (window.innerWidth <= 850) {
    const prodTitles = document.querySelectorAll('.prod-title');
    const prodImgs = document.querySelectorAll('.img-Prod');
    const infoBtnImgs = document.querySelectorAll('.info-btn-Prod');
    const prodItemSelected = document.querySelectorAll('.product-item');

    prodTitles.forEach(function (prodTitle, index) {
        prodTitle.addEventListener('click', function () {
            const prodAttrList = this.nextElementSibling;
            const prodImg = prodImgs[index];
            const infoBtnImg = infoBtnImgs[index];

            if (prodAttrList.style.display === 'flex') {
                prodAttrList.style.display = 'none';
                prodImg.classList.remove('disable-atribs');
                prodImg.classList.add('enable-flex');
                infoBtnImg.src = "/assets/img/icons/zoom-in.svg";
            } else {
                prodImg.classList.remove('enable-flex');
                prodImg.classList.add('disable-atribs');
                prodAttrList.style.display = 'flex';
                prodImg.style.display = 'none';
                infoBtnImg.src = "/assets/img/icons/arrows-minimize.svg";
            }

            if (prodAttrList.style.display === 'flex') {
                prodItemSelected[index].style.flexDirection = 'column-reverse';
                prodItemSelected[index].style.minHeight = '273px';
            } else {
                prodItemSelected[index].style.flexDirection = 'column';
            }
        });
    });
}
