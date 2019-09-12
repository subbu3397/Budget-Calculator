var budget = 0
var description = null;
//var amount = 0;
var income = 0;
var expense = 0;
var percentage = 0;
var counterForIncome = 0, counterForExpense = 0;
var totalBudget = 0;
var totalPercentange = 0;
var deleteOp = null, deleteId = 0
var budgetOp = 0;
var deleteValue = 0;
var item = null;
var errorCheck = true;
var errorCount =0;

// var Data = {
//     allItems: {
//         expense: [],
//         income: []
//     },
//     totals: {
//         expense: 0,
//         income: 0,
//         budget: 0,
//         percentage: 0.0
//     }
// }
var constants = function () {
    var DomStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        budgetValue: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetExpense: '.budget__expenses--value',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        expensePercentage: '.budget__expenses--percentage',
        container: '.container'
    }
    return DomStrings;
}
var initial = function () {
    console.log("calling initial fn");
    document.querySelector('.add__btn').addEventListener("click", function () {
        validation();   
    });
    document.querySelector('.add__btn').addEventListener("keypress" , function(e){ 
        if (e.keyCode == 13) {
            validation();   
        }      
     });
}
    
function validation()
{
    description = document.querySelector('.add__description').value;
    amount = document.querySelector('.add__value').value;
    amount = parseFloat(amount).toFixed(2);
    if(errorCount>=1)
    {
        $(".alert").remove(); 
    }
    if( ((isNaN(amount) || amount=="0.00") && description =="") && errorCheck == true)
    {
        alertDiv = "<div class='alert alert-info alert-dismissible row'><p class='col-sm-11'>Please enter the both description and amount .</p><p class='col-sm-1' data-dismiss='alert'><b >X</b></p></div>"
        document.querySelector('.container').insertAdjacentHTML('afterbegin', alertDiv);
        errorCheck = true;
        errorCount++;
                }
    else if((isNaN(amount) || amount=="0.00" && errorCheck == true)){
        $(".alert").remove(); 
        alertDiv = "<div class='alert alert-info alert-dismissible row'><p class='col-sm-11'>Please enter the amount .</p><p class='col-sm-1' data-dismiss='alert'><b >X</b></p></div>"
        document.querySelector('.container').insertAdjacentHTML('afterbegin', alertDiv);
        errorCheck = true;
        errorCount++;
    }
    else if(description=="" && errorCheck == true){
        $(".alert").remove(); 
        alertDiv = "<div class='alert alert-info alert-dismissible row'><p class='col-sm-11'>Please enter the description .</p><p class='col-sm-1' data-dismiss='alert'><b >X</b></p></div>"
        document.querySelector('.container').insertAdjacentHTML('afterbegin', alertDiv);
        errorCheck = true;
        errorCount++;
    }
    else
    {
        errorCheck = false;
        $(".alert").remove();
        budgetCalculation(amount);
        uiChanges(description, amount);
    }
}

var uiChanges = function (description, amount) {
    var textBox, newTextBox;
    var op = checkingOperation();
    var totalAmount = parseFloat(budget).toFixed(2);
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
    if (op == "income" && errorCheck == false) {
        textBox = '<div class="item clearfix" id="income-%counterForIncome%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>'
        newTextBox = textBox.replace('%description%', description);
        newTextBox = newTextBox.replace('%value%', amount);
        newTextBox = newTextBox.replace('%counterForIncome%', counterForIncome);
        document.querySelector('.income__list').insertAdjacentHTML('afterbegin', newTextBox);
        document.querySelector('.budget__value').textContent = totalAmount;
        document.querySelector('.budget__income--value').textContent = income.toFixed(2);
        counterForIncome++;
    }
    else {
        textBox = '<div class="item clearfix" id="expense-%counterForExpense%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">%percentage%%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
        newTextBox = textBox.replace('%description%', description);
        newTextBox = newTextBox.replace('%value%', amount);
        newTextBox = newTextBox.replace('%counterForExpense%', counterForExpense);
        newTextBox = newTextBox.replace('%percentage%', percentage.toFixed(2));
        document.querySelector('.expenses__list').insertAdjacentHTML('beforeend', newTextBox);
        document.querySelector('.budget__value').textContent = totalAmount;
        document.querySelector('.budget__expenses--value').textContent = expense.toFixed(2);
        document.querySelector('.budget__expenses--percentage').textContent = parseFloat(totalPercentange).toFixed(2) + "%";
        counterForExpense++;
    }
    description = ""
    amount = 0
}

