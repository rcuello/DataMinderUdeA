import { getDB } from "../services/dbServices.js";
import { ObjectId } from 'mongodb';

const COLLECTION_NAME ="users";

const createUsuario = async (usuario,callback)=>{

    const baseDatos=getDB();
    await baseDatos.collection(COLLECTION_NAME).insertOne(usuario,callback);

 } 

 const findAllUsuarios = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection(COLLECTION_NAME).find({}).limit(50).toArray(callback);
  };

const findUsuarioById = async (id,callback) => {
    const baseDatos = getDB();
    var isValid = ObjectId.isValid(id);

    //TODO: UnhandledPromiseRejectionWarning: Unhandled promise rejection
    if(!isValid)callback(new Error("invalid id"));

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).findOne(idFilter,callback);
  };

  const deleteUsuario = async (id,callback)=>{
    const baseDatos = getDB();
    
    var isValid = ObjectId.isValid(id);

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).deleteOne(idFilter,callback);
 }

const updateUsuario = async (id,edicion, callback) => {
   const filtro = { _id: new ObjectId(id) };
   const operacion = {
     $set: edicion,
   };
   const baseDeDatos = getDB();
   await baseDeDatos
     .collection(COLLECTION_NAME)
     .findOneAndUpdate(filtro, operacion, { upsert: true, returnOriginal: true }, callback);
 };



 export { findAllUsuarios,createUsuario,deleteUsuario,findUsuarioById,updateUsuario };
