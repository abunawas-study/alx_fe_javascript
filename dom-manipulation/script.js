
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote'); 
const userQuotesList = document.getElementById('userQuotesList');

let quotes = [];

const storedQuotes = localStorage.getItem('quotes');

if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
}else{
    quotes = [ 
    {quote: "The only way to do great work is to love what you do.", category: "Motivation"},
    {quote: "Those who want to lead the orchestra must be willing to turn their back on the crowd.", category: "Leadership"},
    {quote: "In the middle of every difficulty lies opportunity.", category: "Inspiration"},
    {quote: "Success usually comes to those who are too busy to be looking for it.", category: "Success"},
    {quote: "Don't watch the clock; do what it does. Keep going.", category: "Time Management"},
];
}

function displayRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteDisplay.innerHTML = `<em>"${randomQuote.quote}"</em> <br> <strong>Category:</strong> ${randomQuote.category}`;
}

function createAddQuoteForm() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    
    if (newQuoteText && newQuoteCategory) {
        quotes.push({quote: newQuoteText, category: newQuoteCategory});
        const newListItem = document.createElement('li');
        newListItem.textContent = `"${newQuoteText}" - Category: ${newQuoteCategory}`;
        document.getElementById('userQuotesList').appendChild(newListItem);

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        displayRandomQuote(); 
        
        alert('New quote added successfully!');
    } else {
        alert('Please enter both quote and category.');
    }
}

newQuoteButton.addEventListener('click', displayRandomQuote);
displayRandomQuote();