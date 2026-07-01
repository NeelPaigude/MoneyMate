// DARK MODE JS
let body = document.body;
let darkmode = document.querySelector('#dark');
let lightmode = document.querySelector('#light');

function setTheme(){
    let theme = localStorage.getItem('theme');
    if(theme == 'darktheme'){
        body.classList.add('darktheme');
        localStorage.setItem('theme','darktheme');
    }
    else{
        body.classList.remove('darktheme');
        localStorage.setItem('theme','lighttheme');
    }
}

window.addEventListener('load',()=>{
    setTheme();
    loadExpense();
    updateTotalExpense();
    updateCurrentBalance();
})

darkmode.addEventListener('click',()=>{
    body.classList.add('darktheme');
    localStorage.setItem('theme','darktheme');
})

lightmode.addEventListener('click',()=>{
    body.classList.remove('darktheme');
    localStorage.setItem('theme','lighttheme');
})

// ADD EXPENSE JS
let expenseForm = document.querySelector('#expense-div');
let addexpense = document.querySelector('#addexpense');
let tableBody = document.querySelector('#tablebody');

function loadExpense() {

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    tableBody.innerHTML = "";

    expenses.forEach((expense) => {

        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td>₹${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.pmethod}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
        `;

        tableBody.appendChild(tr);

    });
}

function updateTotalExpense() {

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let total = 0;

    expenses.forEach((expense) => {
        total += Number(expense.amount);
    });

    document.querySelector('#expense-total').textContent = `₹${total}`;
}

expenseForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let amount = document.querySelector('#amount').value;
    let date = document.querySelector('#date').value;
    let pmethod = document.querySelector('#pmethod').value;
    let category = document.querySelector('#category').value;
    let description = document.querySelector('#descriprtion').value;
    // let tr = document.createElement('tr');

    // Calculate current balance
    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalIncome = incomes.reduce(
        (sum, income) => sum + Number(income.amount), 0
    );

    let totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount), 0
    );

    let balance = totalIncome - totalExpense;

    // Validation
    if(Number(amount) > balance){
        // alert("Expense exceeds current balance");
        const loginBox = document.querySelector('#warningAlert');
        loginBox.classList.remove('d-none');
        setTimeout(()=>{
            loginBox.classList.add('d-none');
        },2000);
        document.querySelector('#amount').value = "";
        document.querySelector('#descriprtion').value = "";
        document.querySelector('#pmethod').selectedIndex = 0;
        document.querySelector('#category').selectedIndex = 0;
        document.querySelector('#date').value = "";
        return;
    }
    
    let expense = {
        amount,
        date,
        pmethod,
        category,
        description
    }

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    loadExpense();
    updateTotalExpense();
    updateCurrentBalance();

    document.querySelector('#amount').value = "";
    document.querySelector('#descriprtion').value = "";
    document.querySelector('#pmethod').selectedIndex = 0;
    document.querySelector('#category').selectedIndex = 0;
    document.querySelector('#date').value = "";
});

// addexpense.addEventListener('click',(e)=>{
//     e.preventDefault();

//     let amount = document.querySelector('#amount').value;
//     let date = document.querySelector('#date').value;
//     let pmethod = document.querySelector('#pmethod').value;
//     let category = document.querySelector('#category').value;
//     let description = document.querySelector('#descriprtion').value;
//     // let tr = document.createElement('tr');

//     // Calculate current balance
//     let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
//     let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

//     let totalIncome = incomes.reduce(
//         (sum, income) => sum + Number(income.amount), 0
//     );

//     let totalExpense = expenses.reduce(
//         (sum, expense) => sum + Number(expense.amount), 0
//     );

//     let balance = totalIncome - totalExpense;

//     // Validation
//     if(Number(amount) > balance){
//         alert("Expense exceeds current balance");
//         return;
//     }
    
//     let expense = {
//         amount,
//         date,
//         pmethod,
//         category,
//         description
//     }

//     expenses.push(expense);

//     localStorage.setItem("expenses", JSON.stringify(expenses));

//     loadExpense();
//     updateTotalExpense();
//     updateCurrentBalance();

//     document.querySelector('#amount').value = "";
//     document.querySelector('#descriprtion').value = "";
//     document.querySelector('#pmethod').selectedIndex = 0;
//     document.querySelector('#category').selectedIndex = 0;
//     document.querySelector('#date').value = "";
// })


// CLEAR DATA JS
let cleardata = document.querySelector('#clearexpense');
cleardata.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.removeItem('expenses');
    tableBody.innerHTML = "";
    updateTotalExpense();
});


// CURRENT BALANCE
function updateCurrentBalance() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalIncome = 0;
    let totalExpense = 0;

    incomes.forEach((income) => {
        totalIncome += Number(income.amount);
    });

    expenses.forEach((expense) => {
        totalExpense += Number(expense.amount);
    });

    let balance = totalIncome - totalExpense;

    document.querySelector('#cbalance').textContent =
        `₹${balance}`;
}