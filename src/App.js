import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/authentication/Login';
import SignUp from './Components/authentication/SignUp';
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';
import Offers from './Components/offers/Offers';
import RendezVous from './Components/rendezVous/RendezVous';
import AddOffer from './Components/addOffer/AddOffer';
import ModiffierOffer from './Components/modiffierOffer/ModiffierOffer';
function App() {
  const [user, setUser] = useState(null); // State to hold user data

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/offer" element={<Offers />} />
          <Route path="/rendezVous" element={<RendezVous />} />
          <Route path="/addOffer" element={<AddOffer />} />
          <Route path='/mod' element={<ModiffierOffer/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
