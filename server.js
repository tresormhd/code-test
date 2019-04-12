const express = require('express')
const app = express()
const bodyParser = require('body-parser')


//moteur templete
app.set('views','./views');
app.set('view engine','ejs')

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
                console.log(request.body) 
                const remercie ='merci de nous faire confiance'
                 response.render('pages/login',{ test: remercie})
            // }

})
    // console.log(request.body) 
    // console.log('va dormi')


app.listen(9090,(request,response) =>{ console.log('demare sur le port 9090') })
