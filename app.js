const http = require('http');

const bodyParser=require('body-parser');

const express=require('express');

const app = express();

const adminRoutes=requires('./Routes/admin');
const shopRoutes=requires('./Routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req , res , next)=>{
    res.status(404).send('<h1> Page not found</h1>')

});

app.listen(3000);