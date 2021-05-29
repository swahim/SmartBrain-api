require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const cors = require('cors');
const client = require('./config/db');
const port = process.env.PORT ||8000;


//Middlewares
app.use(cors());
app.use(express.json());

//Routes Auth
app.use("/auth", authRoutes);
app.get('/', (req, res) => {
    res.send("Server is running");
})

app.put('/images', (req, res) => {
    const {id} = req.body;
    client.query(`SELECT * FROM users`).then(response => {
        
        const array = response.rows;
        array.forEach(user => {
            if(user.id === id){
                user.entries++;
                client.query(`UPDATE users SET entries = ${user.entries} WHERE id=${user.id};`);
                client.query(`SELECT entries FROM users WHERE id=${user.id}`).then(response =>{
                    return res.status(200).send(response.rows[0].entries);
                })
            }
        })
    })
})

client.connect(() => {
    console.log("Database connected");
})

app.listen(port)