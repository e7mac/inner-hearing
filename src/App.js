import './App.css';
import PitchDetect from './components/PitchDetect'

function App() {

  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("midi_file");
  console.log(mode);

  return (
    <div className="App">
      <header className="App-header">
        <PitchDetect/>
      </header>
    </div>
  );
}

export default App;
