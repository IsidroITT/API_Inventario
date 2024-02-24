const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');
const tokenUtilities = require('./middleware/authUtilites');
const userList = require('./controllers/usersControllers');

const app = express();
app.use(bodyParser.json());

// Ruta de login de la aplicacion
app.post('/login', (req, res) => {
    // Obtener el nombre de usuario y su clave del body
    const { username, password } = req.body;

    // Buscar el usuario dentro de la lista de usuarios
    const userFound = userList(username, password);

    // Asegurarnos de que ese usuario exista
    if(!userFound){
        return res.status(401).json({error: "Unauthorized"});
    }

    // Asignar un token al usuario
    const token = tokenUtilities.generateToken({id: 1, username: username});
    return res.status(200).json({"token": token});
});

// Ruta predeterminada para las funcionalidades de la api de productos
app.use('/products', productRouter);

// Puerto donde se ejecutara la aplicacion
const PORT = process.env.PORT || 8080;

// Ejecutar la aplicacion
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});