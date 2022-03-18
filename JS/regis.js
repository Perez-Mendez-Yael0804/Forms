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
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
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
		document.querySelector(`#grupo__contra2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[contra] = false;
	}else{
		document.getElementById(`grupo__contra2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contra2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__contra2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[contra] = true;
	}
}

const contra1 = document.getElementById('contra');
const contra2 = document.getElementById('contra2');

const toggle = document.getElementById('toggle');
const toggle1 = document.getElementById('toggle1');

VerContraseña = () => {
	if(contra1.type == 'password'){
		contra1.setAttribute('type', 'text');
		toggle.classList.remove('fa-eye-slash');
		toggle.classList.add('fa-eye');
	}else{
		toggle.classList.add('fa-eye-slash');
		toggle.classList.remove('fa-eye');
		contra1.setAttribute('type', 'password');
	}
}

toggle.addEventListener('click', VerContraseña);

VerContraseña2 = () => {
	if(contra2.type == 'password'){
		contra2.setAttribute('type', 'text');
		toggle1.classList.remove('fa-eye-slash');
		toggle1.classList.add('fa-eye');
	}else{
		toggle1.classList.add('fa-eye-slash');
		toggle1.classList.remove('fa-eye');
		contra2.setAttribute('type', 'password');
	}
}

toggle1.addEventListener('click', VerContraseña2);

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

			//Ojo1
			toggle.classList.remove('fa-eye');

			//Ojo 2
			toggle1.classList.remove('fa-eye');

		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje-error').classList.add('formulario__mensaje-error-activo');
	}

});

