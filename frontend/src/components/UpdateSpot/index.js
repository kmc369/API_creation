import React, { useState,useEffect } from 'react';
import * as CreateActions from '../../store/createspot'
import * as SpotImage from '../../store/spotImage'
import { useDispatch , useSelector} from 'react-redux';
import {useParams } from 'react-router-dom'
import './UpdateForm.css';

function UpdateSpot() {
    const formData = useSelector(state=>state.create.spots)
    console.log(formData)
    const imgData = useSelector(state=>state.spotImage.image)
// console.log("image data is ",imgData)

    
    const {spotId} = useParams()
    // console.log("the array is ", Array)
    const spotsArray = formData[0].Spots;

    const spotInformation = spotsArray.find(spot => spot.id === Number(spotId));

    console.log("The spot information is", spotInformation);


    const [country, setCountry] = useState(spotInformation.country);
    const [state, setState] = useState(spotInformation.state);
    const [city, setCity] = useState(spotInformation.city);
    const [address, setAddress] = useState(spotInformation.address);
    const [latitude, setLatitude] = useState(1234);
    const [longitude, setLongitude] = useState(345632);
    const [description, setDescription] = useState(spotInformation.description);
    const [spotTitle, setSpotTitle] = useState(spotInformation.name);
    const [price, setPrice] = useState(spotInformation.price);
    const [previewImageUrl, setPreviewImageUrl] = useState(spotInformation.previewImage);
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [preview, setPreview] = useState(false)
    
    const dispatch = useDispatch()
    
    console.log(FormData)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  }



 


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
            onChange={(e)=>setLatitude(e.target.value)}
          />
          <input
            type='number'
            placeholder='Longitude'
            value={longitude}
            onChange={(e)=>setLongitude(e.target.value)}
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

            <input
           
              value={image1}
              onChange={(e) => {setImage1(e.target.value)}}
              type='text'
              placeholder='Image URL'
            />
          <input
           
           value={image2}
           onChange={(e) => {setImage2(e.target.value)}}
           type='text'
           placeholder='Image URL'
         />
          <input
           
           value={image3}
           onChange={(e) => {setImage3(e.target.value)}}
           type='text'
           placeholder='Image URL'
         />
          <input
           
           value={image4}
           onChange={(e) => {setImage4(e.target.value)}}
           type='text'
           placeholder='Image URL'
         />
        
        </div>

        <div className='submit-button-container'>
          <button type='submit' className='submit-button'>
            Update spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSpot;
