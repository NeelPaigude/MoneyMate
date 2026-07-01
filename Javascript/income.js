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
    loadIncome();
    updateTotalIncome();
})

darkmode.addEventListener('click',()=>{
    body.classList.add('darktheme');
    localStorage.setItem('theme','darktheme');
})

lightmode.addEventListener('click',()=>{
    body.classList.remove('darktheme');
    localStorage.setItem('theme','lighttheme');
})

// ADD INCOME JS
let incomeForm = document.querySelector('#income-form');
let addincome = document.querySelector('#addincome');
let tableBody = document.querySelector('#tablebody');

function loadIncome() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    tableBody.innerHTML = "";

    incomes.forEach((income) => {

        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td>₹${income.amount}</td>
            <td>${income.date}</td>
            <td>${income.pmethod}</td>
            <td>${income.source}</td>
            <td>${income.description}</td>
        `;

        tableBody.appendChild(tr);

    });
}

function updateTotalIncome() {

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    let total = 0;

    incomes.forEach((income) => {
        total += Number(income.amount);
    });

    document.querySelector('#income-total').textContent = `₹${total}`;
}

incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let amount = document.querySelector('#amount').value;
    let date = document.querySelector('#date').value;
    let pmethod = document.querySelector('#pmethod').value;
    let source = document.querySelector('#Source').value;
    let description = document.querySelector('#descriprtion').value;
    let tr = document.createElement('tr');
    
    let income = {
        amount,
        date,
        pmethod,
        source,
        description
    }


    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    incomes.push(income);

    localStorage.setItem("incomes", JSON.stringify(incomes));

    loadIncome();
    updateTotalIncome();

    document.querySelector('#amount').value = "";
    document.querySelector('#descriprtion').value = "";
    document.querySelector('#pmethod').selectedIndex = 0;
    document.querySelector('#Source').selectedIndex = 0;
    document.querySelector('#date').value = "";
});

// addincome.addEventListener('click',(e)=>{
//     e.preventDefault();

//     let amount = document.querySelector('#amount').value;
//     let date = document.querySelector('#date').value;
//     let pmethod = document.querySelector('#pmethod').value;
//     let source = document.querySelector('#Source').value;
//     let description = document.querySelector('#descriprtion').value;
//     let tr = document.createElement('tr');
    
//     let income = {
//         amount,
//         date,
//         pmethod,
//         source,
//         description
//     }


//     let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

//     incomes.push(income);

//     localStorage.setItem("incomes", JSON.stringify(incomes));

//     loadIncome();
//     updateTotalIncome();

//     document.querySelector('#amount').value = "";
//     document.querySelector('#descriprtion').value = "";
//     document.querySelector('#pmethod').selectedIndex = 0;
//     document.querySelector('#Source').selectedIndex = 0;
//     document.querySelector('#date').value = "";
// })

// CLEAR DATA JS
let cleardata = document.querySelector('#clearincome');
cleardata.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.removeItem('incomes');
    tableBody.innerHTML = "";
    updateTotalIncome();
});






