import './App.css';

function App() {

  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("midi_file");
  console.log(mode);

  return (
    <div className="App">
      <header className="App-header">
      {
        "Under development"
      }
      </header>
    </div>
  );
}

export default App;
