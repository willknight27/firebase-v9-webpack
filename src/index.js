import Firebase from "../models/firebase";

const firebase = new Firebase

firebase.getDocumentsRealTimeOrderbyTime();
firebase.getDocumentRealTime();


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

// Actualizar un juego
const updateGameForm = document.querySelector('.update');
updateGameForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const idUpdate = document.querySelector('#gameID-up').value
    const titleUpdate = document.querySelector('#nameUpdate').value

    firebase.updateDocument(idUpdate,titleUpdate,updateGameForm)
    
})