
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection, // referencia a todos los documentos
    getDocs,
    addDoc,
    deleteDoc,
    doc, // referencia a un documento
    onSnapshot,
    query, where,
    orderBy, serverTimestamp, // fecha de creacion del documento
    getDoc,
    updateDoc
} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'

class Firebase {

    constructor() {


        this.firebaseConfig = {
            apiKey: "AIzaSyBJL3CFjBrgdxRrvzTAMzVFgSUMoMFHZ1A",
            authDomain: "fire-9-w.firebaseapp.com",
            projectId: "fire-9-w",
            storageBucket: "fire-9-w.appspot.com",
            messagingSenderId: "734725215775",
            appId: "1:734725215775:web:083714771ebfb7872ae72a"
        };

        // Inicializar firebase app
        initializeApp(this.firebaseConfig);

        // Inicializar los servicios
        this.db = getFirestore();
        this.auth = getAuth();


        // Referencia a la coleccion de firestore
        this.colRef = collection(this.db, 'sfamicom');

        //Referencia a un documento (ID)
        this.docRef = doc(this.db, 'sfamicom', 'OCb9GYEXAxt0DXRt6jQ7')



        // Consulta a la base de datos
        this.query = query(this.colRef, where("publisher", "==", "Rare"));

        // Consulta orderBy
        this.query2 = query(this.colRef, orderBy('title', 'asc'));

        // Consulta ordenada por fecha de creacion del documento
        this.query3 = query(this.colRef, orderBy('createdAt'));

    }

    // console.log de lo elemntos de la colección
    getDocuments = () => {

        getDocs(this.colRef)
            .then((data) => {
                // console.log(data.docs);

                let games = [];

                data.docs.forEach((game) => {
                    /* console.log(game.data()); */
                    games.push({ ...game.data(), id: game.id })
                })

                console.log(games);
            }).catch(error => {
                console.log(error.message);
            })
    }

    // console.log de un documento
    getDocument = () => {
        getDoc(this.docRef).then((docData) => {
            console.log(`Title: ${docData.data().title}`)
            console.log(`Publisher: ${docData.data().publisher}`)
            console.log(`ID: ${docData.id}`)
        })
    }

    // console.log de un documento TIEMPO REAL
    getDocumentRealTime = () => {

        onSnapshot(this.docRef, (docData) => {
            console.log(`Title: ${docData.data().title}`)
            console.log(`Publisher: ${docData.data().publisher}`)
            console.log(`ID: ${docData.id}`)
        })
    }

    // agregar un documento a al colección
    agregarDoc = (juego, formulario) => {

        addDoc(this.colRef, {
            title: juego.title,
            publisher: juego.publisher,
            createdAt: serverTimestamp() // fecha de creación
        }).then(() => {
            formulario.reset();
            Swal.fire(
                'Good job!',
                'Juego Agregado',
                'success'
            )
        })
    }

    // Borrar un documento de acuerdo a su id
    deleteDoc = (id, formulario) => {

        const docRef = doc(this.db, 'sfamicom', id);
        deleteDoc(docRef)
            .then(() => {
                formulario.reset();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Juego borrado',
                })
            })

    }

    // Obtener datos en timepo real
    getDocumentsRealTime = () => {

        onSnapshot(this.colRef, (data) => {
            let games = [];

            data.docs.forEach((game) => {
                /* console.log(game.data()); */
                games.push({ ...game.data(), id: game.id })
            })
            console.log(games);
        })
    }

    // Obtener datos en timepo real con una consulta
    getDocumentsRealTimeQuery = () => {

        onSnapshot(this.query, (data) => {
            let games = [];

            data.docs.forEach((game) => {
                /* console.log(game.data()); */
                games.push({ ...game.data(), id: game.id })
            })
            console.log(games);
        })
    }

    // documentos ordenados segun nombre del juego de manera ascendente
    getDocumentsRealTimeOrderby = () => {

        onSnapshot(this.query2, (data) => {
            let games = [];

            data.docs.forEach((game) => {
                /* console.log(game.data()); */
                games.push({ ...game.data(), id: game.id })
            })
            console.log(games);
        })
    }

    // documentos ordenados segun nombre del juego de manera ascendente
    getDocumentsRealTimeOrderbyTime = () => {

        onSnapshot(this.query3, (data) => {
            let games = [];

            data.docs.forEach((game) => {
                /* console.log(game.data()); */
                games.push({ ...game.data(), id: game.id })
            })
            console.log(games);
        })
    }

    updateDocument(id,title, formulario){

        const docRef =  doc(this.db,'sfamicom',id)
        updateDoc(docRef, {
            title
        }).then( ()=>{
            formulario.reset()
        })
    }


    // Registro con email y password
    registro(email, password, formulario){
        createUserWithEmailAndPassword(this.auth,email,password)
            .then( (cred) =>{
                console.log(cred.user);
                formulario.reset()
            })
            .catch( (error) =>{
                console.log(error.message);
            })
    }


}

export default Firebase