
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection, // referencia a todos los documentos
    getDocs,
    addDoc,
    deleteDoc,
    doc, // referencia a un documento
    onSnapshot,
    query,where
} from 'firebase/firestore'
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
        this.db = getFirestore()

        // Referencia a la coleccion de firestore
        this.colRef = collection(this.db, 'sfamicom')

        // Consulta a la base de datos
        this.query = query(this.colRef, where("publisher","==","Rare"));

    }

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

    agregarDoc = (juego, formulario) => {

        addDoc(this.colRef, {
            title: juego.title,
            publisher: juego.publisher
        }).then(() => {
            formulario.reset();
            Swal.fire(
                'Good job!',
                'Juego Agregado',
                'success'
            )
        })
    }

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

}

export default Firebase