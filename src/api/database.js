var config = {
  apiKey: "AIzaSyAuYeBU4L_-qbbbWTcyODcAvd4tb-VCTNw",
  authDomain: "challenge-board.firebaseapp.com",
  databaseURL: "https://challenge-board.firebaseio.com",
  storageBucket: "challenge-board.appspot.com",
  messagingSenderId: "527088610630"
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
