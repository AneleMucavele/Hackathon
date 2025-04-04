// Savings Goal
document.getElementById('savings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let goalName = document.getElementById('goal-name').value;
    let goalAmount = parseFloat(document.getElementById('goal-amount').value);
    let goalDeadline = parseInt(document.getElementById('goal-deadline').value);

    let monthlySavings = goalAmount / goalDeadline;
    document.getElementById('goal-result').innerHTML = `
        <p>To reach your ${goalName} goal of R${goalAmount}, save R${monthlySavings} per month.</p>
    `;
});

let totalIncome = 0;

document.getElementById('income-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let incomeSource = document.getElementById('income-source').value;
    let incomeAmount = parseFloat(document.getElementById('income-amount').value);
    
    totalIncome += incomeAmount;
    
    let summary = `You’ve added income from ${incomeSource}. Total income now: R${totalIncome.toFixed(2)}`;
    document.getElementById('income-summary').innerHTML = summary;
});

let tips = [
    "Consider automating your savings by setting up automatic transfers to your savings account every time you get paid. This ensures you save without even thinking about it.",
    "Set a specific savings goal. Knowing exactly what you're saving for helps keep you motivated.",
    "Start by tracking your expenses. It's important to know where your money goes.",
    "Identify non-essential spending such as eating out, subscription services, or impulse purchases. Cutting back on these small luxuries can make a big difference over time.",
];

// Function to randomly display a tip
function displayRandomTip() {
    let randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById("random-tip").innerHTML = randomTip;
}

// Call displayRandomTip() when a user interacts or on page load
document.addEventListener('DOMContentLoaded', displayRandomTip);


// Expense Categorization
let expenses = [];
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let expenseName = document.getElementById('expense-name').value;
    let expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    let expenseCategory = document.getElementById('expense-category').value;

    expenses.push({ name: expenseName, amount: expenseAmount, category: expenseCategory });
    displayExpenses();
});

function displayExpenses() {
    let expenseList = '';
    expenses.forEach(function(expense) {
        expenseList += `<p>${expense.name} (${expense.category}): R${expense.amount}</p>`;
    });
    document.getElementById('expense-list').innerHTML = expenseList;
}

document.getElementById('comparison-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let category = document.getElementById('compare-category').value;
    let month = document.getElementById('compare-month').value;

    // Retrieve and compare expenses for this category and month (stubbed data)
    let comparisonResult = `In ${month}, you spent X amount on ${category}. Compare this to your previous month for savings!`;

    document.getElementById('comparison-result').textContent = comparisonResult;
});


// Debt Tracker
let debts = [];
document.getElementById('debt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let debtName = document.getElementById('debt-name').value;
    let debtAmount = parseFloat(document.getElementById('debt-amount').value);

    debts.push({ name: debtName, amount: debtAmount });
    displayDebts();
});

function displayDebts() {
    let debtList = '';
    debts.forEach(function(debt) {
        debtList += `<p>${debt.name}: R${debt.amount}</p>`;
    });
    document.getElementById('debt-list').innerHTML = debtList;
}

document.getElementById('debt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let debtName = document.getElementById('debt-name').value;
    let debtAmount = parseFloat(document.getElementById('debt-amount').value);
    let debtInterest = parseFloat(document.getElementById('debt-interest').value);
    
    let monthlyPayment = debtAmount * (debtInterest / 100) / 12;
    let resultMessage = `For ${debtName}, you should pay approximately R${monthlyPayment.toFixed(2)} per month to cover the interest.`;

    document.getElementById('debt-list').innerHTML = resultMessage;
});


// Budget Planner
let budgets = [];
document.getElementById('budget-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let category = document.getElementById('budget-category').value;
    let amount = parseFloat(document.getElementById('budget-amount').value);

    budgets.push({ category: category, amount: amount });
    displayBudgets();
});

function displayBudgets() {
    let budgetList = '';
    budgets.forEach(function(budget) {
        budgetList += `<p>Category: ${budget.category}, Budget: R${budget.amount}</p>`;
    });
    document.getElementById('budget-list').innerHTML = budgetList;
}

let savingsGoal = 5000;
let currentSavings = 2000;  // Example savings amount

let progressBar = document.getElementById('savings-progress-bar');
let progressStatus = document.getElementById('savings-progress-status');

progressBar.value = currentSavings;
progressStatus.textContent = `You have saved R${currentSavings} of your R${savingsGoal} goal.`;


// Financial Health Score
document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let income = parseFloat(document.getElementById('income').value);
    let debtsAmount = parseFloat(document.getElementById('debts').value);

    let healthScore = (income - debtsAmount) / income * 100;
    document.getElementById('health-result').innerHTML = `
        <p>Your financial health score is ${healthScore.toFixed(2)}%. A higher score indicates better financial health!</p>
    `;
});

// Financial Health Score with Emojis
document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let income = parseFloat(document.getElementById('income').value);
    let debtsAmount = parseFloat(document.getElementById('debts').value);

    // Calculate financial health score
    let healthScore = (income - debtsAmount) / income * 100;

    let statusMessage = '';
    let emoji = '';
    let statusClass = '';

    // Define AI-like Feedback based on financial health score
    if (healthScore >= 80) {
        statusMessage = 'Great job! Your finances are looking healthy!';
        emoji = '💰';  // Money bag emoji for good health
        statusClass = 'good';
    } else if (healthScore >= 50) {
        statusMessage = 'You’re doing okay, but could improve your financial health.';
        emoji = '🙂';  // Neutral face emoji for medium status
        statusClass = 'neutral';
    } else {
        statusMessage = 'Uh-oh! You need to improve your financial situation.';
        emoji = '😞';  // Sad face emoji for poor financial health
        statusClass = 'bad';
    }

    // Display status with emoji and message
    document.getElementById('financial-status').innerHTML = `
        <span class="${statusClass}">${emoji}</span>
        <p class="${statusClass}">${statusMessage}</p>
    `;
});


// Real-Time Spending Alerts (for overspending)
let totalExpenses = 0;
document.getElementById('expense-form').addEventListener('submit', function(event) {
    totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    let totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    if (totalExpenses > totalBudget) {
        document.getElementById('overspending-alert').innerHTML = `You have overspent! Total: R${totalExpenses}, Budget: R${totalBudget}`;
    } else {
        document.getElementById('overspending-alert').innerHTML = `You're within your budget!`;
    }
});
document.getElementById('sign-up-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;
    console.log(`Signed Up: ${email}, Password: ${password}`);
    alert('Sign Up Successful!');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log(`Logged In: ${email}`);
    alert('Login Successful!');
});

document.getElementById('link-bank-button').addEventListener('click', function() {
    alert('Bank account linked successfully! You will now receive notifications.');
});

function generateSavingsTip(expenses, income) {
    let savingsPercentage = (expenses / income) * 100;
    let tipMessage = savingsPercentage > 50 ? "You're spending a bit too much, try cutting back on non-essential items!" : "Great job! Try saving a bit more to reach your goal faster!";
    document.getElementById('savings-tip').textContent = tipMessage;
}

// Example of calling the function
generateSavingsTip(1500, 5000);  