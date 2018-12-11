const express = require('express');
require('dotenv').config();
const massive = require('massive');
const app = express();
const controller = require('./controller.js');
app.use(express.json());
const {SERVER_PORT, MASSIVE_CONNECTION} = process.env;


massive(MASSIVE_CONNECTION).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})

app.get(`/api/getproducts`, controller.getProducts);

app.get(`/api/getcart`, controller.getCart)

app.post(`/api/addtocart`, controller.addToCart)

app.put(`/api/updatequantity`, controller.updateQuantity)

app.delete(`/api/deletefromcart/:id`, controller.deleteFromCart)

app.delete(`/api/deleteall`, controller.deleteAll)

app.listen(SERVER_PORT, () => {
    console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single`);
})

/*
Looked at portfolio,
looked at projects,
asked me to explain technologies I used,
what I learned and would redo,
struggles using google maps,
how would you go about doing this
if you want to make an ajax call, where would be the best place to put it with react?
(it's basically another way to use axios calls, in a componentDidMount)
What does an axios call return?  The answer is a promise that's resolved later
*/