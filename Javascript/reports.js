// DARK MODE JS
let body = document.body;
let darkmode = document.querySelector('#dark');
let lightmode = document.querySelector('#light');

function setTheme(){
    let theme = localStorage.getItem('theme');
    if(theme == 'darktheme'){
        body.classList.add('darktheme');
        localStorage.setItem('theme','darktheme');
        expenseCategoryChart.options.plugins.title.color = 'white';
        expenseCategoryChart.options.plugins.legend.labels.color = 'white';
        expenseCategoryChart.update();
        incomeCategoryChart.options.plugins.title.color = 'white';
        incomeCategoryChart.options.plugins.legend.labels.color = 'white';
        incomeCategoryChart.update();
    }
    else{
        body.classList.remove('darktheme');
        localStorage.setItem('theme','lighttheme');
        expenseCategoryChart.options.plugins.title.color = '#475569';
        expenseCategoryChart.options.plugins.legend.labels.color = '#475569';
        expenseCategoryChart.update();
        incomeCategoryChart.options.plugins.title.color = '#475569';
        incomeCategoryChart.options.plugins.legend.labels.color = '#475569';
        incomeCategoryChart.update();
    }
}

darkmode.addEventListener('click',()=>{
    body.classList.add('darktheme');
    localStorage.setItem('theme','darktheme');
    expenseCategoryChart.options.plugins.title.color = 'white';
    expenseCategoryChart.options.plugins.legend.labels.color = 'white';
    expenseCategoryChart.update();
    incomeCategoryChart.options.plugins.title.color = 'white';
    incomeCategoryChart.options.plugins.legend.labels.color = 'white';
    incomeCategoryChart.update();
})

lightmode.addEventListener('click',()=>{
    body.classList.remove('darktheme');
    localStorage.setItem('theme','lighttheme');
    expenseCategoryChart.options.plugins.title.color = '#475569';
    expenseCategoryChart.options.plugins.legend.labels.color = '#475569';
    expenseCategoryChart.update();
    incomeCategoryChart.options.plugins.title.color = '#475569';
    incomeCategoryChart.options.plugins.legend.labels.color = '#475569';
    incomeCategoryChart.update();
});

// HIGHEST INCOME AND HIGHEST EXPENSE JS
function updateHighestIncome() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    if (incomes.length === 0) {
        document.querySelector('#highestincome').textContent = "₹0";
        return;
    }

    let highestIncome = incomes.reduce((max, income) =>
        Number(income.amount) > Number(max.amount) ? income : max
    );

    document.querySelector('#highestincome').textContent =
        `₹${highestIncome.amount}`;

    document.querySelector('#source').textContent = 
        highestIncome.source;
}

function updateHighestExpense() {

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (expenses.length === 0) {
        document.querySelector('#highestexpense').textContent = "₹0";
        return;
    }

    let highestExpense = expenses.reduce((max, expense) =>
        Number(expense.amount) > Number(max.amount) ? expense : max
    );

    document.querySelector('#highestexpense').textContent =
        `₹${highestExpense.amount}`;
    
    document.querySelector('#catogery').textContent =
        highestExpense.category;
}

// EXPENSE CATEGORY CHART
let expenseCategoryCtx = document.querySelector('#expenseCategoryChart').getContext('2d');
function getCategoryData() {

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let categoryTotals = {};

    expenses.forEach((expense) => {

        let category = expense.category;

        if(categoryTotals[category]){
            categoryTotals[category] += Number(expense.amount);
        }
        else{
            categoryTotals[category] = Number(expense.amount);
        }

    });

    return categoryTotals;
}

let categoryData = getCategoryData();
let labels = Object.keys(categoryData);
let amounts = Object.values(categoryData);

let expenseCategoryChart =  new Chart(expenseCategoryCtx, {
    type: 'pie',

    data: {
        labels: labels,

        datasets: [{
            data: amounts
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                        align: 'center', 
            labels: {
                font: {
                    size: 16,
                    family: 'Outfit',
                    weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: 'Expense Category Analysis',
                font: {
                size: 24,
                family: 'Outfit',
                weight: 'bold'
                }
            }
        }
    }
});

// INCOME CATEGORY CHART
let incomeCategoryCtx = document.querySelector('#incomeCategoryChart').getContext('2d');
function getIncomeSourceData() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    let sourceTotals = {};

    incomes.forEach((income) => {

        let source = income.source;

        if (sourceTotals[source]) {
            sourceTotals[source] += Number(income.amount);
        }
        else {
            sourceTotals[source] = Number(income.amount);
        }

    });

    return sourceTotals;
}

let incomeData = getIncomeSourceData();

let incomeLabels = Object.keys(incomeData);
let incomeAmounts = Object.values(incomeData);

let incomeCategoryChart =  new Chart(incomeCategoryCtx, {

    type: 'pie',

    data: {
        labels: incomeLabels,

        datasets: [{
            data: incomeAmounts,

            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FF9800',
                '#9C27B0',
                '#F44336',
                '#00BCD4'
            ]
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
            labels: {
                font: {
                    size: 16,
                    family: 'Outfit',
                    weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: 'Income Source Analysis',
                font: {
                size: 24,
                family: 'Outfit',
                weight: 'bold'
                }
            }
        }
    }

});

// NET SAVINGS
function updateNetSavings() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalIncome = incomes.reduce(
        (sum, income) => sum + Number(income.amount), 0
    );

    let totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount), 0
    );

    let netSavings = totalIncome - totalExpense;

    document.querySelector('#nSavings').textContent =
        `₹${netSavings}`;
}

// SAVINGS RATE
function updateSavingsRate() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalIncome = incomes.reduce(
        (sum, income) => sum + Number(income.amount), 0
    );

    let totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount), 0
    );

    let netSavings = totalIncome - totalExpense;

    let savingsRate = 0;

    if(totalIncome > 0){
        savingsRate = (netSavings / totalIncome) * 100;
    }

    document.querySelector('#SavingsRate').textContent =
        `${savingsRate.toFixed(1)}%`;
}

// TOTAL TRANSACTION
function updateTotalTransactions() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalTransactions = incomes.length + expenses.length;

    document.querySelector('#transactions').textContent =
        totalTransactions;
}


// WINDOW EVENT LISTENER
window.addEventListener('load',()=>{
    setTheme();
    updateHighestIncome();
    updateHighestExpense();
    updateNetSavings();
    updateSavingsRate();
    updateTotalTransactions();
});



