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

    //Clear all of user input once submitted into Firebase
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
    })

    //Create firebase event when child is added
    database.ref().on("child_added", function(snapshot, prevChildKey){
        var tName = snapshot.val().name;
        var tDestination = snapshot.val().destination;
        var tTime= snapshot.val().time;
        var tFreq= snapshot.val().frequency;
        console.log(tTime);

        //Moment Math
        //Current Time: 
        var currentTime = moment();
        console.log(currentTime);
        //format current time
        var formattedCurrentTime= moment(currentTime).format("hh:mm");
        //convert firstTrainTime given
        var tStart = moment(tTime, "hh:mm").subtract(1,"years");
        console.log(tStart);

        //Difference in time
        var timeDifference = currentTime.diff(moment(tStart), "minutes");
        console.log(timeDifference);

        //remainder time
        var remainder= timeDifference%tFreq;

        var nextTrainMin= tFreq - remainder;

        var nextTrain = currentTime.add(nextTrainMin, "minutes").format("hh:mm");
        //add new Row in table
        var tRow = $("<tr>");

        tRow.append(`<td> ${tName} </td>`);
        tRow.append(`<td> ${tDestination}</td>`);
        tRow.append(`<td>${tFreq}</td>`);
        tRow.append(`<td>${nextTrain}</td>`);
        tRow.append(`<td>${nextTrainMin}</td>`);

        $("#train-table").append(tRow);



    })