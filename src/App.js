import './App.css';
import { PitchDetector } from "https://esm.sh/pitchy@4";

function App() {


  const audioContext = new window.AudioContext();
  const analyserNode = audioContext.createAnalyser();

  document
    .addEventListener("click", () => audioContext.resume());

  function updatePitch(analyserNode, detector, input, sampleRate) {
    analyserNode.getFloatTimeDomainData(input);
    const [pitch, clarity] = detector.findPitch(input, sampleRate);
    console.log("pitch:" + pitch + "," + clarity);
    window.setTimeout(
      () => updatePitch(analyserNode, detector, input, sampleRate),
      100
    );
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    audioContext.createMediaStreamSource(stream).connect(analyserNode);
    const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
    const input = new Float32Array(detector.inputLength);
    updatePitch(analyserNode, detector, input, audioContext.sampleRate);
  });



  document.addEventListener("DOMContentLoaded", () => {
    const audioContext = new window.AudioContext();
    const analyserNode = audioContext.createAnalyser();

    document
      .addEventListener("click", () => audioContext.resume());

  });


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
