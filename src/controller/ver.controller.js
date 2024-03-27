const { pool } = require("../database");

function getVercel(req,res){
    let answer = {error:true, codigo:200, mensaje: 'Api Desplegada en Vercel'};
    res.send(answer);
}

module.exports = {getVercel};