import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
// import Banner from './Banner';



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

    const handleNominate = (nominateClick, title, year) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const nominationsList = document.getElementById('nominations-list');
        // const modalList = document.getElementById('modal-list');


        li.innerHTML = `<p>${title} (${year})</p> `;
        // nominationsList.appendChild(li);

        button.innerHTML = 'Remove';
        button.onclick = event => handleRemove(event, nominateClick);
        li.append(button);
        nominationsList.appendChild(li);

        // const liClone = li.cloneNode(true);
        // liClone.onclick = event => handleRemove(event, nominateClick);
        // modalList.appendChild(liClone);

        const target = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
        target.disabled = true;

        if (nominationsList.childElementCount === 5) {
            showModal();
            const resultsList = document.getElementById('results-list');
            resultsList.childNodes.forEach(element => {
                element.lastChild.disabled = true;
            })
        }
    }

    const handleRemove = (event, nominateClick) => {
        const target = (event.target) ? event.target : event.srcElement;
        const li = target.parentNode;
        li.remove();

        const nominateBtn = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
        nominateBtn.disabled = false;

        const nominationsList = document.getElementById('nominations-list');
        if (nominationsList.childElementCount < 5) {
            hideModal();
            const resultsList = document.getElementById('results-list');
            const nomineeNames = [];
            nominationsList.childNodes.forEach(element => {
                nomineeNames.push(element.firstChild.innerText);
            });

            resultsList.childNodes.forEach(element => {
                console.log(element.firstChild.innerText)
                if (nomineeNames.includes(element.firstChild.innerText) !== true)
                    element.lastChild.disabled = false;
            });
        }
    }

    const showModal = () => {
        document.getElementById('id01').style.display = 'block';
        // document.getElementById('banner').style.display='block'
    }

    const hideModal = () => {
        document.getElementById('id01').style.display='none'
    }
    
  return (
    <div className='container'>
        <div className='header-container'>
            <h1>The Shoppies</h1>
            {/* <Banner id='banner'/> */}
        </div>
        <div className='search-container'>
              <label htmlFor='title'>Movie title</label>
              {/* <div className='search'>
                <i class="fa fa-search" aria-hidden="true"></i> */}
                <input
                    type='search'
                    id='title'
                    placeholder='Search...'
                    value={textInput}
                    onChange={handleChange}
                    onKeyPress={handleKeypress}
                />
              {/* </div> */}
        </div>
        {/* <Banner id='banner'/> */}
        <div className='bottom-box'>
            <div className='results'>
                <div id='results-text'>
                      Results
                </div>    
                <ul id='results-list'></ul>
            </div>
            <div className='nominations'>
                <div className='nominations-text'>
                      Nominations
                </div>
                <ul id='nominations-list'></ul>
            </div>
          </div>
        <div id="id01" className="w3-modal">
            <div className="w3-modal-content">
                <header className="w3-container w3-light-grey"> 
                    <span onClick={hideModal}
                    className="w3-button w3-display-topright">&times;</span>
                    <h2>Thanks for choosing your nominees</h2>
                </header>
                <div className="w3-container banner-container">
                    <p>Please edit of submit your choices</p>
                    {/* <div className='button-container'> */}
                        <button onClick={hideModal}>Edit</button>
                        <button>Submit</button>
                    {/* </div> */}
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
