import React, { useState, useEffect } from 'react';
import './Offers.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../sideBar/SideBar';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import supp from '../../assets/supp.png';
import Swal from 'sweetalert2';
import mod from '../../assets/mod.png';

export default function Offers() {
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
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this offer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/supp/suppOffer/${id}`)
          .then(() => {
            setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== id));
            Swal.fire(
              'Deleted!',
              'The offer has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting offer:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the offer.',
              'error'
            );
          });
      }
    });
  };

  const handleEdit = (offer) => {
    navig('/mod', { state: { offer } });
  };

  return (
    <div className='cc'>
      <img src={menu} alt='menu' className='menu' onClick={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <img src={logo} alt="logo" className="logo"  onClick={() => { navig('/home') }} />
      <div className="container mt-4">
        <div className="row" style={{ position: "relative", top: "-570px" }}>
          {offers.map((ele) => (
            <div className="col-md-6 mb-4" key={ele._id}>
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
                  <img 
                    src={supp} 
                    alt="Delete" 
                    style={{ width: "30px", height: "30px", cursor: "pointer", position: "relative", left: "355px" }}
                    onClick={() => handleDelete(ele._id)} 
                  />
                  <img src={mod} alt="Edit" style={{width:"30px",height:"30px",
                    cursor:"pointer",
                    left:"270px",
                    position:"relative"}}  onClick={() => handleEdit(ele)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
