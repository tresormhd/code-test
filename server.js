const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');
var path = require('path');

const mysql = require('mysql');

var connection = mysql.createConnection(config.db);
connection.connect();


//moteur templete
app.set('views','views');
app.set('view engine','ejs');
//middleware
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes 
app.get('/',(request,response) => {
    response.render('pages/index')
    // response.send('tresor')
});
app.get('/connect',(request,response) => {
    response.send('salut ici')
 });
app.post('/',async (request,response) => {
    // if (request.body.nom =='' || request.body.prenom =='' 
    // || request.body.email ==''  || request.body.password =='' )
    //         {
    //             response.render('pages/index',{ error:"vous n'avez pas rempli tous les champs ! remplisez les champs svp "})
    //         }else{
    connection.query('insert into user(nom, prenom, email, motdepasse, telephone) values(? , ? , ? , ? , ?)', [request.body.nom, request.body.prenom, request.body.email, request.body.password, request.body.telephone], (err, result, fields) => {
        if (err)
            console.log(err);
        else {
            connection.query('select * from user where email=?', [request.body.email], (err, result, fields) => {
                if (err)
                    console.log(err)
                else
                    response.render('pages/login', {test: result[0]})
            })
        }
    })
})

app.get('/login', (request , response) => {
    response.render('pages/login')
});

app.post('/login', (request , response) => {
    connection.query('select * from user where email=?', [request.body.email], (err, result, fields) => {
        if (err)
            console.log(err)
        else {
            response.render('pages/login', {test: result[0]})
        }
    });
})
    // console.log(request.body) 
    // console.log('va dormi')


app.listen(config.port,(request,response) =>{ console.log('demare sur le port '+ config.port) });
