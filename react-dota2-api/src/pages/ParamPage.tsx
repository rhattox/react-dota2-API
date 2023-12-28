// ParamPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ParamPage: React.FC = () => {
    const { parameter } = useParams<{ parameter: string }>();
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        // Create a JSON string with the input value
        const jsonData = JSON.stringify({ parameter: inputValue });

        // Make a POST request to localhost:5000
        fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('POST request successful:', data);
                // Handle the response as needed
            })
            .catch(error => {
                console.error('Error making POST request:', error);
                // Handle the error
            });
    };

    return (
        <div>
            <h2>Parameter Page</h2>
            <p>Parameter value from URL: {parameter}</p>

            <label>
                Enter a new parameter value:
                <input type="text" value={inputValue} onChange={handleInputChange} />
            </label>

            <button onClick={handleButtonClick}>Submit</button>

            <p>Entered parameter value: {inputValue}</p>
        </div>
    );
};

export default ParamPage;
