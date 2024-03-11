// Function to delete data after 29 days
function deleteOldData() {
    const tableBody = document.querySelector(".history-table tbody");
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
        const date = new Date(row.querySelector("td:first-child").innerText);
        const currentDate = new Date();
        const daysDifference = Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24));
        if (daysDifference >= 29) {
            row.remove();
        }
    });
}

// Call deleteOldData function every 24 hours
setInterval(deleteOldData, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
