document.addEventListener("DOMContentLoaded", function() {
    // Function to add expense to the table
    function addExpenseToTable(expense) {
        const tableBody = document.querySelector(".my-expense tbody");

        // If the first row is blank, remove it
        const firstRow = tableBody.querySelector("tr:first-child");
        if (firstRow && firstRow.classList.contains("blank-row")) {
            tableBody.removeChild(firstRow);
        }

        // Create new row for the expense
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>${expense.quantity}</td>
            <td>${expense.cgst}</td>
            <td>${expense.sgst}</td>
            <td>${expense.igst}</td>
            <td>${calculateTotalAmount(expense).toFixed(2)}</td>
            <td>
                <button class="edit" data-id="${expense.id}">Edit</button>
                <button class="delete" data-id="${expense.id}">Delete</button>
            </td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(row);

        // Update today's and month's expenses
        updateExpenses();
    }

    // Calculate total amount including GST
    function calculateTotalAmount(expense) {
        const taxableValue = expense.amount * expense.quantity;
        const totalGST = taxableValue * (expense.cgst + expense.sgst + expense.igst) / 100;
        const totalAmount = taxableValue + totalGST;
        return totalAmount;
    }

    // Function to calculate today's expenses
    function calculateTodayExpense() {
        const today = new Date().toLocaleDateString("en-GB");
        const tableRows = document.querySelectorAll(".my-expense tbody tr");
        let todayTotal = 0;

        tableRows.forEach(row => {
            const dateCell = row.querySelector("td:first-child").textContent;
            if (dateCell === today) {
                const amountCell = row.querySelector("td:nth-child(8)").textContent;
                todayTotal += parseFloat(amountCell);
            }
        });

        return todayTotal.toFixed(2);
    }

    // Function to calculate month's expenses
    function calculateMonthExpense() {
        const today = new Date();
        const thisMonth = today.getMonth() + 1; // Month is zero-based
        const thisYear = today.getFullYear();
        const tableRows = document.querySelectorAll(".my-expense tbody tr");
        let monthTotal = 0;

        tableRows.forEach(row => {
            const dateCell = row.querySelector("td:first-child").textContent;
            const expenseDate = new Date(dateCell);
            const expenseMonth = expenseDate.getMonth() + 1; // Month is zero-based
            const expenseYear = expenseDate.getFullYear();

            if (expenseMonth === thisMonth && expenseYear === thisYear) {
                const amountCell = row.querySelector("td:nth-child(8)").textContent;
                monthTotal += parseFloat(amountCell);
            }
        });

        return monthTotal.toFixed(2);
    }

    // Function to update today's and month's expenses in the table
    function updateExpenses() {
        const todayExpenseCell = document.getElementById("todayExpense");
        const thisMonthExpenseCell = document.getElementById("thisMonthExpense");

        todayExpenseCell.textContent = calculateTodayExpense();
        thisMonthExpenseCell.textContent = calculateMonthExpense();
    }

    // Handle form submission for adding expense
    const expenseForm = document.getElementById("expenseForm");
    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieve expense data from the form
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const quantity = parseInt(document.getElementById("Quantity").value);
        const cgst = parseFloat(document.getElementById("cgst").value);
        const sgst = parseFloat(document.getElementById("sgst").value);
        const igst = parseFloat(document.getElementById("IGST").value);
        const date = new Date().toLocaleDateString("en-GB");

        // Create expense object
        const expense = {
            date: date,
            description: description,
            amount: amount,
            quantity: quantity,
            cgst: cgst,
            sgst: sgst,
            igst: igst
        };

        // Add expense to the table
        addExpenseToTable(expense);

        // Reset the form
        expenseForm.reset();
    });

    // Handle delete button click
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete")) {
            const row = event.target.closest("tr");
            row.remove();
            
            // Update today's and month's expenses after deletion
            updateExpenses();
        }
    });

    // Call the function to update today's and month's expenses when the page loads
    updateExpenses();
});

// // Function to set default date to today's date
// function setDefaultDate() {
//     // Get today's date
//     var today = new Date();
    
//     // Get year, month, and day components of today's date
//     var year = today.getFullYear();
//     var month = today.getMonth() + 1; // Months are zero-based, so we add 1
//     var day = today.getDate();
    
//     // Format the date as YYYY-MM-DD
//     var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    
//     // Set the input field value to the formatted date
//     document.getElementById('date').value = formattedDate;
// }

// // Call the function to set the default date when the page loads
// window.onload = function() {
//     setDefaultDate();
// };
