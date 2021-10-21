import { getDB } from "../services/dbServices.js";
import { ObjectId } from 'mongodb';

const COLLECTION_NAME ="products";

const findAllProductos = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection(COLLECTION_NAME).find({}).limit(50).toArray(callback);
  };

 const createProducto = async (producto,callback)=>{

    const baseDatos=getDB();
    await baseDatos.collection(COLLECTION_NAME).insertOne(producto,callback);

 } 

 const deleteProducto = async (id,callback)=>{
    const baseDatos = getDB();
    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).deleteOne(idFilter,callback);
 }

export { findAllProductos,createProducto,deleteProducto };