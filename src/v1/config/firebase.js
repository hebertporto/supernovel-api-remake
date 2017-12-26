import admin from 'firebase-admin'

const serviceAccount = require('./secrets/firebase-admin-key.json')

async function initializeFirebaseAdmin() {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://super-novel-reader-aadfd.firebaseio.com',
  })
}

initializeFirebaseAdmin()
