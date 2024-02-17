import React, { useState } from 'react';
import axios from 'axios';
import './Integration.css'
const ApiIntegrationComponent = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phoneNumber: '',
    lastName: '',
    acceptNewsLetter: false,
  });

  const [signupResponse, setSignupResponse] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const signUp = async () => {
    try {
      const response = await axios.post('https://dev.dalmaf.com/dalmaf/emailIdVerification', userDetails);
      console.log('Sign-up Response:', response);
      setSignupResponse(response.data);
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };
  

  const getPackageDetails = async () => {
    try {
      const response = await axios.get('https://dev.dalmaf.com/dalmaf/findPackageDetails?customPackage=Auto');

      setPackageDetails(response.data);
    } catch (error) {
      console.error('Fetch package details error:', error);
    }
  };

  return (
    <div>
      <h2>Sign-up Integration</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={userDetails.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={userDetails.password} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={userDetails.phoneNumber} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={userDetails.lastName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Accept Newsletter:
          <input type="checkbox" name="acceptNewsLetter" checked={userDetails.acceptNewsLetter} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={signUp}>
          Sign Up
        </button>
      </form>

      {signupResponse && (
        <div>
          <h3>Sign-up Response:</h3>
          <pre>{JSON.stringify(signupResponse, null, 2)}</pre>
        </div>
      )}

      <h2>Listing Integration</h2>
      <button onClick={getPackageDetails}>Get Package Details</button>
      {packageDetails && (
        <div>
          <h3>Package Details:</h3>
          <pre>{JSON.stringify(packageDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiIntegrationComponent;
