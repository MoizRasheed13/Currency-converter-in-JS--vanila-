const currencies = [
    { code: 'afn', currency: 'Afghani' },
    { code: 'all', currency: 'Lek' },
    { code: 'dzd', currency: 'Algerian Dinar' },
    { code: 'eur', currency: 'Euro' }, 
    { code: 'aoa', currency: 'Kwanza' },
    { code: 'xcd', currency: 'East Caribbean Dollar' },
    { code: 'ars', currency: 'Argentine Peso' },
    { code: 'amd', currency: 'Armenian Dram' },
    { code: 'aud', currency: 'Australian Dollar' },
    { code: 'eur', currency: 'Euro' }
  ];
const form_select = document.getElementById("fromCurrency");
const to_select = document.getElementById("toCurrency");

currencies.forEach( currency => {

const new_option = document.createElement("option");
new_option.value = currency.code;
new_option.textContent = currency.currency;

form_select.appendChild(new_option);
to_select.appendChild(new_option.cloneNode(true));

})


async function getexchangerate(from, to) {
    const url = `https://latest.currency-api.pages.dev/v1/currencies/${from}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching exchange rate: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      const exchangeRate = data[from][to];
      console.log(`Exchange rate for ${from} to ${to}: ${exchangeRate}`);
      return exchangeRate;
    } catch (error) {
      console.error("Error:", error);
      
      return null; 
    }
  }
const to = document.getElementById("toCurrency");
const from = document.getElementById("fromCurrency");




const form = document.getElementById("currency-form");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

form.addEventListener("submit",
    async (event) =>{
    event.preventDefault();
    const from_currency = from.value;
    const to_currency = to.value;
    const amount = parseFloat(amountInput.value)
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    };

    getexchangerate(from_currency,to_currency).then(
        (data) => {
            if (data){
            let convertedAmount = parseFloat((amount * data).toFixed(2));
            
            resultDiv.textContent = `${convertedAmount} ${to_currency} `;
            }
            else
            console.log("no data");
        }
    )
}
)