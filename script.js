//  Get quotes from API
let apiQuotes = [];
const newQuoteBtn = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

removeLoadingSpinner= () => {
        quoteContainer.hidden = false;
        loader.hidden = true
}

// Show new Quote
newQuote = () => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    showLoadingSpinner();
    // Check if Author field blank 
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    }
    else {
        authorText.textContent = `- ${quote.author}`;
    }

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = `"${quote.text}"`;
    removeLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        // Catch Error Here
        alert('Server Request Timeout')
    }
}

// Tweet Quote
tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


// Onload
getQuotes();
