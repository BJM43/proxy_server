const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
const newQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank and repace it with 'Unknown'
    if(!quote.a){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.a;
    }

    // Check Quote lenght to determine styling
    if (quote.c > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
  
    quoteText.textContent = quote.q;
    removeLoadingSpinner();

}

// Get Quotes From API
const getQuotes = async () => {
    showLoadingSpinner();
    const apiUrl = '/api'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error)
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();