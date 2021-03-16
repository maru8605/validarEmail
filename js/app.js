//variables 
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();

function eventListeners (){
    document.addEventListener('DOMContentLoaded', iniciarApp);

// campos 
    email.addEventListener('blur', validarFormularios);
    asunto.addEventListener('blur', validarFormularios);
    mensaje.addEventListener('blur', validarFormularios);

// enviar
    formulario.addEventListener('submit', enviarEmail);
// reset
    resetBtn.addEventListener('click', resetearFormulario);
};



//funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
};

// valida
function validarFormularios(e){

    if(e.target.value.length > 0) {
        // elimina errores...
        const error = document.querySelector('p.error');
        if(error){
          error.remove();  
        };
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    if(e.target.type === 'email') {
        // validar con expresion regular   
        if( er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();  
              }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El email no es valido');
        }
    }
    if (er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50'); 
    }
};

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent= mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500' ,'p-3', 'mt-5', 'text-center', 'rounded-md', 'error');

    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
    
}

// enviar formulario 
function enviarEmail(e) {
    e.preventDefault();

   const spinner = document.querySelector('#spinner');
   spinner.style.display = 'flex';
//    envio exitoso

   setTimeout( () => {
        spinner.style.display = 'none'; 

        const parrafo = document.createElement('p');
        parrafo.textContent = 'Listo! tu Email fue enviado.';
        parrafo.classList.add('text-center','my-10','p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        // inserta parrafo antes del spinner 
        formulario.insertBefore (parrafo, spinner)

        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 5000);
        
   }, 3000);
};

// reset

function resetearFormulario () {
    formulario.reset();
    e.preventDefault();
};