const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const { request } = require('express');
const PORT = 5000;
const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"colo5114",
    database:"crud_contact"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//READ DATA FROM THE DATABASE
app.get("/api/get",(req,res) => {
    const sqlGet ="SELECT * FROM contact_db";
    db.query(sqlGet, (error,result) => {
        res.send(result);
    });
});

//INSERT DATA INTO THE DATABASE
app.post("/api/post", (req,res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email,contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error,result) => {
        if (error) {
            console.log(error);
        }
    })  
})


//REMOVE DATA FROM DATABASE
app.delete("/api/remove/:id", (req,res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error,result) => {
        if (error) {
            console.log(error);
        }
    })  
})



//READ DATA FROM THE DATABASE WHILE UPDATING
app.get("/api/get/:id",(req,res) => {
    const { id } = req.params;
    const sqlGet ="SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});


//UPDATE DATA FROM THE DATABASE
app.put("/api/update/:id",(req,res) => {
    const { id } = req.params;
    const {name, email, contact } = req.body;
    const sqlUpdate ="UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name,email,contact, id], (error,result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});


//INSERT DATA INTO THE DATABASE
app.get("/", (req,res)=> {
    // const sqlInsert = "INSERT INTO contact_db (name, email,contact) VALUES ('collins owino','owinocollins@gmil.com',0748223540)";
    // db.query(sqlInsert,(error,request) => {
    //     console.log('error', error);
    //     console.log('result', request);
    //     res.send("Hello Collins, How are you?");
    // });
});


app.listen(process.env.PORT || PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})