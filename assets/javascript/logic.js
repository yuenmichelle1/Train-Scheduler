// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRrlTdT3G0FdDlpJVeGEtZ-REFM3jHUm4",
    authDomain: "train-s-a3521.firebaseapp.com",
    databaseURL: "https://train-s-a3521.firebaseio.com",
    projectId: "train-s-a3521",
    storageBucket: "train-s-a3521.appspot.com",
    messagingSenderId: "327831309428"
  };
  firebase.initializeApp(config);

var database= firebase.database();
  //when add-train-button is clicked, 
  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

      //grab user input
    var trainName= $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime= $("#first-train-time").val().trim();
    var trainFreq = $("#frequency").val().trim();

      //create local "temporary" object to hold user's train data
    var newTrain={
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFreq
    }
    //upload new train data into Firebase
    database.ref().push(newTrain);
    })