import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import configurePassport from "./config/passport.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import dotenv from "dotenv";


dotenv.config({ path: './src/.env' });


const app = express();


console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);   

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);  
  });


configurePassport();
app.use(passport.initialize());


app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Acceso autorizado a la ruta protegida",
      user: req.user,
    });
  }
);


app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});


app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/tickets", ticketRoutes);



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
