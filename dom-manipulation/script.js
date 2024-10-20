const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');
const importFileInput = document.getElementById('importFile');

let quotes = [
    {
        text: "The time is always right to do what is right",
        category: "Inspirational"
    },
    {
        text: "Turn your wounds into wisdom.",
        category: "Life Lesson"
    },
    {
        text: "The only thing we have to fear is fear itself",
        category: "Famous"
    },
    {
        text: "You have brains in your head. You have feet in your shoes.",
        category: "Motivational"
    },
    {
        text: "All you need in this life is ignorance and confidence; then success is sure.",
        category: "Humor"
    }
];

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if none exist in local storage
        quotes = [
            { text: "The time is always right to do what is right", category: "Inspirational" },
            { text: "Turn your wounds into wisdom.", category: "Life Lesson" },
            { text: "The only thing we have to fear is fear itself", category: "Famous" },
            { text: "You have brains in your head. You have feet in your shoes.", category: "Motivational" },
            { text: "All you need in this life is ignorance and confidence; then success is sure.", category: "Humor" }
        ];
    }
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${selectedQuote.text} <em>(${selectedQuote.category})</em></p>`;

    // Save the last viewed quote in local storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote));
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to create the add quote form dynamically
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// Function to export quotes to a JSON file
function exportToJson() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showRandomQuote(); // Show a new quote after import
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);
importFileInput.addEventListener('change', importFromJsonFile);

// Create the add quote form
createAddQuoteForm();

// Load existing quotes and show an initial random quote
loadQuotes();

// Show an initial random quote
showRandomQuote();