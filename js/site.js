function getValues(){

    let loanObj = {};
    loanObj.Amount = parseFloat(document.getElementById("inputAmount").value);
    loanObj.Term = parseFloat(document.getElementById("inputTerm").value);
    loanObj.Rate = parseFloat(document.getElementById("inputRate").value);

    if(loanObj.Amount == ''|| loanObj.Term == ''|| loanObj.Rate == ''){alert("Please fill out all fields with valid values")}
    else{
        let resultString = calculateLoan(loanObj);
        displayResults(loanObj);
    }
}

function calculateLoan(loanObj){
    loanObj.tableString = '';
    loanObj.totalMonthlyPayment = (loanObj.Amount*(loanObj.Rate/1200))/(1-(1+loanObj.Rate/1200)**(-loanObj.Term));
    loanObj.totalInterest = 0;
    let balance = loanObj.Amount;

    for (let index = 1; index <= loanObj.Term; index++) {
        let month = index;
        let interestPayment = balance*loanObj.Rate/1200;
        loanObj.totalInterest += interestPayment;
        let principalPayment = loanObj.totalMonthlyPayment-interestPayment;
        balance -= principalPayment;
        loanObj.tableString += `<tr><td>${month}</td><td>\$${loanObj.totalMonthlyPayment.toFixed(2)}</td><td>\$${principalPayment.toFixed(2)}</td><td>\$${interestPayment.toFixed(2)}</td><td>\$${loanObj.totalInterest.toFixed(2)}</td><td>\$${balance.toFixed(2)}</td></tr>`;
        }

    return loanObj;
    
}

function displayResults(loanObj){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',      
      });

      document.getElementById("monthlyPayments").innerHTML = formatter.format(loanObj.totalMonthlyPayment);
      document.getElementById("totalPrincipal").innerHTML = formatter.format(loanObj.Amount);
      document.getElementById("totalInterest").innerHTML = formatter.format(loanObj.totalInterest);
      document.getElementById("totalCost").innerHTML = formatter.format(loanObj.Amount+loanObj.totalInterest);

      document.getElementById("resultTable").innerHTML = loanObj.tableString;
}
