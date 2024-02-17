const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');


const app = express();
app.use(bodyParser.json());
app.use('/products', productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});