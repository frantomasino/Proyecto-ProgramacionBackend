import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://franciscotomasino2:quilmes@cluster0.tpv8y.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Conectado a la base de datos correctamente"))
    .catch(err => console.log("Error al conectar la base de datos:", err));
