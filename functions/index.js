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

// chat/* のOGP
const appDomain = 'https://joseph-alike.firebaseapp.com'
// const appDomain = 'http://localhost:5000'
const OGP_IMG_WIDTH = 1200
const OGP_IMG_HEIGHT = 630
const OGP_SRC = 'https://firebasestorage.googleapis.com/v0/b/joseph-alike.appspot.com/o/joseph_ogp.png?alt=media&token=70a8b3e4-3eea-45bc-b59b-f74812afb17c'

exports.chatRedirect = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const groupId = req.path.split('/')[2]

    const group = await db
      .collection('GROUP')
      .doc(groupId)
      .get()
      .then(d => {
        return d.data()
      })

    // console.log('group id:\n', group)

    const persons = await db
      .collection('PERSON')
      .where('groups', 'array-contains', groupId)
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          return d.data()
        })
      })

    // console.log('persons:\n', persons)

    const groupName = group.name
    var groupSubtitle = `${persons[0].name}, `
    for (var i = 1; i < persons.length; i++) {
      groupSubtitle += `${persons[i].name}, `
    }

    console.log('groupName', groupName)
    console.log('groupSubtitle', groupSubtitle)

    const html = createHtml(groupName, groupSubtitle, groupId)
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
    res.status(200).end(html)
  }) // cors
})

const createHtml = (groupName, groupSubtitle, groupId) => {
  const SITEURL = appDomain
  const PAGEURL = `${SITEURL}/@chat/${groupId}`
  const TITLE = groupName
  const DESCRIPTION = groupSubtitle
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>colorinco</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${OGP_SRC}">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="${TITLE}">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${OGP_SRC}">
    <meta name="twitter:description" content="${DESCRIPTION}">
  </head>
  <body>
    <script type="text/javascript">window.location="/@chat/${groupId}";</script>
  </body>
</html>
`
}
