import Firebase from "../models/firebase";

const firebase = new Firebase()

// Registro en Firebase (Email y Password)
const registerForm = document.querySelector('.register');
registerForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    firebase.registro(email,password,registerForm);
    
})
