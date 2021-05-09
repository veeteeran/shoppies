import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';


function App() {
    const [textInput, setTextInput] = useState('');

    const handleChange = event => {
        setTextInput(event.target.value);
        setFetch(true);
    };

    // const handleKeypress = event => {
    //     if (event.keyCode === 13) {
    //         const resultsList = document.getElementById('results-list');
    //         resultsList.replaceChildren();
    //         setFetch(true);
    //     }
    // };

    const handleRemove = useCallback((event, nominateClick) => {
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
                if (nomineeNames.includes(element.firstChild.innerText) !== true)
                    element.lastChild.disabled = false;
            });
        }
    }, []);

    const createNominees = useCallback((nominateClick, title, year) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const nominationsList = document.getElementById('nominations-list');

        li.innerHTML = `<p>${title} (${year})</p> `;
        button.innerHTML = 'Remove';
        button.onclick = event => handleRemove(event, nominateClick);
        li.append(button);
        nominationsList.appendChild(li);
    }, [handleRemove]);

    const handleNominate = useCallback((nominateClick, title, year) => {
        const nominationsList = document.getElementById('nominations-list');

        createNominees(nominateClick, title, year);

        const target = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
        target.disabled = true;

        if (nominationsList.childElementCount === 5) {
            showModal();
            const resultsList = document.getElementById('results-list');
            resultsList.childNodes.forEach(element => {
                element.lastChild.disabled = true;
            })
        }
    }, [createNominees])

    const createResults = useCallback((element) => {
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.disabled = false;
        button.onclick = event => handleNominate(event, element.Title, element.Year);
        button.innerHTML = 'Nominate';
        li.innerHTML = `<p>${element.Title} (${element.Year})</p> `;
        li.append(button);
        document.getElementById('results-list').appendChild(li);
    }, [handleNominate]);

    // const createNominees = (nominateClick, title, year) => {
    //     const li = document.createElement("li");
    //     const button = document.createElement("button");
    //     const nominationsList = document.getElementById('nominations-list');

    //     li.innerHTML = `<p>${title} (${year})</p> `;
    //     button.innerHTML = 'Remove';
    //     button.onclick = event => handleRemove(event, nominateClick);
    //     li.append(button);
    //     nominationsList.appendChild(li);
    // }

    const [fetchData, setFetch] = useState(false);
    useEffect(() => {
        if (fetchData) {
            try {
           axios.get(`http://www.omdbapi.com/?apikey=dd46713f&s=${textInput}`)
                .then((res) => {
                    if (res.data.Search) {
                        document.getElementById('results-text')
                            .innerText = `Results for "${textInput}"`;
                        res.data.Search.forEach(element => createResults(element));
                    } else {
                        const resultsList = document.getElementById('results-list');
                        const resultsText = document.getElementById('results-text');
                        resultsList.replaceChildren();
                        resultsText.innerText = `No results found`;
                    }
                }
                );
            } catch (err) {
                console.log(err)
        }
        }
    }, [fetchData, textInput, createResults]);

    // const handleNominate = (nominateClick, title, year) => {
    //     const nominationsList = document.getElementById('nominations-list');

    //     createNominees(nominateClick, title, year);

    //     const target = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
    //     target.disabled = true;

    //     if (nominationsList.childElementCount === 5) {
    //         showModal();
    //         const resultsList = document.getElementById('results-list');
    //         resultsList.childNodes.forEach(element => {
    //             element.lastChild.disabled = true;
    //         })
    //     }
    // }

    // const handleRemove = (event, nominateClick) => {
    //     const target = (event.target) ? event.target : event.srcElement;
    //     const li = target.parentNode;
    //     li.remove();

    //     const nominateBtn = (nominateClick.target) ? nominateClick.target : nominateClick.srcElement;
    //     nominateBtn.disabled = false;

    //     const nominationsList = document.getElementById('nominations-list');
    //     if (nominationsList.childElementCount < 5) {
    //         hideModal();
    //         const resultsList = document.getElementById('results-list');
    //         const nomineeNames = [];
    //         nominationsList.childNodes.forEach(element => {
    //             nomineeNames.push(element.firstChild.innerText);
    //         });

    //         resultsList.childNodes.forEach(element => {
    //             if (nomineeNames.includes(element.firstChild.innerText) !== true)
    //                 element.lastChild.disabled = false;
    //         });
    //     }
    // }

    const showModal = () => {
        document.getElementById('id01').style.display = 'block';
    }

    const hideModal = () => {
        document.getElementById('id01').style.display='none'
    }

    const handleSubmit = () => {
        setModalH2('Submission sucessful!');
        setModalParagraph('Winners will be announced at The Shoppies awards ceremony!');
        document.getElementById("edit-btn").remove()
        document.getElementById("submit-btn").remove()

        const paragraphContainer = document.getElementById('paragraph-container');
        const button = createCloseBtn();

        paragraphContainer.appendChild(button);

        document.getElementById('close-span').onclick = () => handleClose();
    }

    const createCloseBtn = () => {
        const button = document.createElement("button");
        button.innerHTML = 'Close';
        button.onclick = () => handleClose();
        return button;
    }

    const handleClose = () => {
        window.location.reload();
    }

    const [modalH2, setModalH2] = useState('Thanks for choosing your nominees');
    const [modalParagraph, setModalParagraph] = useState('Please edit or submit your choices');
    
  return (
    <div className='container'>
        <h1>The Shoppies</h1>
        <div className='search-container'>
              <label htmlFor='title'>Movie title</label>
              <div className='search'>
                  <i class="fa fa-search" aria-hidden="true"></i>
              </div>
                <input
                    type='search'
                    id='title'
                    placeholder='Search...'
                    value={textInput}
                    onChange={handleChange}
                    // onKeyPress={handleKeypress}
                />
        </div>
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
                    className="w3-button w3-display-topright" id='close-span'>&times;</span>
                      <h2>{modalH2}</h2>
                </header>
                <div className="w3-container banner-container" id='paragraph-container'>
                    <p>{modalParagraph}</p>
                    <button id='edit-btn' onClick={hideModal}>Edit</button>
                    <button id='submit-btn' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
