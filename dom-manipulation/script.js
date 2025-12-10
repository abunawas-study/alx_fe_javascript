
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');


let quotes = [];
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    
    if (storedQuotes) {
        // If data exists in storage, parse it and use it
        quotes = JSON.parse(storedQuotes);
    } else {
        // Otherwise, use the initial default quotes
        quotes = [
            {quote: "The only way to do great work is to love what you do.", category: "Motivation"},
            {quote: "Those who want to lead the orchestra must be willing to turn their back on the crowd.", category: "Leadership"},
            {quote: "In the middle of every difficulty lies opportunity.", category: "Inspiration"},
            {quote: "Success usually comes to those who are too busy to be looking for it.", category: "Success"},
            {quote: "Don't watch the clock; do what it does. Keep going.", category: "Time Management"},
        ];
        // Save the default list to storage for the first time
        saveQuotes();
    }
}

/**
 * 💾 Saves the current quotes array to Local Storage.
 */
function saveQuotes() {
    // Convert the JavaScript array back into a JSON string to store it
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * Function to display a single random quote.
 */
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add one!";
        return;
    }
    
    // Get a random quote object from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Update the HTML div content
    quoteDisplay.textContent = `"${randomQuote.quote}" - ${randomQuote.category}`;
}

/**
 * Function to add a new quote from the input fields.
 */
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (newQuoteText && newQuoteCategory) {
        // Add the new quote object to the array
        quotes.push({quote: newQuoteText, category: newQuoteCategory});
        
        // --- NEW: Save the updated array to Local Storage ---
        saveQuotes(); 
        
        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        
        // Show the newly added quote or a random one
        showRandomQuote(); 
        
        alert('New quote added successfully and saved!');
    } else {
        alert('Please enter both quote and category.');
    }
}

// 4. Initialization Logic
// ------------------------------------------

// 1. Load quotes first (from storage or defaults)
loadQuotes();

// 2. Attach Event Listener to the "Show New Quote" button
newQuoteButton.addEventListener('click', showRandomQuote);

// 3. Initial Call: Show a quote when the page loads
showRandomQuote();