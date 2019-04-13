let connection;

module.exports = (_connection) =>{
    connection = _connection
    return Users
}

class Users {
    static add(nom, prenom, email, motdepasse, telephone){  // Fonction permettant d'insérer un utilisateur
        connection.query('insert into user(nom, prenom, email, motdepasse, telephone) values(? , ? , ? , ? , ?)',[nom, prenom, email, motdepasse, telephone], (err, result , fields) => {
            if(err)
                console.log(err)
            else
                return this.getByEmail(email)
        })
    }

    static getByEmail(email){  // Fonction permettant de récupérer un utilisateur avec l'email
        connection.query('select * from user where email=?',[email] , (err, result, fields) => {
            if (err)
                console.log(err)
            else
                return result[0]
        })
    }
}