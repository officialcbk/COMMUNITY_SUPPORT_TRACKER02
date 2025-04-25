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

    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>${charityName}</td>
        <td>${donationAmount}</td>
        <td>${donationDate}</td>
        <td>${donorMessage}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    document.querySelector("#donation-table tbody").appendChild(tableRow);


    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    donations.push(donationData);

    localStorage.setItem("donations", JSON.stringify(donations));

    tableRow.querySelector(".delete-btn").addEventListener("click", function() {

        donations = donations.filter(donation => donation.charityName !== charityName || donation.donationDate !== donationDate);
        localStorage.setItem("donations", JSON.stringify(donations));

        tableRow.remove();
    });

    document.querySelector("form").reset();

});

window.onload = function() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    donations.forEach(donation => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${donation.charityName}</td>
            <td>${donation.donationAmount}</td>
            <td>${donation.donationDate}</td>
            <td>${donation.donorMessage}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        document.querySelector("#donation-table tbody").appendChild(tableRow);

        tableRow.querySelector(".delete-btn").addEventListener("click", function() {

            const updatedDonations = donations.filter(d => d.charityName !== donation.charityName || d.donationDate !== donation.donationDate);
            localStorage.setItem("donations", JSON.stringify(updatedDonations));

            tableRow.remove();
        });
    });
};
