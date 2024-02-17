const express = require('express');
const productRoutes = require('./routes/productRoutes');

 const bodyParser = require('body-parser')
// const authUtils = require('./middleware/authUtilites');

const app = express();
app.use('/producto', productRoutes);

app.use(bodyParser.json);

// app.post('/login', (req, res) => {
//     const userName = req.body.userName;
//     const password = req.body.password;

//     if (userName === 'admin' && password === 'admin'){
//         const token = authUtils.generateToken({ id: 1, name: userName });
//         return res.status(200).json({ token });
//     }else {
//         return res.status(401).json({ Error: "Usuario o contraseña incorrecta" });
//     }
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
    console.log(`Estoy actualizado...`)
});