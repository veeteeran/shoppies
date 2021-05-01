import './App.css';



function App() {
  return (
    <div class='container'>
        <h1>The Shoppies</h1>
        <div class='search-container'>
            <label htmlFor='title'>Movie title</label>
              <input
                  type='text'
                  id='title'
                  placeholder='Search...'
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
