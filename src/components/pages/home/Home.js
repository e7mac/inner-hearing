import { Link } from "react-router-dom";

const midiFiles = [
    {
        name: "Ex1.mid",
    },
];

const Home = () => {
    return (
        <div>
            <h1 className="p-4 font-semibold text-2xl text-center">4 Part Inner Hearing</h1>
            <div className="flow-root mt-6">
                <ul className="-my-5 divide-y divide-gray-500">
                    {midiFiles.map((midiFile, index) => (
                        <li key={index} className="py-4">
                            <div className="flex items-center justify-center space-x-4">
                                <p className="text-lg font-medium text-gray-900 truncate">{midiFile.name}</p>
                                <div>
                                    <Link
                                        to={`/editor/${midiFile.name}`}
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Start
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
