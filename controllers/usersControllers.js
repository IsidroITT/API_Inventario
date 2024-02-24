// Lista de usuarios
let users = [
    {
        "username": "taquito",
        "password": "salsita"
    },
    {
        "username": "admin",
        "password": "admin"
    },
    {
        "username": "tomoko",
        "password": "aran"
    }
];

// Buscar usuarios dentro de la lista
function findUser(username, password){
    return users.some(user => user.username === username && user.password === password);
}

module.exports = findUser;