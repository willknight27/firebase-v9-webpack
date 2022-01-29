
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'

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


        getDocs(this.colRef)
            .then((data) => {
                // console.log(data.docs);

                let games = [];

                data.docs.forEach((game) => {
                    console.log(game.data());
                    games.push({ ...game.data(), id: game.id })
                })

                console.log(games);
            })
            .catch(error => {
                console.log(error.message);
            })


    }

}

export default Firebase