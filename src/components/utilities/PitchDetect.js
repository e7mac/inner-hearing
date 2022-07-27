import React from "react";
import { PitchDetector } from "pitchy";

export default class PitchDetect extends React.Component {
    constructor(props) {
        super(props);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.audioContext = new window.AudioContext();
        this.analyserNode = this.audioContext.createAnalyser();
        this.state = {
            buttonClicked: false,
            pitch: 0,
        };
    }

    buttonClicked() {
        this.setState({
            buttonClicked: true,
        });
        const audioContext = this.audioContext;
        const analyserNode = this.analyserNode;
        audioContext.resume();
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            audioContext.createMediaStreamSource(stream).connect(analyserNode);
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
            const input = new Float32Array(detector.inputLength);
            this.updatePitch(detector, input, audioContext.sampleRate);
        });
    }

    updatePitch(detector, input, sampleRate) {
        this.analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(input, sampleRate);
        console.log("pitch:" + pitch + "," + clarity);
        this.setState({
            pitch: pitch,
        });
        window.setTimeout(() => this.updatePitch(detector, input, sampleRate), 100);
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                {this.state.buttonClicked === false ? (
                    <button type="button" onClick={this.buttonClicked}>
                        Start
                    </button>
                ) : (
                    this.state.pitch
                )}
            </div>
        );
    }
}
