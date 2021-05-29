const bcrypt = require('bcrypt');
const client = require('../config/db');

exports.Register = (req, res) => {
    const {name, email, password} = req.body;
    //Checking for user exists
    client.query(`SELECT * FROM users WHERE email='${email}'`).then(async (response) => {
            if(response.rows[0] != null){
                res.status(400).json({message: "User already exists"})
            }else{
                //Hashing
                const hashedPassword = await bcrypt.hash(password, 10);
                client.query(`INSERT INTO users(name, email, password, entries) values('${name}', '${email}', '${hashedPassword}', 0)`);
                client.query(`SELECT * FROM users WHERE email='${email}'`).then((result) => {
                    res.status(200).json({response : result.rows[0],message: "User added successfully"});
                    
                })
            }
        }
    )}
    
exports.SignIn = (req, res) => {
    const {email, password} = req.body;
    client.query(`SELECT * FROM users WHERE email='${email}'`).then(response => {
        if(response.rows[0] == null) {
            res.status(400).json({message : "User does not exists"});
        }
        else{
            const hashedPassword = response.rows[0].password;
            bcrypt.compare(password, hashedPassword , (err, result) => {
                if(result == true){
                    res.status(200).json({response : response.rows[0] ,message : "User signed in successfully"});
                }else if(result == false){
                    res.status(400).json({message : "Enter correct password"});
                }
                
            })
        }
    })
}