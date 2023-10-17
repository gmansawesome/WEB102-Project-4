import { useState } from 'react'
import './App.css'

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [bannedAttributes, setBannedAttributes] = useState([]);

  const fetchRandomDog = () => {
    const apiUrl = 'https://dog.ceo/api/breeds/image/random';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setImageUrl(data.message);
        setAttributes([
          data.message.split('/')[4],
        ]);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const banAttribute = (attribute) => {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  }

  return (
    <div>
      <h1>Dog API Explorer</h1>
      <h4>Are you ready to get dog-wild?</h4>
      <button onClick={fetchRandomDog}>Discover</button>
      {imageUrl && (
        <div class="discover-container">
          <img src={imageUrl}/>
          <div>
          {attributes.map((attribute, index) => (
              <button key={index} onClick={() => banAttribute(attribute)}>
              {attribute}
              </button>
          ))}
          </div>
        </div>
      )}
      <div class="banlist">
        <h2>Banned Breeds</h2>
        {bannedAttributes.length > 0 ? (
          <ul>
            {bannedAttributes.map((attribute) => (
              <li>{attribute}</li>
            ))}
          </ul>
        ) : (
          <p>No breeds are banned.</p>
        )}
      </div>
    </div>
  );
          }

export default App
