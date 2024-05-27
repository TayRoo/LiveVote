"use strict";
var numberOfVoteKaka = 0;
var numberOfVoteCR7 = 0;
var numberOfVoteMessi = 0;
var hasVoted = false; // Flag to check if the user has already voted

var connection = new signalR.HubConnectionBuilder().withUrl("/voteHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveVote", function (numberOfVoteKaka, numberOfVoteCR7, numberOfVoteMessi) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `Kaka has ${numberOfVoteKaka} votes.  C.Ronaldo has ${numberOfVoteCR7} votes. Messi has ${numberOfVoteMessi} votes`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    if (hasVoted) {
        alert("You have already voted. You cannot vote more than once.");
        event.preventDefault(); // Prevent the form from being submitted
        return; // Exit the function early
    }
    //var user = document.getElementById("userInput").value;
    var votedPlayerName = $('input:radio[name=votedPlayer]:checked').val();

    // Check if no player is selected
    if (votedPlayerName == null) {
        alert("Please select a player to vote for.");
        event.preventDefault(); // Prevent the form from being submitted
        return; // Exit the function early
    }
    if (votedPlayerName == "Kaka") {
        numberOfVoteKaka++;
    }
    if (votedPlayerName == "C_Ronaldo") {
        numberOfVoteCR7++;
    }
    if (votedPlayerName == "Messi") {
        numberOfVoteMessi++;
    }

    connection.invoke("SendVoteResult", numberOfVoteKaka, numberOfVoteCR7, numberOfVoteMessi).catch(function (err) {
        return console.error(err.toString());
    });
    // Mark that the user has voted
    hasVoted = true;

    // Ask the user if they want to subscribe to the voting result notifications
    var subscribe = confirm("Do you want to subscribe to voting result notifications?");
    if (subscribe) {
        // Code to subscribe the user to notifications (this part will depend on how you handle subscriptions)
        alert("You have been subscribed to voting result notifications.");
    }

    event.preventDefault();
    
});