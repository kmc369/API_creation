import React from 'react'
import './Createspot.css'
 function CreateSpot () {
  return (
    <div className='container'>
     
    <form className='form-container'>

       <div className='location'> 
            <h3>Create a New Spot</h3>
            <h5>Where's your place located?</h5>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <input type="text" placeholder='Country'></input>
            <input type="text" placeholder='address'></input>
            <div className='city-state-container'>
                <input  type="text" placeholder='City'></input>
                <input type="text" placeholder='State'></input>
            </div>

            <div className='long-lat-container'>
                <input type='number' placeholder='latitude'></input>
                <input type='number' placeholder='longitude'></input>
            </div>
        </div>

            <div className='describe'>
                <h5>Describe your place to guests</h5>
                <p className='secondP'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea  className='textarea-text' type="textarea"></textarea>
            </div>

        <div class="create-container">
           <h5>Create a title for your spot</h5>
           <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
           <input type='text' placeholder='Name of your spot'></input>
        </div>

        <div className='price-container'>
           <h5>Set a base price for your spot</h5>
           <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
           <input type='number' placeholder='Price per night (USD)'></input>
        </div>

        <div className='live-Photos'>
           <h5>Liven up your spot with photos</h5>
           <p>Submit a link to at least one photo to publish your spot.</p>
           <input type='number' placeholder='Price per night (USD)'></input>
        </div>
     
    </form>
      
      
      
    </div>
  )
}

export default CreateSpot
