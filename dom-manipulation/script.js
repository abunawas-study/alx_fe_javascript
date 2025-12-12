
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote'); 
const userQuotesList = document.getElementById('userQuotesList');
const categoryFilter = document.getElementById('categoryFilter');
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

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

function populateCategories(){
    const uniqueCategories = new Set(quotes.map(quoteObj => quoteObj.category));
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const lastFilter = localStorage.getItem('lastFilterCategory');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

function filterQuotes(){
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('lastFilterCategory', selectedCategory);
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quoteObj => quoteObj.category === selectedCategory);
    renderQuoteList(filteredQuotes);
}

function renderQuoteList(quotesToRender = quotes){
    if(!userQuotesList) return;
    userQuotesList.innerHTML = '';

    quotesToRender.forEach(quoteObj => {
        const newListItem = document.createElement('li');
        newListItem.textContent = `"${quoteObj.quote}" - Category: ${quoteObj.category}`;
        userQuotesList.appendChild(newListItem);
    });
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
        populateCategories();
        filterQuotes();
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

async function fetchQuotesFromServer(){
    try{
        const response = await fetch(SERVER_URL);
        const serverData = await response.json();

        return serverData.slice(0, 5).map(post => ({
            quote: post.title,
            category:`Server-User-${post.userId}`
        }));
    }catch(error){
        console.error('Failed to fetch from server:', error);
        return [];
    }
}

async function postQuotesToServer(quotesObj){
    try{
        await fetch(SERVER_URL, {
            method: 'POST',
            body: JSON.stringify(quotesObj),
            headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        });
    }catch(error){
        console.error('Failed to post quotes to server:', error);
    }
}

async function syncQuotes(){
    showSyncNotification("Syncing with server...");
    const serverQuotes = await FetchQuotesFromServer();
    const localQuotesString = JSON.stringify(quotes);
    let newQuotesCount = 0;

    serverQuotes.forEach(serverQuote => {
        if(!quotes.some(localQuote => localQuote.quote === serverQuote.quote)){
            quotes.push(serverQuote);
            newQuotesCount++;
        }
    });
    if(newQuotesCount > 0){
        saveQuotes();
        renderQuoteList();
        populateCategories();
        showSyncNotification(`Quotes synced with server ${newQuotesCount} new quotes added.`);
    }else{
        showSyncNotification("Quotes are up to date.");
    }
}

function showSyncNotification(message){
    const syncStatus = document.getElementById('syncStatus');
    syncStatus.textContent = message;
    syncStatus.style.display = 'block';

    setTimeout(() => {
        syncStatus.style.display = 'none';
    }, 3000);
    
   
}

loadQuotes();
renderQuoteList();
displayRandomQuote();
setInterval(syncQuotes, 300000); // Sync every 30 seconds
newQuoteButton.addEventListener('click', displayRandomQuote);
