import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './AddOffer.css';
import SideBar from '../../sideBar/SideBar';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AddOffer() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [disponibilite, setDisponibilite] = useState('');
  const [validationError, setValidationError] = useState('');

  const showAlert = (title, text) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  };

  const validateInputs = () => {
    if (!description || !prix || !type || !image || !disponibilite) {
      setValidationError('All fields are required.');
      showAlert('Validation Error', 'All fields are required.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const addOffer = () => {
    console.log('Add Offer button clicked');

    if (!validateInputs()) {
      return;
    }

    const data = {
      description,
      prix,
      type,
      image,
      disponibilite,
    };

    console.log('Sending data:', data);

    axios
      .post('http://localhost:4000/add/offers', data)
      .then((response) => {
        console.log('Response data:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Offer Added',
          text: 'The offer has been added successfully.',
        });
        navigate('/home');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.error || 'An error occurred during the addition of the offer.',
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

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='cc'>
      <img src={menu} alt='menu' className='menu' onClick={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <img src={logo} alt="logo" className="logo" />
      <div className='cho'>
        <img onClick={() => navigate('/home')} src={logo} alt="logo" className='loulou' />
        <p className='test'>AJOUTER UN OFFRE</p>
        <div style={{ left: "40px", position: "relative", top: "-1500px" }}>
          <input 
            type="text" 
            placeholder="Description" 
            className="fN-input" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Prix" 
            className="lN-input" 
            value={prix} 
            onChange={(e) => setPrix(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Type" 
            className="logi-input" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Adresse de l'image" 
            className="role-input" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Disponibilité" 
            className="num-input" 
            value={disponibilite} 
            onChange={(e) => setDisponibilite(e.target.value)} 
          />
          <button onClick={addOffer} className='regreg1'>Ajouter Offre</button>
        </div>
      </div>
    </div>
  );
}
