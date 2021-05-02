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
        const resultsList = document.getElementById('results-list');
        // if (resultsList.firstChild)
        //     resultsList.innerHTML = '';
        resultsList.replaceChildren();
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

                           button.onclick = event => handleNominate(event, element.Title, element.Year);
                           button.innerHTML = 'Nominate';
                           li.innerHTML = `<p>${element.Title} (${element.Year})</p> `;
                           li.append(button);
                           document.getElementById('results-list').appendChild(li);
                       });
                   } else {
                        const resultsList = document.getElementById('results-list');
                        const resultsText = document.getElementById('results-text');
                        // resultsList.innerHTML = "";
                        resultsList.replaceChildren();
                        resultsText.innerText = `No results found`;
                   }
 }  
 );
       }
    }, [fetchData, textInput]);

    const handleNominate = (nominateClick,title, year) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const nominationsList = document.getElementById('nominations-list');

        li.innerHTML = `<p>${title} (${year})</p> `;
        nominationsList.appendChild(li);

        button.innerHTML = 'Remove';
        button.onclick = event => handleRemove(event, nominateClick);
        li.append(button);
        nominationsList.appendChild(li);

        const target = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
        target.disabled = true;
    }

    const handleRemove = (event, nominateClick) => {
        const target = (event.target) ? event.target : event.srcElement;
        const li = target.parentNode;
        li.remove();

        const nominateBtn = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
        nominateBtn.disabled = false;
    }
    
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
                <ul id='nominations-list'></ul>
            </div>
      </div>
    </div>
  );
}

export default App;
