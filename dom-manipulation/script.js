
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote'); 
const userQuotesList = document.getElementById('userQuotesList');

let quotes = [];



function loadQuotes(){
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
saveQuotes();
}
}

function saveQuotes(){
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function renderQuoteList(){
    if(!userQuotesList) return;
    userQuotesList.innerHTML = '';
    quotes.forEach(quoteObj => {
        const newListItem = document.createElement('li');
        newListItem.textContent = `"${quoteObj.quote}" - Category: ${quoteObj.category}`;
        document.getElementById('userQuotesList').appendChild(newListItem);
    })
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
        saveQuotes();
        renderQuoteList();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        displayRandomQuote(); 
        
        alert('New quote added successfully!');
    } else {
        alert('Please enter both quote and category.');
    }
}

function exportQuotes() {
    if(quotes.length === 0){
        alert('Nothing to export. Add some quotes first!');
        return;
    }

    const JSONString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([JSONString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

}

function importQuotes(event) {
    const file = event.target.files[0];
    if (file.length === 0) {
        alert('No file selected. Please choose a JSON file to import.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            quotes = importedQuotes;
            saveQuotes();
            renderQuoteList();
        } catch (error) {
            alert('Error importing quotes. Please make sure the file is valid JSON.');
        }
    };
    reader.readAsText(file);
}

loadQuotes();
renderQuoteList();
newQuoteButton.addEventListener('click', displayRandomQuote);
displayRandomQuote();