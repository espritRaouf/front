import React from 'react'
import './ModiffierOffer.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import SideBar from '../../sideBar/SideBar';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import { useState } from 'react';
export default function ModiffierOffer() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [offers, setOffers] = useState([]);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
    const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state;

  const [description, setDescription] = useState(offer.description);
  const [prix, setPrix] = useState(offer.prix);
  const [type, setType] = useState(offer.type);
  const [disponibilite, setDisponibilite] = useState(offer.disponibilite);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOffer = {
      description,
      prix,
      type,
      disponibilite,
    };

    axios
      .put(`http://localhost:4000/update/offer/${offer._id}`, updatedOffer)
      .then(() => {
        navigate('/offers');
      })
      .catch((error) => {
        console.error('Error updating offer:', error);
      });
  };

   
  return (
    <div className='cc'>
         <img src={menu} alt='menu' className='menu' onClick={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <img src={logo} alt="logo" className="logo" onClick={()=>{navigate('/home')}} />    
      <div className="container mt-4" style={{position:"relative", top:"-520px"}}>
      <h2>Modifier Offre</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Availability </Form.Label> 
          <Form.Select
          style={{position:"relative", left:'20px'}}
            value={disponibilite}
            onChange={(e) => setDisponibilite(e.target.value)}
          >
            <option value="Disponible">Disponible</option>
            <option value="Indisponible">Indisponible</option>
          </Form.Select>
        </Form.Group>
        <Button variant="success" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>  
    </div>
  )
}
