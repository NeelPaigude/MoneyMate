let body = document.body;

let searchbar = document.querySelector('#searchbar')
let brandname = document.querySelector('#bname')
let navtext = document.querySelectorAll('.navtext');
let navhead = document.querySelectorAll('.navhead');

let h1 = document.querySelector('h1');

let eChart = document.querySelector('#expenseChart').getContext('2d');
let eContainer = document.querySelector('#expenseChart-container');

// CALCULATIONS
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount), 0
);

let totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount), 0
);

let totalBalance = totalIncome - totalExpense;
let savings = totalBalance;

document.querySelector('#ivalue').textContent = `₹${totalIncome}`;
document.querySelector('#evalue').textContent = `₹${totalExpense}`;
document.querySelector('#bvalue').textContent = `₹${totalBalance}`;
document.querySelector('#svalue').textContent = `₹${savings}`;


// RECENT TRANSACTION
function loadRecentTransaction() {

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let recentDiv = document.querySelector('.recentTransactions');
    let rcategory = document.querySelector('#Catagory')
    let ramount = document.createElement('h3');
    let rdate = document.createElement('h3');

    if (expenses.length === 0) {
        recentDiv.textContent = "No recent transaction";
        return;
    }

    let recent = expenses[expenses.length - 1];

    rcategory.innerHTML = 'Category : '+recent.category;
    ramount.innerHTML = 'Amount : ₹'+recent.amount;
    rdate.innerHTML = 'Date : '+recent.date;

    recentDiv.append(ramount);
    recentDiv.append(rdate);
}



// Login message
window.addEventListener('load',()=>{
    loadRecentTransaction();
    let theme = localStorage.getItem('theme');
    if(theme === 'lighttheme'){
        body.classList.remove('darktheme');
        
    }else{
        body.classList.add('darktheme');
        expenseChart.options.plugins.title.color = 'white';
        expenseChart.options.scales.x.ticks.color = 'white';
        expenseChart.options.scales.y.ticks.color = 'white';
        expenseChart.options.scales.y.border.color = 'white';
        expenseChart.options.scales.x.border.color = 'white';
        expenseChart.options.scales.x.grid.color = 'white';
        expenseChart.options.scales.y.grid.color = 'white';
        expenseChart.update();
        eContainer.style.backgroundColor = '#1e1e1e'
        eContainer.style.boxShadow = 'none';
    }
});

// Light-Mode
let lbtn = document.querySelector('#light');
lbtn.addEventListener('click',()=>{
    body.classList.remove('darktheme');
    
    // body.style.backgroundColor = '#F8FAFC';
    // brandname.style.color = 'black';
    // searchbar.style.border = '1px solid #2563EB'
    // for (let e of navtext){
    //     e.style.color = '#475569';
    // }
    // for(let e of navtext){
    //     e.addEventListener('mouseenter',()=>{
    //         e.style.color = 'black'
    //     })
    //     e.addEventListener('mouseleave',()=>{
    //         e.style.color = '#475569';
    //     })
    // }
    // h1.style.color = '#475569';
    localStorage.setItem('theme','lighttheme');
    expenseChart.options.plugins.title.color = '#475569';
    expenseChart.options.scales.x.ticks.color = '#475569';
    expenseChart.options.scales.y.ticks.color = '#475569';
    expenseChart.options.scales.y.border.color = '#475569';
    expenseChart.options.scales.x.border.color = '#475569';
    expenseChart.options.scales.x.grid.color = '#475569';
    expenseChart.options.scales.y.grid.color = '#475569';
    expenseChart.update();
    eContainer.style.backgroundColor = 'white';
    eContainer.style.boxShadow = '0 2px 10px grey';
})



// Dark-Mode
let dbtn = document.querySelector('#dark');
dbtn.addEventListener('click',()=>{
    // body.style.backgroundColor = '#121212';
    // brandname.style.color = '#F8FAFC';
    // searchbar.style.border = '2px solid white'
    // for (e of navtext){
    //     e.style.color = '#F8FAFC';
    // }
    // for(let e of navtext){
    //     e.addEventListener('mouseenter',()=>{
    //         e.style.color = 'white'
    //     })
    //     e.addEventListener('mouseleave',()=>{
    //         e.style.color = 'white';
    //     })
    // }
    // h1.style.color = '#F8FAFC';
    body.classList.add('darktheme');
    localStorage.setItem('theme','darktheme');
    expenseChart.options.plugins.title.color = 'white';
    expenseChart.options.scales.x.ticks.color = 'white';
    expenseChart.options.scales.y.ticks.color = 'white';
    expenseChart.options.scales.y.border.color = 'white';
    expenseChart.options.scales.x.border.color = 'white';
    expenseChart.options.scales.x.grid.color = 'white';
    expenseChart.options.scales.y.grid.color = 'white';
    expenseChart.update();
    eContainer.style.backgroundColor = '#1e1e1e';
    eContainer.style.boxShadow = 'none';
})


// Analysis Chart
let purpleGradient = eChart.createLinearGradient(0, 0, 0, 400);
purpleGradient.addColorStop(0, '#6a5acd');
purpleGradient.addColorStop(1, '#b284be');

let blueGradient = eChart.createLinearGradient(0, 0, 0, 400);
blueGradient.addColorStop(0, 'rgba(0,71,171,1)');
blueGradient.addColorStop(1, 'rgba(28,169,201,1)');

let greenGradient = eChart.createLinearGradient(0, 0, 0, 400);
greenGradient.addColorStop(0, '#7cfc00');
greenGradient.addColorStop(1, '#0bda51');

let redGradient = eChart.createLinearGradient(0, 0, 0, 400);
redGradient.addColorStop(0, '#e34234');
redGradient.addColorStop(1, '#ff3800');
//'#1E7DF0' pastel blue color
// '#32CD32' pastel green color
// '#FF0000' pastel red color
// '#BF15AE' pastek purple color
let expenseChart = new Chart(eChart, {
    type: 'bar',
    data: {
        labels: ['Balance', 'Income', 'Expense', 'Savings'],
        datasets: [{
            data: [totalBalance, totalIncome, totalExpense, savings],
            backgroundColor: [
                blueGradient,
                greenGradient,
                redGradient,
                purpleGradient
            ]
        }]
    },
    options: {
        resposive : true,
        maintainAspectRatio: false,
        plugins: {
            legend:{
                display: false
            },
            title: {
                display: true,
                text : 'Financial Analysis',
                font: {
                    size: 22,
                    family: '"Outfit", sans-serif'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: '"Outfit", sans-serif',
                        size: 14
                    }
                },
                grid:{
                        display: false
                }
            },
            y: {
                ticks: {
                    font: {
                        family: '"Outfit", sans-serif',
                        size: 14
                    }
                },
                grid:{
                        display: false
                }
            }
        }
    }
});