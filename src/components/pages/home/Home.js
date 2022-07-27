const midiFiles = [
    {
        name: "Ex1.mid",
    },
];

const Home = () => {
    return (
        <div>
            <div className="flow-root mt-6">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {midiFiles.map((midiFile, index) => (
                        <li key={index} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{midiFile.name}</p>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View
                                    </a>
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
