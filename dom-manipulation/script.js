// 1. Get DOM Elements (Use the variable name 'newQuote' consistently)
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote'); // Renamed for clarity

// 2. Initial Data Array
// Use 'let' so new quotes can be pushed to it.
let quotes = [ 
    {quote: "The only way to do great work is to love what you do.", category: "Motivation"},
    {quote: "Those who want to lead the orchestra must be willing to turn their back on the crowd.", category: "Leadership"},
    {quote: "In the middle of every difficulty lies opportunity.", category: "Inspiration"},
    {quote: "Success usually comes to those who are too busy to be looking for it.", category: "Success"},
    {quote: "Don't watch the clock; do what it does. Keep going.", category: "Time Management"},
];

/**
 * Function to display a single random quote. (The only one needed)
 */
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }
    
    // 1. Get a random quote object from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // 2. Update the DOM content using .textContent
    quoteDisplay.textContent = `"${randomQuote.quote}" - ${randomQuote.category}`;
}

/**
 * Function to add a new quote from the input fields. 
 * Renamed to 'addQuote' to match the standard HTML onclick convention.
 */
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (newQuoteText && newQuoteCategory) {
        // Add the new quote object to the array
        quotes.push({quote: newQuoteText, category: newQuoteCategory});
        
        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        
        // Show the newly added quote or a random one
        showRandomQuote(); 
        
        alert('New quote added successfully!');
    } else {
        alert('Please enter both quote and category.');
    }
}

// 3. Attach Event Listener (Only one, using the correct variable name)
newQuoteButton.addEventListener('click', showRandomQuote);

// 4. Initial Call: Show a quote when the page loads
showRandomQuote();