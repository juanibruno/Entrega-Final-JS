
const apiAqua = './js/ApiDescuento.json';
const main = document.querySelector('#main');

let data;
let contenedor;

function fetchData() {
    return new Promise((resolve, reject) => {
        fetch(apiAqua)
            .then(res => {
                if (!res.ok) {
                    reject(new Error('Error throw'));
                }
                return res.json();
            })
            .then(apiData => {
                resolve(apiData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function mostrarSeccion() {
    fetch(apiAqua)
        .then(res => {
            if (!res.ok) {
                throw new Error('Error throw');
            }
            return res.json();
        })
        .then(apiData => {

            data = apiData;
            data.forEach(tarjeta => {
                const contenedor = document.createElement('div');
                contenedor.classList.add('contenedor-card');

                const descuento = document.querySelector('#descuentos')


                descuento.addEventListener('click', (event) => {
                    event.preventDefault();

                    contenedor.innerHTML =
                        `
                <div class="cardDos">
                    <img src="${tarjeta.imagen}" alt="Descripción de la imagen">
                    <h2 class="titulo">* Seccion ${tarjeta.titulo} *</h2>
                    <button class="btn-descuento"data-id="${tarjeta.id}" > proba suerte </button>
                </div>
                `;

                document.body.appendChild(contenedor);
                /* const Seccion = mostrarSeccion(); */
            });
        })
    })
        .catch(error => console.error(error));
    return 'btn-descuento';
}


function volverArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



function mostrarInformacion(id) {
    
    if (Array.isArray(data)) {
        
        const tarjetaSeleccionada = data.find(tarjeta => tarjeta.id == id);
        if (tarjetaSeleccionada) {

        

            Toastify({
                text: `¡FELICIDADES! Ganaste: ${tarjetaSeleccionada.bonificacion}% de Ahorro en tu siguiente compra en el rubro ${tarjetaSeleccionada.titulo}. ${tarjetaSeleccionada.descripcion}`,
                duration: 3000, 
                gravity: "center", 
                position: "center", 
                background: "linear-gradient(to right, #00b09b, #96c93d)", 
                callback: function () {
                   
                    abrirFormulario();
                    volverArriba();
                }
            }).showToast();
        } else {
            console.log(`No se encontró información para la tarjeta con id ${id}`);
        }
    } 
}

document.body.addEventListener('click', (event) => {
    const btnDescuento = event.target.closest('.btn-descuento');
    if (btnDescuento) {
       
        const id = btnDescuento.dataset.id;
        mostrarInformacion(id);
    }
});
mostrarSeccion();


function abrirFormulario() {
    const formulario = document.getElementById('miFormulario');
    formulario.style.display = 'block';
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 

  
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        console.log('Nnombre');

       
        const datosFormulario = {
            nombre: nombre,
            correo: correo
         
        };
        
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));

        
        window.location.href = "index2.html";
    });
    
}

const tarjetaGuardada = localStorage.getItem('tarjetaSeleccionada');
if (tarjetaGuardada) {
    const tarjetaSeleccionada = JSON.parse(tarjetaGuardada);
    console.log(tarjetaGuardada);
}