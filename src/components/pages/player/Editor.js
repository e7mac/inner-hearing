import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Midi } from "@tonejs/midi";
import { Helmet } from "react-helmet";
import { getPublicUrl, Loader } from "../../utilities/common";
import { VolumeOffIcon, PlayIcon, PauseIcon, MicrophoneIcon } from "@heroicons/react/outline";
import "html-midi-player";
import "focus-visible";

const Editor = () => {
    const { filename } = useParams();
    const [midiData, setMidiData] = useState(null);
    const [loader, setLoader] = useState(true);
    const TWINKLE_TWINKLE = {
        notes: [
            { pitch: 60, startTime: 0.0, endTime: 0.5 },
            { pitch: 60, startTime: 0.5, endTime: 1.0 },
            { pitch: 67, startTime: 1.0, endTime: 1.5 },
            { pitch: 67, startTime: 1.5, endTime: 2.0 },
            { pitch: 69, startTime: 2.0, endTime: 2.5 },
            { pitch: 69, startTime: 2.5, endTime: 3.0 },
            { pitch: 67, startTime: 3.0, endTime: 4.0 },
            { pitch: 65, startTime: 4.0, endTime: 4.5 },
            { pitch: 65, startTime: 4.5, endTime: 5.0 },
            { pitch: 64, startTime: 5.0, endTime: 5.5 },
            { pitch: 64, startTime: 5.5, endTime: 6.0 },
            { pitch: 62, startTime: 6.0, endTime: 6.5 },
            { pitch: 62, startTime: 6.5, endTime: 7.0 },
            { pitch: 60, startTime: 7.0, endTime: 8.0 },
        ],
        totalTime: 8,
    };

    useEffect(() => {
        if (midiData) {
            setLoader(false);
        }
    }, [midiData]);

    useEffect(() => {
        setLoader(true);
        Midi.fromUrl(getPublicUrl(filename)).then((midi) => {
            console.log("midi", midi);
            setMidiData(midi);
        });
    }, []);

    if (loader) {
        return <Loader />;
    }

    return (
        <div className="h-screen bg-gray-300 font-normal">
            <h1 className="p-4 font-semibold text-2xl text-center text-gray-900 shadow-lg bg-gray-200">
                {midiData.name}
            </h1>
            <Helmet>
                {/* <script src="https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.23.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.5.0"></script> */}
            </Helmet>
            <midi-player
                // src={getPublicUrl(filename)}
                noteSequence={TWINKLE_TWINKLE}
                visualizer="#section3 midi-visualizer"
            ></midi-player>
            <midi-visualizer
                type="staff"
                src={getPublicUrl(filename)}
                visualizer="#section3 midi-visualizer"
            ></midi-visualizer>

            <div className="flex editor">
                <div className="w-1/6 track-info-action">
                    {midiData.tracks.map((track, index) => {
                        return <TrackActionCard name={`${track.name} ${index + 1}`} />;
                    })}
                </div>
                <div className="w-5/6 ml-1 track-notes-viewer">
                    {midiData.tracks.map((track, index) => {
                        return <TrackNotes track={track} index={index} key={index} />;
                    })}
                </div>
            </div>
            <Toolbar />
        </div>
    );
};

const TrackNotes = ({ track, index }) => {
    return <div id={`${track.name}${index}`}></div>;
};

const TrackActionCard = ({ name }) => {
    return (
        <div className="flex items-center mt-3 w-full h-16 border-gray-400 shadow-md text-sm text-gray-50 bg-blue-900">
            <div className="flex items-center ml-3 pr-4 border-r border-gray-50">
                <img src={getPublicUrl("piano-icon.svg")} className="h-8 w-8" />
            </div>
            <div className="flex items-center justify-between w-full">
                <span className="px-4 text-base font-light">{name}</span>
                <VolumeOffIcon className="h-5 w-5 text-gray-50 mr-3 cursor-pointer hover:shadow-lg hover:shadow-gray-100" />
            </div>
        </div>
    );
};

const Toolbar = () => {
    return (
        <div className="w-full h-20 bg-blue-900 mt-3 absolute bottom-0 text-gray-50 flex justify-around items-center">
            <div className="text-lg font-semibold border-2 border-gray-50 rounded-lg p-3">10 Hz</div>
            <div className="flex items-center justify-around w-1/5">
                <PlayIcon className="h-8 w-8 cursor-pointer hover:shadow-lg hover:shadow-gray-100" />
                <PauseIcon className="h-8 w-8 cursor-pointer hover:shadow-lg hover:shadow-gray-100" />
                <MicrophoneIcon className="h-8 w-8 cursor-pointer hover:shadow-lg hover:shadow-gray-100" />
                <div className="text-lg font-semibold border-2 border-gray-50 rounded-lg p-3">00:01</div>
            </div>
        </div>
    );
};

export default Editor;
