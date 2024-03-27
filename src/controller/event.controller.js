const { pool } = require('../database');

/*Llamar a los deportes*/
const getDeporte = async (req, res) => {

  try{
       let sql = 'SELECT * FROM deporte'
         
      console.log(sql);
      let [result] = await pool.query(sql);
      console.log(result);
      if(result == 0){
       res.send({error:true , codigo: 404, mensaje:'deportes no encontrados'})
      }else{
       res.send({error:false , codigo: 200, mensaje:'deportes encontrados', data:result})
      }
  }
  catch (err){
       console.log(err);
  }
}
/* Agregar evento */

const postAddEvent = async (req, res) => {

try 
{
  console.log(req.body);
  let sql = "INSERT INTO eventos (id_usuario, id_deporte, titulo, fecha, descripcion, foto)" + 
  "VALUES ('" +  req.body.id_usuario + "', '" +
              req.body.id_deporte + "', '" +
              req.body.titulo + "', '" +
              req.body.fecha + "', '" +
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

// MOSTRAT EVENTOS EN HOME
const getEvent = async (req, res) => {

   try{
        let sql = 'SELECT * FROM eventos'
          
       console.log(sql);
       let [result] = await pool.query(sql);
       console.log(result);
       if(result == 0){
        res.send({error:true , codigo: 404, mensaje:'eventos no encontrados'})
       }else{
        res.send({error:false , codigo: 200, mensaje:'eventos encontrados', data:result})
       }
   }
   catch (err){
        console.log(err);
   }
}


// MOSTRAR EL EVENTO ELEGIDO EN EXPLORE
const getOne = async (req, res) => {
  
  try{

    let sql

    let valor = []

    if(req.query.provincia && req.query.titulo ){

      valor= [req.query.provincia, req.query.titulo]
      sql= 'SELECT * FROM eventos WHERE provincia = ? AND titulo = ?'
    }else if(req.query.provincia){
      valor= [ req.query.provincia]

      sql='SELECT * FROM eventos WHERE provincia = ? '
    }else if(req.query.titulo){

      valor = [ req.query.titulo]
      sql='SELECT * FROM eventos WHERE titulo = ? '
    }
   

    console.log(sql);
    let [result] = await pool.query(sql,valor)
    console.log(result);
    if(result.length == 0){
      res.send({error:true, codigo:404, mensaje:'evento no encontrado',data:[]})
    }else{
      res.send({error:false, codigo:200, mensaje:'evento encontrado', data:result})
    }

  
  
  }catch(err){
    console.log(err);
  }
}

const getOne2 = async (req, res) => {
  
  try{

    if(req.query.titulo ){

    let valor = [req.query.titulo]

    let sql = 'SELECT * FROM eventos WHERE titulo = ?'

    console.log(sql);
    let [result] = await pool.query(sql,valor)
    console.log(result);
    if(result.length == 0){
      res.send({error:true, codigo:404, mensaje:'evento no encontrado'})
    }else{
      res.send({error:false, codigo:200, mensaje:'evento encontrado', data:result})
    }

  }
  
  }catch(err){
    console.log(err);
  }
}

//Cambiar boton seguido y añadir evento con click

const postBoton  = async (req, res) => {
  try 
  {
        
    let sql = "INSERT INTO usEvent (id_usuario, id_evento)" + 
    "VALUES ('" +  req.body.id_usuario + "', '" + req.body.id_evento + "')";
    
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



const getDeportUs = async (req,res) =>{
  try{

    let params =[ req.query.id]


    let sql = 'SELECT c.deporte FROM usdep AS s INNER JOIN deporte AS c ON(s.id_deporte=c.id_deporte) GROUP BY c.deporte'

    
    console.log(sql);
    let [result] = await pool.query(sql,params);
    res.send(result); 


  }catch(err){

    console.log(err);
  }

}

const deleteevent = async (req, res) =>
{
    try
    {
        console.log(req.body);

        let params = [req.body.id_usuario,req.body.id_evento]
        let sql = "DELETE FROM usEvent WHERE id_usuario = ? AND id_evento = ?"
        console.log(sql);
        let [result] = await pool.query(sql,params)
        res.send(result)
    }
    catch(err)
    {
        console.log(err);
    }

}



module.exports = {postAddEvent, getEvent, getOne, getDeporte, postBoton,getDeportUs,deleteevent,getOne2};