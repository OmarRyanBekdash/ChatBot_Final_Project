const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://info1998-final.firebaseio.com"
});

const db = admin.firestore();
const replyCollection = db.collection('chatbot replies'); 

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.post('/addReply', async (req, res) => {
    let reply = req.body;
    let doc = await replyCollection.add(reply)
    res.send(doc.id);
})

app.get('/getRandomReply', async (req, res) => {
  const replies = await replyCollection.get();
  const replyList = [];
  for(let reply of replies.docs){
    let post = reply.data();
    post.id = reply.id();
    replyList.push(post);
  }

  let randomIndex = Math.floor(Math.random()*replyList.length);
  res.send(replyList[randomIndex]);
})

app.listen(8080, () => console.log('backend started'));