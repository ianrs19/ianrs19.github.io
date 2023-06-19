window.onload = function () {
    let disponibilidad = document.getElementById('inmediata');
    let tiempoRequerido = document.getElementById('tiempo');

    // Verificar el estado de disponibilidad inicialmente
    if (disponibilidad.value === 'Sí') {
        tiempoRequerido.value = '0';
        tiempoRequerido.disabled = true;
    }

    // Agregar evento de cambio a la opción de disponibilidad
    disponibilidad.onchange = function () {
        if (disponibilidad.value === 'Sí') {
            tiempoRequerido.value = '0';
            tiempoRequerido.disabled = true;
        } else {
            tiempoRequerido.value = '';
            tiempoRequerido.disabled = false;
        }
    };
};

const subCV = document.getElementById('sub-btn');
const requiredBlanks = document.querySelectorAll('.form-control');
const fileInput = document.getElementById('file-input');

const submitReqRecruitment = (event) => {
  let allFilled = true;
  let firstEmptyField = null;

  requiredBlanks.forEach((input) => {
    if (input.value.trim() === '') {
      input.style.borderBottom = '1px solid #ff0000';
      allFilled = false;

      if (!firstEmptyField) {
        firstEmptyField = input;
      }
    } else {
      input.style.borderBottom = '1px solid #3f6eff70';
    }
  });

  if (fileInput.value.trim() === '') {
    fileInput.style.borderRight = '3px solid #ff0000';
    allFilled = false;

    if (!firstEmptyField) {
      firstEmptyField = fileInput;
    }
  } else {
    fileInput.style.border = '1px solid #3f6eff70';
  }

  if (!allFilled) {
    event.preventDefault(); // Detiene la ejecución del evento click

    if (firstEmptyField) {
      firstEmptyField.focus(); // Lleva al usuario al primer campo vacío
    }

    console.log('¡Algunos campos están vacíos! Por favor, rellena todos los campos.');
  }
};

subCV.addEventListener('click', submitReqRecruitment);





