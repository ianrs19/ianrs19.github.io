const checkbox = document.getElementById('checkbox');
const navigation = document.getElementById('ul-navigation');
const dropProd = document.getElementById('dropdownMenuButton');
const spanProd = document.getElementById('icon-drop-prod');
const dropItemDown = document.getElementById('navi-item-down');
const typeProdMenu = document.getElementById('prod-types-menu');
const arrow = document.getElementById('arrow');
const link = document.querySelector('.navi-item');
const link2 = document.querySelector('.dropdown-item');
const closeNav = () => {
  navigation.classList.add('disable');
  navigation.classList.remove('enable');
  checkbox.checked = false;
};

const enableNav = () => {
  const enable = checkbox.checked;
  navigation.classList.toggle('disable', !enable);
  navigation.classList.toggle('enable', enable);
  if (!enable) {
    navigation.style.height = '260px';
    typeProdMenu.style.display = 'none';
    navigation.style.justifyContent = 'flex-start';
    arrow.style.transform = 'rotateX(0deg)';
    arrow.style.stroke = '#2764e8e9';
    dropItemDown.style.marginTop = '0px';
    spanProd.classList.add('inactive-prod-list');
    spanProd.classList.remove('active-prod-list');
  }
};

const enableProdList = () => {
  const isActive = spanProd.classList.contains('inactive-prod-list');

  navigation.style.height = isActive ? '505px' : '260px';
  typeProdMenu.style.display = isActive ? 'flex' : 'none';
  typeProdMenu.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  navigation.style.justifyContent = 'flex-start';
  dropItemDown.style.marginTop = isActive ? '-15px' : '0px';
  arrow.style.transform = isActive ? 'rotateX(180deg)' : 'rotateX(0deg)';
  arrow.style.stroke = isActive ? 'red' : '#2764e8e9';
  spanProd.classList.toggle('active-prod-list', isActive);
  spanProd.classList.toggle('inactive-prod-list', !isActive);
};

link.addEventListener('click', closeNav);
link2.addEventListener('click', closeNav);

checkbox.addEventListener('click', () => {
  if (window.innerWidth <= 1000) {
    enableNav();
  }
});

dropProd.addEventListener('click', () => {
  if (window.innerWidth <= 1000) {
    enableProdList();
  }
});



const images1 = [
  "/assets/img/us/AMBIENTE1.jpeg",
  "/assets/img/us/AMBIENTE3.jpeg",
  "/assets/img/bg/reciclaje.jpg",
  "/assets/img/us/AMBIENTE2.jpeg"
];

const images2 = [
  "/assets/img/us/SOCIAL1.jpeg",
  "/assets/img/us/SOCIAL2.jpeg"
];

const images3 = [
  "/assets/img/us/ECON2.jpeg",
  "/assets/img/us/ECON3.jpeg"
];

let currentImageIndex1 = 0;
let currentImageIndex2 = 0;
let currentImageIndex3 = 0;
const imageElement1 = document.querySelector("#ambient .amb-img");
const imageElement2 = document.querySelector("#social .amb-img");
const imageElement3 = document.querySelector("#economic .amb-img");

function changeImage1() {
  imageElement1.classList.add("hidden");

  setTimeout(function () {
      currentImageIndex1 = (currentImageIndex1 + 1) % images1.length;
      imageElement1.src = images1[currentImageIndex1];
      imageElement1.classList.remove("hidden");
  }, 800); // Cambia cada 5 segundos (5000ms)
}

function changeImage2() {
  imageElement2.classList.add("hidden");

  setTimeout(function () {
      currentImageIndex2 = (currentImageIndex2 + 1) % images2.length;
      imageElement2.src = images2[currentImageIndex2];
      imageElement2.classList.remove("hidden");
  }, 800); // Cambia cada 5 segundos (5000ms)
}

function changeImage3() {
  imageElement3.classList.add("hidden");

  setTimeout(function () {
      currentImageIndex3 = (currentImageIndex3 + 1) % images3.length;
      imageElement3.src = images3[currentImageIndex3];
      imageElement3.classList.remove("hidden");
  }, 800); // Cambia cada 5 segundos (5000ms)
}

setInterval(changeImage1, 4000); // Ejecuta la función cada 5 segundos (5000ms)
setInterval(changeImage2, 4000); // Ejecuta la función cada 5 segundos (5000ms)
setInterval(changeImage3, 4000); // Ejecuta la función cada 5 segundos (5000ms)
