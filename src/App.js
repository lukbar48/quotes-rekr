import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [allQuotesList, setAllQuotesList] = useState();
  const [quote, setQuote] = useState();
  const [randomQuotesList, setRandomQuotesList] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const result = await fetch(
          'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
        );
        const data = await result.json();
        setAllQuotesList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuotes();
  }, []);

  const getQuote = () => {
    const randomNumber = (Math.random() * allQuotesList.length).toFixed(0);
    setQuote(allQuotesList[randomNumber]);
    setRandomQuotesList([...randomQuotesList, allQuotesList[randomNumber]]);
  };

  const getLastQuote = () => {
    setQuote(randomQuotesList[randomQuotesList.length - 2]);
  };

  return (
    <div className="App">
      <button onClick={getQuote}>Get quote</button>
      <button onClick={getLastQuote}>Previous Quote</button>
      {quote ? (
        <>
          <h2>{quote.quote}</h2>
          <h3>{quote.author}</h3>
        </>
      ) : (
        <div>Click to get quote!</div>
      )}
    </div>
  );
}

export default App;
