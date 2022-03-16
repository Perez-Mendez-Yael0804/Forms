const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	contra: false,
	correo: false,
	telefono: false
}

const validarFormu = (e) => {
	switch (e.target.name){
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		
		case "apellidos":
			validarCampo(expresiones.nombre, e.target, 'apellidos');
		break;
		
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;

		case "contra":
			validarCampo(expresiones.password, e.target, 'contra');
			validarContra2();
		break;

		case "contra2":
			validarContra2();
		break;
	}
}


const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarContra2 = () => {
	const inputContra1 = document.getElementById('contra');
	const inputContra2 = document.getElementById('contra2');

	if(inputContra1.value !== inputContra2.value){
		document.getElementById(`grupo__contra2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contra2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__contra2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__contra2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__contra2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[contra] = false;
	}else{
		document.getElementById(`grupo__contra2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contra2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__contra2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__contra2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__contra2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[contra] = true;
	}
}

const eye1 = document.getElementById('eye1');
const eye2 = document.getElementById('eye2');

eye1.addEventListener('click', (e) => {
	const inputContra1 = document.getElementById('contra');
	if(inputContra1.type == "password"){
		inputContra1.type = "text";
		document.getElementById(`eye1`).classList.add('vistax');
		document.querySelector(`#eye1 i`).classList.add('fa-eye');
		document.querySelector(`#eye1 i`).classList.remove('fa-eye-slash');
	}else{
		inputContra1.type = "password";
		document.getElementById(`eye1`).classList.add('vistax');
		document.querySelector(`#eye1 i`).classList.remove('fa-eye');
		document.querySelector(`#eye1 i`).classList.add('fa-eye-slash');
	}
})

eye2.addEventListener('click', (e) => {
	const inputContra2 = document.getElementById('contra2');
	if(inputContra2.type == "password"){
		inputContra2.type = "text";
		document.getElementById(`eye2`).classList.add('vistax');
		document.querySelector(`#eye2 i`).classList.add('fa-eye');
		document.querySelector(`#eye2 i`).classList.remove('fa-eye-slash');
	}else{
		inputContra2.type = "password";
		document.getElementById(`eye2`).classList.add('vistax');
		document.querySelector(`#eye2 i`).classList.remove('fa-eye');
		document.querySelector(`#eye2 i`).classList.add('fa-eye-slash');
	}
})



inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormu);
    input.addEventListener('blur', validarFormu);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellidos && campos.contra && campos.correo  && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-error').classList.remove('formulario__mensaje-error-activo');
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje-error').classList.add('formulario__mensaje-error-activo');
	}

});

