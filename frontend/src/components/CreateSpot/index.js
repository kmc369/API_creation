import React, { useState,useEffect } from 'react';
import * as SpotActions from '../../store/spot'
import { useDispatch , useSelector} from 'react-redux';
import {useParams } from 'react-router-dom'
import './Createspot.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function CreateSpot() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(1234.0);
  const [longitude, setLongitude] = useState(1586.0);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImageUrl] = useState('');
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [preview, setPreview] = useState(true)
  const history = useHistory()
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const [errors, setErrors] = useState({});


 


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      country,
      state,
      city,
      address,
      latitude,
      longitude,
      description,
      name,
      price,
    
      
    };


    
   
   

    const imgObj ={
      url:previewImage,
      preview:true
    }

    const img1 ={
      url:image1,
      preview:false
    }

    const img2 ={
      url:image2,
      preview:false
    }

    const img3 ={
      url:image3,
      preview:false
    }

    const img4 ={
      url:image4,
      preview:false
    }
    
    
    const createSpotResponse = await dispatch(SpotActions.createSpotThunk(formData));
    const createdSpotId = createSpotResponse.id;
    
   
    
    if (imgObj.url) {
      dispatch(SpotActions.postSpotImageThunk(createdSpotId, imgObj));
    }

    if(image1){
       dispatch(SpotActions.postSpotImageThunk(createdSpotId,img1))
    }

    if(image2){
        dispatch(SpotActions.postSpotImageThunk(createdSpotId,img2))
     }

     if(image3){
      dispatch(SpotActions.postSpotImageThunk(createdSpotId,img3))
   }

   if(image4){
    dispatch(SpotActions.postSpotImageThunk(createdSpotId,img4))
 }
    
    
    
    
    
    
    
    setCountry('');
    setState('');
    setCity('');
    setAddress('');
    setLatitude(0);
    setLongitude(0);
    setDescription('');
    setName('');
    setPrice(0);
    setPreviewImageUrl('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');

    history.push(`/spots/${createdSpotId}`)
  };

  useEffect(()=>{
    const error = {}
    
    if (country.length<2 || country===" " ) {
      error.country = "COUNTRY BE GREATER THAN 2 CHARACTERS";
  }

   
  if (address.length<3 || address===" " ) {
    error.address = "ADDRESS BE GREATER THAN 10 CHARACTERS";
}


   if (city.length<3 || city===" " ) {
    error.address = "MUST BE GREATER THAN 10 CHARACTERS";
}


  

   if(description.length<30){
    error.description="MUST BE 30 CHARACTERS OR MORE"
   }
   setErrors(error)


  },[country,city,state,description])



 


  return (
    <div className='container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='location-container'>
          <h3 className='headers'>Create a New Spot</h3>
          <h4 className='headers'>Where's your place located?</h4>
          <p>Guests will only get your exact address once they book a reservation.</p>
          <label for="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            type='text'
            placeholder='Country'
            name='country'
          
          />
          {/* <p className='error'>{errors.country}</p> */}
          <label for="address">Street Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            type='text'
            placeholder='Address'
            name='Address'

            
          />
          {/* <p className='error'>{errors.address}</p> */}

      <div className='city-state-container'>
        <div className='input-group'>
        <label className='city'>City</label>
        <input
          className='city-input'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          type='text'
          placeholder='City'
          name='city'
        />
  </div>
  <div className='input-group'>
    <label className='state'>State</label>
    <input
      className='state-input'
      value={state}
      onChange={(e) => setState(e.target.value)}
      required
      type='text'
      placeholder='State'
      name='state'
    />
  </div>
</div>
       {/*} </div>

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
            placeholder='Please write at least 30 characters"'
           
          >

          </textarea> */}
          {/* <p className='error'>{errors.description}</p> */}

        {/* </div>

        <div className='create-container'>
          <h5>Create a title for your spot</h5>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            min={0}
          />
        </div>
        

        <div className='live-photos'>
          <h5>Liven up your spot with photos</h5>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
            value={previewImage}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
            type='url'
            placeholder='Preview Image URL'
          />

            <input
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              type='url'
              placeholder='Image URL'
              />
           
          <input
           
           value={image2}
           onChange={(e) => setImage2(e.target.value)}
           type='url'
           placeholder='Image URL'
         />
          <input
           
           value={image3}
           onChange={(e) => setImage3(e.target.value)}
           type='url'
           placeholder='Image URL'
         />
          <input
           
           value={image4}
           onChange={(e) => setImage4(e.target.value)}
           type='url'
           placeholder='Image URL'
         />
        
        </div>

        <div className='submit-button-container'>
          <button type='submit' 
          className={`submit-button ${Object.keys(errors).length > 0 ? "disabled-button" : "enabled-button"}`}
          style={{ backgroundColor: Object.keys(errors).length > 0 ? 'rgb(187, 186, 186)' : 'rgb(0, 123, 255)' }}

          disabled={Object.keys(errors).length>0}
          
          >
            Create a Spot
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default CreateSpot;
