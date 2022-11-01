import {db} from "../configs/firebase";

const _sortObject = (o:any) => {
  const sorted:any = {};
  let key;
  const a = [];

  for (key in o) {
    // eslint-disable-next-line
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
};

// eslint-disable-next-line
const _returnDocument = async (doc:any) => (doc.data() ? _sortObject(doc.data()) : null);

const _returnDocuments = async (snapshot:any) => {
  const data:any = [];

  if (snapshot.doc) return _returnDocument(snapshot.doc);
  snapshot.forEach((doc:any) => data.push(_sortObject(doc.data())));
  return data.length > 0 ? data : null;
};

// eslint-disable-next-line
const createOrUpdate =async (collectionName:string, documentName:string, documentData:any, merge=true) => {
  return await db.collection(collectionName)
      .doc(documentName)
      .set(_sortObject(documentData), {merge});
};

// eslint-disable-next-line
const readDocument = async (collectionName:string, documentName:string, includeSubCollections = false) => await _returnDocument(await db.collection(collectionName).doc(documentName).get());

// eslint-disable-next-line
const readAllDocuments = async (collectionName:string) => _returnDocuments(await db.collection(collectionName).get());

// eslint-disable-next-line
const readAllDocumentIds = async (collectionName:string) => (await db.collection(collectionName).listDocuments()).map((doc) => doc.id);

// eslint-disable-next-line
const deleteDocument = async (collectionName:string, documentName:string) => await db.collection(collectionName).doc(documentName).delete();

export const dbService = {
  _sortObject,
  createOrUpdate,
  readDocument,
  readAllDocuments,
  readAllDocumentIds,
  deleteDocument,
};
