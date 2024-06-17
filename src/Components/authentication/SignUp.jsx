import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './SignUp.css';
import logo from '../../assets/logo.png';

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [num, setNum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [validationError, setValidationError] = useState('');

  const showAlert = (title, text) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  };

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !role || !num || !confirmPassword) {
      setValidationError('All fields are required.');
      showAlert('Validation Error', 'All fields are required.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordRegex)) {
      setPasswordError(
        'Password must contain at least 8 characters, including at least one digit, one lowercase letter, and one uppercase letter.'
      );
      showAlert('Validation Error', 'Password must contain at least 8 characters, including at least one digit, one lowercase letter, and one uppercase letter.');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      showAlert('Validation Error', 'Passwords do not match.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const register = () => {
    console.log('Register button clicked');  // Confirm click handler is triggered

    if (!validateInputs() || !validatePassword()) {
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      role,
      num,
      password,
    };

    console.log('Sending data:', data);  // Check the data being sent

    axios
      .post('http://localhost:4000/authentication/signup', data)
      .then((response) => {
        console.log('Response data:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'User Registered',
          text: 'Congratulations! You have successfully registered.',
        });
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.error || 'An error occurred during registration.',
          });
        } else if (error.request) {
          console.error('No response received:', error.request);
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'No response received from server.',
          });
        } else {
          console.error('Error setting up request:', error.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error setting up request.',
          });
        }
      });
      
  };

  return (
    <div className='cho'>
      <img onClick={() => navigate('/')} src={logo} alt="logo" className='loulou' />
      <p className='test'>PERSONAL INFORMATIONS</p>
      <div style={{ left: "40px", position: "relative", bottom: "780px" }}>
        <input 
          type="text" 
          placeholder="FirstName" 
          className="fN-input" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="LastName" 
          className="lN-input" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="logi-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Role" 
          className="role-input" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Numéro" 
          className="num-input" 
          value={num} 
          onChange={(e) => setNum(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="passi-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="pas-input" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <br />
        {validationError && <div style={{ color: 'red', marginLeft: 40 }}>{validationError}</div>}
        {passwordError && <div style={{ color: 'red', marginLeft: 40 }}>{passwordError}</div>}
        <button onClick={register} className='regreg'>Register Now</button>
      </div>
    </div>
  );
}
