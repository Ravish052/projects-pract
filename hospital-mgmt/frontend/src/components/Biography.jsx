import React from 'react'

function Biography({imageUrl}) {
  return (
    <div className='container biography'>
      <div className="biography">
        <img src={imageUrl} alt="Biography" />
      </div>

      <div className="banner">
        <p>Biography</p>
        <h2>About MedCare Hospital</h2>
        <p>"MedCare Hospital has been a beacon of hope and healing for our community since its establishment in 1990. With a commitment to excellence in patient care, we have grown to become one of the leading healthcare providers in the region. Our state-of-the-art facilities, combined with a team of dedicated medical professionals, ensure that we deliver the highest quality of care to our patients. At MedCare, we believe in a holistic approach to health, focusing not only on treating illnesses but also on promoting overall wellness. Our mission is to provide compassionate, patient-centered care that meets the unique needs of each individual we serve. We are proud to be a trusted partner in health for our community and look forward to continuing our legacy of care for many years to come."</p>

        
      </div>

    </div>
  )
}

export default Biography