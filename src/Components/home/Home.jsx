import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../sideBar/SideBar';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import axios from 'axios';
import ajouter from '../../assets/ajouter.png'
import { Button } from 'react-bootstrap';

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [offers, setOffers] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const navig = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get/offer');
        const allOffers = response.data;
        console.log('Fetched offers:', allOffers); 
        setOffers(allOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className='cc'>
      <img src={menu} alt='menu' className='menu' onClick={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <img src={logo} alt="logo" className="logo" />
      <div onClick={()=>{navig('/addOffer')}} style={{top:"-640px",
      left:'570px',position:"relative",cursor:'pointer'}}>
  <p>Ajouter offre <img src={ajouter} alt="..." style={{
      height:"30px",
      width:"30px",
   

      }}  /> </p>
      </div>
    
      <div className="container mt-4">
        <div className="row" style={{position:"relative", top:"-570px"}}>
          {offers.map((ele) => (
            <div className="col-md-6 mb-4" key={ele.id}>
              <div className="card h-100">
                <img src={ele.image} alt='Offer' className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{ele.description}</h5>
                  <p className="card-text">Price: {ele.prix}</p>
                  <p className="card-text">Type: {ele.type}</p>
                  <Button
                    variant={ele.disponibilite === 'Disponible' ? 'success' : 'danger'}
                  >
                    {ele.disponibilite}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
