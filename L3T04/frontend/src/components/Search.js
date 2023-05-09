import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Search.css';

function Search() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/${mediaType}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchTerm })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleCheckboxChange = (event) => {
    setMediaType(event.target.value);
  };

  return (
    <div className="container">
      <div className='searchbar'>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="what are you looking for?"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
        <Form>
          {['movie', 'podcast', 'music', 'audiobook', 'shortFilm', 'tvShow', 'software', 'ebook', 'all'].map((media) => (
            <Form.Check
              inline
              key={media}
              label={media}
              name="media"
              type="radio"
              value={media}
              checked={mediaType === media}
              onChange={handleCheckboxChange}
            />
          ))}
        </Form>
      </div>
      <div className='searchresults'>
        {results.map((result) => (
          <div key={result.mediaType}>
            <h3>{result.mediaType}</h3>
            {result.data.map((item) => (
              <div key={item.trackId}>
                <img src={item.artworkUrl100} alt={item.trackName} />
                <p>{item.trackName}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
