function getValues(){

    let loanObj = {};
    loanObj.Price = parseFloat(document.getElementById("inputPrice").value);
    //loanObj.Amount = parseFloat(document.getElementById("inputAmount").value);
    loanObj.Term = parseFloat(document.getElementById("inputTerm").value);
    loanObj.Rate = parseFloat(document.getElementById("inputRate").value);
    loanObj.DownPercent = parseFloat(document.getElementById("inputDownPercent").value);
    loanObj.DownAmount =  parseFloat(document.getElementById("inputDownAmount").value);
    if(isNaN(loanObj.DownPercent)){loanObj.DownPercent = 0;}
    if(isNaN(loanObj.DownAmount)){loanObj.DownAmount = 0;}
    loanObj.DownPayment = calculateDownPayment(loanObj.DownPercent, loanObj.DownAmount, loanObj.Price)
    loanObj.Amount = loanObj.Price - loanObj.DownPayment;

    //if(loanObj.Price == '' || isNaN(loanObj.Price) || loanObj.Term == '' || isNaN(loanObj.Term) || loanObj.Rate == '' || isNaN(loanObj.Rate)){alert("Please fill out all fields with valid values")}
    if(loanObj.Price == '' || isNaN(loanObj.Price)){alert("Please enter valid loan price above $1.")}
    else if(loanObj.Term == '' || isNaN(loanObj.Term)){alert("Please enter valid loan term of at least 1 month.")}
    else if(loanObj.Rate == '' || isNaN(loanObj.Rate)){alert("Please enter valid interest rate of at least 1%.")}


    else{
        let resultString = calculateLoan(loanObj);
        displayResults(loanObj);
    }
}

function calculateLoan(loanObj){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',      
      });

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
        loanObj.tableString += `<tr><td>${month}</td><td>${formatter.format(loanObj.totalMonthlyPayment)}</td><td>${formatter.format(principalPayment)}</td><td>${formatter.format(interestPayment)}</td><td>${formatter.format(loanObj.totalInterest)}</td><td>${formatter.format(balance)}</td></tr>`;
        }

    return loanObj;
    
}

function calculateDownPayment(downPercent, downAmount, Price){
    let downPayment = 0;

    if(downPercent == 0){
        downPayment = downAmount;
    }
    else{
        downPayment = (downPercent/100) * Price;
    }
    return downPayment;
}


function displayResults(loanObj){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',      
      });

      document.getElementById("monthlyPayments").innerHTML = formatter.format(loanObj.totalMonthlyPayment);

      document.getElementById("itemPrice").innerHTML = formatter.format(loanObj.Price);
      document.getElementById("downPayment").innerHTML = formatter.format(loanObj.DownPayment);

      document.getElementById("totalPrincipal").innerHTML = formatter.format(loanObj.Amount);
      document.getElementById("totalInterest").innerHTML = formatter.format(loanObj.totalInterest);
      document.getElementById("totalCost").innerHTML = formatter.format(loanObj.Amount+loanObj.totalInterest);

      document.getElementById("resultTable").innerHTML = loanObj.tableString;
}