var checkingOperation = function () {
    var op = document.querySelector('.add__type').value
    return op;
}
var budgetCalculation = function (amount) {
    var op = checkingOperation();
    if (op == "income") {
        budget += Math.round(amount*100)/100;
        income += parseFloat(amount);
        totalBudget = budget;
        if (expense != 0) {
            var length = document.getElementsByClassName('expenses__list')[0].children.length
            var totalPercentange1 = 0
            for (var i = 0; i < length; i++) {
                var expenseValue = document.getElementsByClassName('expenses__list')[0].children[i].children[1].children[0].innerText
                var actualValue = expenseValue.split('-')[1]
                percentage = Math.round(((actualValue/income) * 100)*100)/100
                console.log("Percentage"+percentage);
                totalPercentange1 += percentage
                console.log("TotalPercentage"+totalPercentange1);
                document.getElementsByClassName('expenses__list')[0].children[i].children[1].children[1].innerText = percentage + "%"
                document.getElementsByClassName('budget__expenses--percentage')[0].innerText = totalPercentange1 + "%"
            }
        }
    }
    else {
        budget -= Math.round(amount*100)/100;
        if (budget >= 0) {
            percentage = (((amount/totalBudget)* 100)*100)/100;
           
            totalPercentange += parseFloat(percentage)
            if (totalPercentange > 99.9)
                alert("Warning!!! Your expense Increased than your income");
        }
        else
            percentage = "---"
        expense += parseFloat(amount);
    }
}
initial();
if(errorCheck == false)
{
    console.log("NO error 1");
    document.querySelector('.container').addEventListener("click", deleteItem);
    function deleteItem(event) {
    item = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var splitId = item.split('-');
    deleteOp = splitId[0];
    deleteId = parseInt(splitId[1]);
    deleteOperation(deleteOp, item)
}
}
function deleteOperation(deleteOp, item) {
    if (deleteOp == "income") {
        var splitItem = document.getElementById(item).getElementsByClassName('right')[0].childNodes[0].innerHTML.split(" ");
        budgetOp = splitItem[0];
        deleteValue = splitItem[1];
        budget -= Math.round(deleteValue*100)/100;
        income -= parseFloat(deleteValue)
        totalBudget = budget;
        document.querySelector('.budget__income--value').textContent = income.toFixed(2);
        var length = document.getElementsByClassName('expenses__list')[0].children.length
        if (length <= 1)
            document.getElementsByClassName('budget__expenses--percentage')[0].innerText = "---%"
        else {
            var totalPercentange1 = 0
            for (var i = 0; i < length; i++) {
                var expenseValue = document.getElementsByClassName('expenses__list')[0].children[i].children[1].children[0].innerText
                var actualValue = expenseValue.split('-')[1]
                percentage = (((actualValue/income)*100)*100)/100;
                console.log("Percentage"+percentage);
                totalPercentange1 += parseFloat(percentage);
                document.getElementsByClassName('expenses__list')[0].children[i].children[1].children[1].innerText = percentage + "%"
                document.getElementsByClassName('budget__expenses--percentage')[0].innerText = totalPercentange1 + "%"
            }
        }
    }
    else {
        var itemDelete = document.getElementById(item).getElementsByClassName('right')[0].childNodes[1].innerHTML
        var splitItem = itemDelete.split(" ");
        budgetOp = splitItem[0];
        deleteValue = splitItem[1];
        budget += Math.round(deleteValue*100)/100;
        if (expense != 0)
            expense -= parseFloat(deleteValue);
        else
            expense = 0
        totalBudget = budget;
        document.querySelector('.budget__expenses--value').textContent = expense.toFixed(2);
        var deletePercentage = document.getElementById(item).getElementsByClassName('right')[0].childNodes[3].innerHTML
        var splitPercentage = deletePercentage.split("%")
        var deletePercentageValue = splitPercentage[0];
        totalPercentange = totalPercentange - deletePercentageValue
        if (totalPercentange <= 0)
            document.querySelector('.budget__expenses--percentage').textContent = "0%";
        else
            document.querySelector('.budget__expenses--percentage').textContent = (totalPercentange).toFixed(2) + "%";
    }
    var elem = document.getElementById(item);
    elem.parentNode.removeChild(elem);
    document.querySelector('.budget__value').textContent = totalBudget;
}
var updateDate = function () {
    var allmonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    document.querySelector('.budget__title--month').textContent = allmonths[month] + " " + year;
    document.querySelector('.add__description').focus();
}
Applicationcontroller: (function () {
    updateDate();
}());


// window.setTimeout(function() {
//     $(".alert").fadeTo(500, 0).slideUp(500, function(){
//         $(this).remove(); 
//     });
// }, 4000);