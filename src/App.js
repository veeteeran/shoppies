import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';



function App() {
    const [textInput, setTextInput] = useState('');

    const handleChange = event => {
        setTextInput(event.target.value);
    };
    
    // const handleSubmit = event => {
    //     // event.preventDefault();
    //     alert(`Movie title search is - ${textInput}`);
    // };

    const handleKeypress = event => {
    //   if (event.key === 'Enter') {
        //   handleSubmit();
    //       setFetch(true);
    //   }
        // const resultsList = document.getElementById('results-list');
        // if (resultsList.firstChild)
        //     resultsList.innerHTML = '';
        setFetch(true);
    };

    const [data, setData] = useState(null);
    const [fetchData, setFetch] = useState(false);
    useEffect(() => {
        if (fetchData) {
           axios.get(`http://www.omdbapi.com/?apikey=dd46713f&s=${textInput}`)
               .then((res) => {
                   if (res.data.Search) {
                    document.getElementById('results-text')
                    .innerText = `Results for "${textInput}"`;
                       res.data.Search.forEach(element => {
                           const li = document.createElement("li");
                           const button = document.createElement("button");

                           button.innerHTML = 'Nominate';
                           li.innerHTML = `${element.Title} (${element.Year}) `;
                           li.append(button);
                           document.getElementById('results-list').appendChild(li);
                       });
                   } else {
                        const resultsList = document.getElementById('results-list');
                        const resultsText = document.getElementById('results-text');
                        resultsList.innerHTML = "";
                        resultsText.innerText = `No results found`;
                   }
 }  
 );
       }
    }, [fetchData, textInput]);
    
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
                <div id='results-text'>
                      Results
                </div>    
                <ul id='results-list'></ul>
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
