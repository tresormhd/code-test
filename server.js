const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config/config')
var path = require('path')

const mysql = require('mysql');

var connection = mysql.createConnection(config.db);
connection.connect();


//moteur templete
app.set('views','views');
app.set('view engine','ejs')
var Users = require('./models/Users-class')(connection)  // On charge la classe utilisateur

//middleware
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes 
app.get('/',(request,response) => {
    response.render('pages/index')
    // response.send('tresor')
})
app.get('/connect',(request,response) => {
    response.send('salut ici')
 })
app.post('/',(request,response) =>{
    // if (request.body.nom =='' || request.body.prenom =='' 
    // || request.body.email ==''  || request.body.password =='' )
    //         {
    //             response.render('pages/index',{ error:"vous n'avez pas rempli tous les champs ! remplisez les champs svp "})
    //         }else{
                let user = Users.add(request.body.nom, request.body.prenom, request.body.email, request.body.password, request.body.telephone)
                const remercie ='merci de nous faire confiance'
                 response.render('/pages/login',{ test: user})
            // }

})

app.get('/login', (request , response) => {
    response.render('/pages/login.ejs')
})

app.post('/login', (request , response) => {
    let user = Users.getByEmail(request.body.email)
    response.render('/pages/login', {test : user})
})
    // console.log(request.body) 
    // console.log('va dormi')


app.listen(config.port,(request,response) =>{ console.log('demare sur le port '+ config.port) })
