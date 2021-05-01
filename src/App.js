import React, { useEffect, useState } from 'react';
import './App.css';



function App() {
    const [textInput, setTextInput] = useState('');

    const handleChange = event => {
        setTextInput(event.target.value);
    };
    
    const handleSubmit = event => {
        // event.preventDefault();
        alert(`Movie title search is - ${textInput}`);
    };

    const handleKeypress = event => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };
    
  return (
    <div class='container'>
        <h1>The Shoppies</h1>
        <div class='search-container'>
            <label htmlFor='title'>Movie title</label>
              <input
                  type='text'
                  id='title'
                  placeholder='Search...'
                  value={textInput}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
              />
        </div>
        <div class='bottom-box'>
            <div class='results'>
                <div class='results-text'>
                      Results for
                    <ul id='results-list'></ul>
                </div>
            </div>
            <div class='nominations'>
                <div class='nominations-text'>
                    Nominations
                </div>
            </div>
      </div>
    </div>
  );
}

export default App;
