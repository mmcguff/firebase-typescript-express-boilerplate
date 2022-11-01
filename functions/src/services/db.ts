import { db } from "../configs/firebase";

const _sortObject = (o:any) => {
  var sorted:any = {},
      key,
      a = []

  for (key in o) {
      if (o.hasOwnProperty(key)) {
          a.push(key)
      }
  }

  a.sort()

  for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]]
  }
  return sorted
};

const _returnDocument = async (doc:any) => (doc.data() ? _sortObject(doc.data()) : null);

const _returnDocuments = async (snapshot:any) => {
  let data:any = []

  if (snapshot.doc) return _returnDocument(snapshot.doc)
  snapshot.forEach((doc:any) => data.push(_sortObject(doc.data())))
  return data.length > 0 ? data : null
};

const createOrUpdate =
async (collectionName:string, documentName:string, documentData:any,merge=true) => {
  return await db.collection(collectionName)
  .doc(documentName)
  .set(_sortObject(documentData), {merge});
};

const readDocument = async (collectionName:string, documentName:string, includeSubCollections = false) => await _returnDocument(await db.collection(collectionName).doc(documentName).get());

const readAllDocuments = async (collectionName:string) => _returnDocuments(await db.collection(collectionName).get());

const readAllDocumentIds = async (collectionName:string) => (await db.collection(collectionName).listDocuments()).map((doc) => doc.id);

const deleteDocument = async (collectionName:string, documentName:string) => await db.collection(collectionName).doc(documentName).delete();

export const dbService = {
  _sortObject,
  createOrUpdate,
  readDocument,
  readAllDocuments,
  readAllDocumentIds,
  deleteDocument
};