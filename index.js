const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');
const tokenUtilities = require('./middleware/authUtilites');

const app = express();
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(username === 'admin' && password === 'admin'){
        const token = tokenUtilities.generateToken  ({id: 1, username: username});
        res.json({"token" : token});
    } else {
        res.status(401).json({error: "Unauthorized"});
    }
});

app.use('/products', productRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});