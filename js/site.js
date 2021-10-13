//Retrieve values from user
function getValues() {
    let mortgage = {};
    mortgage.principal = parseFloat(document.getElementById('loanAmountInput').value);
    mortgage.term = parseFloat(document.getElementById('termInput').value);
    mortgage.interestRate = parseFloat(document.getElementById('interestInput').value);

    if(Number.isInteger(mortgage.principal) && Number.isInteger(mortgage.term) && Number.isInteger(mortgage.interestRate)){
        //Calculate total monthly payment amount
        mortgage.monthlyPayment = mortgage.principal * (mortgage.interestRate/1200)/(1 - (1 + mortgage.interestRate/1200)**-mortgage.term);
        let displayHTML = buildDisplayHTML(mortgage);
        //Display results to user
        displayResults(displayHTML, mortgage)
        }
        else {alert("Please enter valid numbers for each field")}
        }

function buildDisplayHTML(mortgage) {
    let displayHTML = '';
    let balance = mortgage.principal;
    mortgage.totalInterest = 0;
    for (let i = 1; i <= mortgage.term; i++) {
        let month = i;
        let interest = balance * mortgage.interestRate / 1200;
        let principalPayment = mortgage.monthlyPayment - parseFloat(interest);
        balance = balance - principalPayment;
        mortgage.totalInterest = (Number(mortgage.totalInterest) + Number(interest)).toFixed(2);
        displayHTML += `<tr><td>${month}</td><td>${mortgage.monthlyPayment.toFixed(2)}</td><td>${principalPayment.toFixed(2)}</td><td>${interest.toFixed(2)}</td><td>${mortgage.totalInterest}</td><td>${balance.toFixed(2)}</td></tr>`;
    }
    return displayHTML;
}

function displayResults(displayHTML, mortgage) {
    document.getElementById("tableBody").innerHTML = displayHTML;
    document.getElementById("monthlyPaymentAmount").innerHTML = `$${mortgage.monthlyPayment.toFixed(2)}`;
    document.getElementById("totalPrincipal").innerHTML = `$${mortgage.principal.toFixed(2)}`;
    document.getElementById("totalInterest").innerHTML = `$${mortgage.totalInterest}`;
    document.getElementById("totalCost").innerHTML = `$${(Number(mortgage.principal) + Number(mortgage.totalInterest)).toFixed(2)}`;
}

    