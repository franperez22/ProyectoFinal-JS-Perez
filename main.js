document.addEventListener("DOMContentLoaded", function () {
    const budgetInput = document.getElementById("budget-input");
    const budgetSubmit = document.getElementById("budget-submit");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseSubmit = document.getElementById("expense-submit");
    const budgetAmount = document.getElementById("budget-amount");
    const expensesAmount = document.getElementById("expenses-amount");
    const remainingAmount = document.getElementById("remaining-amount");
    const clearLocalStorageButton = document.getElementById("clear-local-storage");

    let budget = 0;
    let expenses = [];

    
    function saveBudgetToLocalStorage() {
        localStorage.setItem("budget", JSON.stringify(budget));
    }

    
    function loadBudgetFromLocalStorage() {
        const savedBudget = localStorage.getItem("budget");
        if (savedBudget) {
            budget = parseFloat(savedBudget);
            budgetAmount.textContent = budget;
        }
    }

    
    function saveExpensesToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    
    function loadExpensesFromLocalStorage() {
        const savedExpenses = localStorage.getItem("expenses");
        if (savedExpenses) {
            expenses = JSON.parse(savedExpenses);
            updateExpenses();
        }
    }

    
    loadBudgetFromLocalStorage();
    loadExpensesFromLocalStorage();

    
    function updateExpenses() {
        let totalExpenses = 0;
        expenses.forEach(expense => {
            totalExpenses += expense.amount;
        });
        expensesAmount.textContent = totalExpenses;
    }

    
    function updateRemainingBudget() {
        const totalExpenses = parseFloat(expensesAmount.textContent);
        const remaining = budget - totalExpenses;
        remainingAmount.textContent = remaining;

        
        saveBudgetToLocalStorage();
        saveExpensesToLocalStorage();
    }

    
    budgetSubmit.addEventListener("click", function () {
        budget = parseFloat(budgetInput.value);
        budgetAmount.textContent = budget;
        budgetInput.value = "";
        updateRemainingBudget();
    });

    
    expenseSubmit.addEventListener("click", function () {
        const name = expenseName.value;
        const amount = parseFloat(expenseAmount.value);
        expenses.push({ name, amount });
        expenseName.value = "";
        expenseAmount.value = "";
        updateExpenses();
        updateRemainingBudget();
    });

    
    clearLocalStorageButton.addEventListener("click", function () {
        localStorage.removeItem("budget");
        localStorage.removeItem("expenses");
        budgetAmount.textContent = "0";
        expensesAmount.textContent = "0";
        remainingAmount.textContent = "0";
        budget = 0;
        expenses = [];
    });
});
