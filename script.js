document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const charityName = document.querySelector("#charity-name").value;
    const donationAmount = parseFloat(document.querySelector("#donation-amount").value);
    const donationDate = document.querySelector("#donation-date").value;
    const donorMessage = document.querySelector("#donor-message").value;

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (charityName === "" || donationDate === "") {
        alert("Please fill in all the required fields.");
        return;
    }

    const donationData = {
        charityName: charityName,
        donationAmount: donationAmount,
        donationDate: donationDate,
        donorMessage: donorMessage
    };

    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push(donationData);
    localStorage.setItem("donations", JSON.stringify(donations));

    addDonationToTable(donationData);

    updateTotal();

    document.querySelector("form").reset();
});


function addDonationToTable(donation) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${donation.charityName}</td>
        <td>$${donation.donationAmount.toFixed(2)}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.donorMessage}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    document.querySelector("#donation-table tbody").appendChild(tableRow);

    tableRow.querySelector(".delete-btn").addEventListener("click", function() {
        deleteDonation(donation, tableRow);
    });
}

function deleteDonation(donation, tableRow) {
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations = donations.filter(d => d.charityName !== donation.charityName || d.donationDate !== donation.donationDate);

    localStorage.setItem("donations", JSON.stringify(donations));

    tableRow.remove();

    updateTotal();
}

function updateTotal() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const total = donations.reduce((sum, donation) => sum + donation.donationAmount, 0);

    document.querySelector("#total-donated").textContent = `Total Donated: $${total.toFixed(2)}`;
}

window.onload = function() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    donations.forEach(donation => {
        addDonationToTable(donation);
    });

    updateTotal();
};
