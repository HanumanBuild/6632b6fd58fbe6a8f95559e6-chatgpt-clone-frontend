import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const sendMessage = async () => {
        if (message.trim() !== '') {
            const response = await axios.post(`${process.env.REACT_APP_CHATGPT_CLONE_BACKEND_URL}/chat`, { message });
            setResponses([...responses, { msg: message, from: 'user' }, { msg: response.data.message, from: 'bot' }]);
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="p-6 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md w-full">
                <ul>
                    {responses.map((res, index) => (
                        <li key={index} className={`list-none p-2 ${res.from === 'bot' ? 'text-red-500' : 'text-blue-500'}`}>{res.msg}</li>
                    ))}
                </ul>
                <div className="mt-5">
                    <input type="text" className="border p-2 w-full" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something..." />
                    <button onClick={sendMessage} className="p-2 bg-blue-500 text-white mt-2 rounded">Send</button>
                </div>
            </div>
        </div>
    );
}

export default App;