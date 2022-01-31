import Firebase from "../models/firebase";


const firebase = new Firebase
firebase.getDocuments()


// Agregar juego
const addGameForm = document.querySelector('.add');
addGameForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const juego = {
        title: document.querySelector("#title").value,
        publisher: document.querySelector("#publisher").value
        // publisher: addGameForm.publisher.value
    }
    
    firebase.agregarDoc(juego, addGameForm);
})

// Borrar juego
const deleteGameForm = document.querySelector('.delete');
deleteGameForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const gameID = document.querySelector('#gameID').value   

    firebase.deleteDoc(gameID,deleteGameForm);
})