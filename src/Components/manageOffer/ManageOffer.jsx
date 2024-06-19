import React, { useState } from 'react';
import './manageOffer.css';
import SideBar from '../../sideBar/SideBar';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import aouina from '../../assets/aouina.jpg';
import kef from '../../assets/kef.jpg';
import benzart from '../../assets/benzart.jpg';
import { FaPlus } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importing Bootstrap Icons

export default function ManageOffer() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [sortByOldest, setSortByOldest] = useState(false); // State for sorting order

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const navigateToHome = () => {
        // Replace with your navigation logic
        console.log('Navigate to home');
    };

    const handleSortToggle = () => {
        setSortByOldest(!sortByOldest); // Toggle sorting order
    };

    // Example function to fetch and count offers
    const fetchAndCountOffers = () => {
        // Replace with your logic to fetch and count offers
        const offers = []; // Example array of offers
        setOfferCount(offers.length); // Update offer count
    };
      const handleEdit = () => {
        // Logic for editing an offer
        console.log('Edit offer');
    };

    const handleDelete = () => {
        // Logic for deleting an offer
        console.log('Delete offer');
    };
    const photos = [
        { src: benzart, alt: 'Photo 1' },
        { src: kef, alt: 'Photo 2' },
        { src: aouina, alt: 'Photo 3' },
        // Add more photos as needed
    ];  

    return (
        <div className='globe'>
            <img src={menu} alt='menu' className='menu' onClick={toggleSidebar} />
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="button-container">
                <button className="button-left" onClick={navigateToHome}>
                    <FaPlus className="icon" /> Add Offer
                </button>
                <div className="filters">
                    <button className="filter-button" onClick={handleSortToggle}>
                        {sortByOldest ? 'Sort: Oldest First' : 'Sort: Latest First'}
                    </button>
                </div>
            </div>
            <h1 className='title'>Offers List</h1>
            <div className="offer-boxes">
                {/* Replace with your offer boxes */}
                <div className="offer-box">
                    
                        <Carousel showArrows={true} showThumbs={false} showIndicators={false}>
                            {photos.map((photo, index) => (
                                <div key={index}>
                                    <img src={photo.src} alt={photo.alt} />
                                </div>
                            ))}
                        </Carousel>
                    
                    <div className="offer-details">
                        {/* Details of the offer */}
                        <div className='offre-desc'>
                           <h3>La Marsa</h3>
                           <p>Maison s+3 a la marsa plage, 5min ala gare de metro ..... </p>
                        </div>
                        <div className='button-group'>
                            <button className='edit-button' onClick={handleEdit}>
                            <i className="bi bi-pencil-square icon"></i>
                            </button>
                            <button  className="delete-button" onClick={handleDelete}>
                            <i className="bi bi-trash icon"></i> 
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className="offer-box">
                    {/* Example content for offer box */}
                    <div className="carousel-container">
                        <h3>Offer 2</h3>
                        <p>House for Rent</p>
                    </div>
                </div>
                <div className="offer-box">
                    {/* Example content for offer box */}
                    <div className="carousel-container">
                        <h3>Offer 3</h3>
                        <p>House for Sale</p>
                    </div>
                </div>
            </div>
            <img src={logo} alt="logo" className="logo" onClick={navigateToHome} />
        </div>
    );
}
