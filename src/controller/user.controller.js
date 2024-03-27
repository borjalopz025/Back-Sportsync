const { request } = require("express");
const { pool } = require("../database");

/*Funcion Resgistrar */
const postRegister = async (req, res) =>
{

   try 
   {

       let sql = "INSERT INTO usuario (nombre, usuario, email, password, provincia, descripcion, foto) " + 
                 "VALUES ('" + req.body.nombre + "', '" +
                               req.body.usuario + "', '" +
                               req.body.email + "', '" +
                               req.body.password + "', '" +
                               req.body.provincia + "', '" +
                               req.body.descripcion + "', '" +
                               req.body.foto + "')";
       
       console.log(sql);
       let [result] = await pool.query(sql);
       console.log(result);

       if (result.insertId)
          res.send(String(result.insertId));

       else
         res.send("-1");
   }
   catch(err)
   {
       console.log(err);
   }
} 

/* Funcion Registar Deporte */
const postUsdep = async (req, res) =>
{
console.log(req.body);
   try 
   {

       let id_deporte = ["futbol", "baloncesto", "escalada", "natacion", "ciclisco", "runnig", "volley", "patinaje"];
       let deport;

       let sql = "INSERT INTO usdep (id_usuario, id_deporte) " + 
                 "VALUES ('" +   req.body.id_usuario + "', '" +
                                 req.body.id_deporte + "')";

        for(let dep of id_deporte){
            deport = dep.id_deporte;
        }                       
       
       console.log(sql);
       let [result] = await pool.query(sql, deport);
       console.log(result);

       if (result.insertId)
          res.send(String(result.insertId));

       else
         res.send("-1");
   }
   catch(err)
   {
       console.log(err);
   }
} 
/* Funcion Iniciar Sesion */
const postLogin = async (req, res) =>
{
   const { usuario, password } = req.body;

   try 
   {

       let sql = "SELECT id_user, nombre, usuario, email, provincia, descripcion, foto FROM usuario WHERE usuario = ? AND password = ?";
       
       let [result] = await pool.query(sql, [usuario, password]);
       console.log(result);
       res.send(result);
    

}
catch(err)
{
    console.log(err);
}
}


/*Actualiza la informacion del perfil del usuario */
const putUsuario = async (req, res) =>
{
    try
    {   
        console.log(req.body);
        let params = [req.body.nombre,
                      req.body.provincia,
                      req.body.descripcion,
                      req.body.foto,
                      req.body.id_user]

        let sql = "UPDATE usuario SET  nombre = COALESCE(?, nombre) , " + 
                                   "provincia = COALESCE(?, provincia), " +
                                   "descripcion = COALESCE(?, descripcion), " +
                                   "foto = COALESCE(?, foto) WHERE id_user = ?";

        console.log(sql);
        let [result] = await pool.query(sql, params);
        res.send(result); 
    }
    catch(err)
    {
        console.log(err)
    }
}


const getproyect = async (req,res) =>{
    
    try{
        let params =[ req.query.id]

        let sql = 'SELECT * FROM eventos WHERE id_usuario = ?';

        console.log(sql);
        let [result] = await pool.query(sql,params);
        res.send(result); 


    }catch(err){
        console.log(err);
    }
}



const getSeguidos = async (req, res) =>{

    try{

        let params =[ req.query.id]

        let sql = 'SELECT c.titulo , c.fecha, c.descripcion, c.foto ,c.id_eventos FROM usEvent AS s INNER JOIN eventos AS c ON(s.id_evento=c.id_eventos) WHERE s.id_usuario = ?'

        console.log(sql);
        let [result] = await pool.query(sql,params);
        res.send(result); 

    }catch(err){

        console.log(err);
    }
}



module.exports = {postRegister,postUsdep, postLogin, putUsuario, getproyect,getSeguidos};
