const nombreInput = document.getElementById('nombre');
const textoInput = document.getElementById('texto');
const btnGenerar = document.getElementById('btn-generar');
const btnDescargar = document.getElementById('btn-descargar');
const canvas = document.getElementById('qrcode');

// Función que valida si los campos están llenos
function validarCampos() {
  const nombreValido = nombreInput.value.trim() !== '';
  const textoValido = textoInput.value.trim() !== '';
  btnGenerar.disabled = !(nombreValido && textoValido);
}

// Eventos para activar el botón cuando los campos se llenen
nombreInput.addEventListener('input', validarCampos);
textoInput.addEventListener('input', validarCampos);

// Función que genera el QR
function generarQR() {
  const texto = textoInput.value.trim();
  const color = document.querySelector('input[name="color"]:checked').value;

  if (!texto) return;

  QRCode.toCanvas(canvas, texto, {
    color: {
      dark: color,
      light: '#ffffff'
    },
    width: 200,
    margin: 2
  }, function (error) {
    if (error) console.error(error);
    else {
      // Activar el botón de descarga una vez generado el QR
      btnDescargar.disabled = false;
    }
  });

  
}

// Función que descarga el QR
function descargarQR() {
  const enlace = document.createElement('a');
  const nombreQR = nombreInput.value.trim() || 'codigoQR';
  enlace.href = canvas.toDataURL('image/png');
  enlace.download = `${nombreQR}.png`;
  enlace.click();
}


function reiniciarFormulario() {
// Limpiar inputs
nombreInput.value = '';
textoInput.value = '';
document.querySelector('input[name="color"][value="#000000"]').checked = true

// Limpiar el canvas
const contexto = canvas.getContext('2d');
contexto.clearRect(0, 0, canvas.width, canvas.height);

// Desactivar botones
btnGenerar.disabled = true;
btnDescargar.disabled = true;
nombreInput.focus();
} 