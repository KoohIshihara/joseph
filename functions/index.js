const cors = require('cors')({ origin: true })
const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp({
  apiKey: 'AIzaSyAGE0QxkQaW5xes11F2DLhcfBq1Jp_pGL8',
  authDomain: 'joseph-alike.firebaseapp.com',
  databaseURL: 'https://joseph-alike.firebaseio.com',
  projectId: 'joseph-alike',
  storageBucket: 'joseph-alike.appspot.com',
  messagingSenderId: '450074324465'
})

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

const FieldValue = admin.firestore.FieldValue

exports.pushGroupIdToUsers = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const groupId = req.body.groupId
    const selectedUsers = req.body.selectedUsers
    // console.log('groupId', groupId)
    // console.log('selectedUsers', selectedUsers)

    const personPromises = selectedUsers.map(person => {
      return db.collection('PERSON')
        .doc(person.uid)
        .update({
          groups: FieldValue.arrayUnion(groupId)
        })
    })

    const groupPromises = selectedUsers.map(person => {
      return db.collection('GROUP')
        .doc(groupId)
        .update({
          member: FieldValue.arrayUnion(person.uid)
        })
    })

    const promises = personPromises.concat(groupPromises)
    await Promise.all(promises)

    res.status(200).end(JSON.stringify({ result: 'OK' }))
  }) // cors
})
