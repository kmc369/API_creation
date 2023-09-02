import React, { useState,useEffect } from 'react';
import * as SpotActions from '../../store/spot'
import { useDispatch , useSelector} from 'react-redux';
import {useParams } from 'react-router-dom'
import './UpdateForm.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function UpdateSpot() {
    
    const spotDetail = useSelector(state=>state.spots.spotDetails)
    
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()


    
    
 
    
    
    
    const [errors, setErrors] = useState({});

    const [country, setCountry] = useState(spotDetail.country);
    const [state, setState] = useState(spotDetail.state);
    const [city, setCity] = useState(spotDetail.city);
    const [address, setAddress] = useState(spotDetail.address);
    const [latitude, setLatitude] = useState(1234);
    const [longitude, setLongitude] = useState(345632);
    const [description, setDescription] = useState(spotDetail.description);
    const [spotTitle, setSpotTitle] = useState(spotDetail.name);
    const [price, setPrice] = useState(spotDetail.price);
    const [previewImageUrl, setPreviewImageUrl] = useState(spotDetail.SpotImages[0].url);
    const [image1, setImage1] = useState(spotDetail.SpotImages[1]?.url || '')
    const [image2, setImage2] = useState(spotDetail.SpotImages[2]?.url || '')
    const [image3, setImage3] = useState(spotDetail.SpotImages[3]?.url || '')
    const [image4, setImage4] = useState(spotDetail.SpotImages[4]?.url || '')
    const [preview, setPreview] = useState(false)
    
 

  

 

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
      spotTitle,
      price,
    };
    const updatedSpot = await dispatch(SpotActions.updateSpotThunk(formData,spotId))



    const imgObj ={
      url:previewImageUrl,
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
    
    
    // const createSpotResponse = await dispatch(SpotActions.createSpotThunk(formData));
    
   
    
   
    
    if (imgObj.url) {
      await dispatch(SpotActions.postSpotImageThunk(updatedSpot.id, imgObj));
    }

//     if(image1){
//        await dispatch(SpotActions.postSpotImageThunk(updatedSpot.id,img1))
//     }

//     if(image2){
//         await dispatch(SpotActions.postSpotImageThunk(updatedSpot.id,img2))
//      }

//      if(image3){
//        await dispatch(SpotActions.postSpotImageThunk(updatedSpot.id,img3))
//    }

//    if(image4){
//     await dispatch(SpotActions.postSpotImageThunk(updatedSpot.id,img4))
//  }
    

   
    setCountry('');
    setState('');
    setCity('');
    setAddress('');
    setLatitude(0);
    setLongitude(0);
    setDescription('');
    setSpotTitle('');
    setPrice(0);
    setPreviewImageUrl('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');

    history.push(`/spots/${spotId}`)

  
  }
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
          <h3>Update Your Spot</h3>
          <h5>Where's your place located</h5>
          <p>Guests will only get your exact address once they book a reservation.</p>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            type='text'
            placeholder="Country"
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
            type='url'
            placeholder='Preview '
          />

            <input
           
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              type='text'
              placeholder='Image url'
            />
          <input
           
           value={image2 }
           onChange={(e) => setImage2(e.target.value)}
           type='text'
           placeholder='Image url'

         />
          <input
           
           value={image3 }
           onChange={(e) => setImage3(e.target.value)}
           type='text'
           placeholder='Image url'

         />
          <input
           
           value={image4}
           onChange={(e) => setImage4(e.target.value)}
           type='text'
           placeholder='Image url'

         />
        
        </div>

        <div className='submit-button-container'>
          <button type='submit' className='submit-button'>
            Update Your Spot
          </button>
        </div>
      </form>
    </div>
  
  );
}

export default UpdateSpot;
