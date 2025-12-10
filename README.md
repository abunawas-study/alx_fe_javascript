# alx_fe_javascript

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');

const quotes = [
    {quote: "The only way to do great work is to love what you do.", category: "Motivation"},
    {quote: "Those who want leader the orchestra must be willing to turn their back on the crowd.", category: "Leadership"},
    {quote: "In the middle of every difficulty lies opportunity.", category: "Inspiration"},
    {quote: "Success usually comes to those who are too busy to be looking for it.", category: "Success"},
    {quote: "Don't watch the clock; do what it does. Keep going.", category: "Time Management"},
]
function displayRandomQuote(){
    quoteDisplay.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
}
displayRandomQuote();

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.quote}" - "${randomQuote.category}"`;
}
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
showRandomQuote();// show a quote when the page loads

function AddQuoteForm(){
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if(newQuoteText && newQuoteCategory){
        quotes.push({quote: newQuoteText, category: newQuoteCategory});
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('New quote added successfully!');
    } else {
        alert('Please enter both quote and category.');

    }
}
newQuoteButton.addEventListener('click', showRandomQuote);

// 4. Initial Call: Show a quote when the page loads
showRandomQuote();