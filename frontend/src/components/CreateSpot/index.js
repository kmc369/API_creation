import React, { useState } from 'react';
import './Createspot.css';

function CreateSpot() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(1234.0);
  const [longitude, setLongitude] = useState(1586.0);
  const [description, setDescription] = useState('');
  const [spotTitle, setSpotTitle] = useState('');
  const [price, setPrice] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '']); // An array for multiple images

  const handleLatitudeChange = (e) => {
    setLatitude(parseFloat(e.target.value));
  };

  const handleLongitudeChange = (e) => {
    setLongitude(parseFloat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      country,
      state,
      city,
      address,
      latitude,
      longitude,
      description,
      spotTitle,
      price,
      previewImageUrl,
      imageUrls,
    };
    console.log(form)
  };

  return (
    <div className='container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='location-container'>
          <h3>Create a New Spot</h3>
          <h5>Where's your place located?</h5>
          <p>Guests will only get your exact address once they book a reservation.</p>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            type='text'
            placeholder='Country'
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            type='text'
            placeholder='Address'
          />
          <div className='city-state-container'>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              type='text'
              placeholder='City'
            />
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              type='text'
              placeholder='State'
            />
          </div>
        </div>

        <div className='long-lat-container'>
          <input
            type='number'
            placeholder='Latitude'
            value={latitude}
            onChange={handleLatitudeChange}
          />
          <input
            type='number'
            placeholder='Longitude'
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </div>

        <div className='describe'>
          <h5>Describe your place to guests</h5>
          <p className='secondP'>
            Mention the best features of your space, any special amenities like fast
            wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='textarea-text'
            type='textarea'
          ></textarea>
        </div>

        <div className='create-container'>
          <h5>Create a title for your spot</h5>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            value={spotTitle}
            onChange={(e) => setSpotTitle(e.target.value)}
            type='text'
            placeholder='Name of your spot'
          />
        </div>

        <div className='price-container'>
          <h5>Set a base price for your spot</h5>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
            placeholder='Price per night (USD)'
          />
        </div>

        <div className='live-photos'>
          <h5>Liven up your spot with photos</h5>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
            type='text'
            placeholder='Preview Image URL'
          />
          {imageUrls.map((imageUrl, index) => (
            <input
              key={index}
              value={imageUrl}
              onChange={(e) => {
                const newImageUrls = [...imageUrls];
                newImageUrls[index] = e.target.value;
                setImageUrls(newImageUrls);
              }}
              type='text'
              placeholder='Image URL'
            />
          ))}
        </div>

        <div className='submit-button-container'>
          <button type='submit' className='submit-button'>
            Create a Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSpot;
