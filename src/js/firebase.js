import * as firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyARBRD6lLUN4DIHjjTp3_D_SbLdfh2Hpkc",
  authDomain: "bookmarkssync.firebaseapp.com",
  databaseURL: "https://bookmarkssync.firebaseio.com",
  projectId: "bookmarkssync",
  storageBucket: "bookmarkssync.appspot.com",
  messagingSenderId: "33268123377",
  appId: "1:33268123377:web:f372519e2ab973a8430b50"
};
const docId = "Q1IYmUTGBzouvIiwVOlj";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let getBookmarks = callback => {
  let db = firebase.firestore();
  db.collection("bookmarks")
    .doc(docId)
    .onSnapshot(doc => {
      if (doc.exists) {
        console.log("Get firebase ::: Document data:", doc.data());
        callback(doc.data().bookmarks);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
};

let setBookmarks = bookmarks => {
  let db = firebase.firestore();
  db.collection("bookmarks")
    .doc(docId)
    .set(bookmarks)
    .then(error => {
      if (!error) {
        console.log("Set firebase ::: Document data:", doc.data());
        callback(doc.data());
      }
    })
    .catch(function(error) {
      console.log("Error setting document:", error);
    });
};

let getUsers = callback => {
  let db = firebase.firestore();
  db.collection("bookmarks")
    .doc("aSudfknWtis2QFRKkAOH")
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("Get firebase ::: Users data:", doc.data());
        callback(doc.data().users);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such users document!");
      }
    });
};

let setUsers = users => {
  let db = firebase.firestore();
  db.collection("bookmarks")
    .doc("aSudfknWtis2QFRKkAOH")
    .set({ users })
    .then(error => {
      if (!error) {
        console.log("Set firebase ::: Users");
      }
    })
    .catch(function(error) {
      console.log("Error setting document:", error);
    });
};
const suggestionExists = (suggestions, suggestion) => {
  if (!suggestions) return false;
  for (let i in suggestions) {
    if (suggestions[i].url === suggestion.url) {
      return true;
    }
  }
  return false;
};

let sendSuggestion = (suggestion, callback) => {
  let db = firebase.firestore();
  db.collection("bookmarks")
    .doc("5UuO2xqnW1Qpl7WTptai")
    .get()
    .then(docs => {
      const { suggestions } = docs.data();
      if (!suggestionExists(suggestions, suggestion)) {
        db.collection("bookmarks")
          .doc("5UuO2xqnW1Qpl7WTptai")
          .set({ suggestions: [...suggestions, suggestion] })
          .then(error => {
            if (!error) callback(true);
          })
          .catch(function(error) {
            console.log("Error setting document:", error);
          });
      } else {
        callback(false);
      }
    });
};

export default {
  getBookmarks,
  setBookmarks,
  getUsers,
  setUsers,
  sendSuggestion
};
