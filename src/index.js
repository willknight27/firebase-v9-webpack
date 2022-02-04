import Firebase from "../models/firebase";

const firebase = new Firebase

// Registro en Firebase (Email y Password)
/* const registerForm = document.querySelector('.register');
registerForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    firebase.registro(email,password,registerForm);
    
}) */

// Login
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = document.querySelector('#emailLogin').value
    const password = document.querySelector('#passwordLogin').value

    firebase.login(email,password,loginForm);

    const user = localStorage.getItem('usuario');
    const userJSON = JSON.parse(user);

    document.querySelector('.info-user').innerHTML = userJSON.email

    
})

// logout
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e) =>{
    e.preventDefault()

    firebase.logout()
    document.querySelector('.info-user').innerHTML = ''
    
})

