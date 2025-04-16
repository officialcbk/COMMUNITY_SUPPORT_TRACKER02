document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const charityName = document.querySelector("#charity-name").value;
    const donationAmount = document.querySelector("#donation-amount").value;
    const donationDate = document.querySelector("#donation-date").value;
    const donorMessage = document.querySelector("#donor-message").value;

    const donationData = {
        charityName: charityName,
        donationAmount: donationAmount,
        donationDate: donationDate,
        donorMessage: donorMessage
    };

    if (charityName === "") {
        alert("Please fill out the charity name.");
        return;
    }

    if (donationAmount === "" || isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (donationDate === "") {
        alert("Please enter the donation date.");
        return; 
    }

    //This is to verify if the Object is actually saved
    console.log("Donation Data:", donationData);

});
