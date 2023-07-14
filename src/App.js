import { Home } from './Pages/Home';
import {Login} from './Pages/Login';
import {Route,Routes,BrowserRouter} from "react-router-dom";
import { Register } from './Pages/Register';
import { MapLocation } from './Pages/MapLocation';
import { RentPage } from './Pages/RentPage';
import { ParkingPage } from './Pages/ParkingPage';
import {ActivateUser} from "./Pages/ActivateUser";
import { MainUserPage } from './Pages/MainUserPage';
import { ConfigUser } from './Pages/ConfigUser';
import { AddParkingsUser } from './Pages/AddParkingsUser';
import { ParkingsOfUserPage } from './Pages/ParkingsOfUserPage';
import { CorrectPayment } from './Pages/CorrectPayment';
import { BookingParkingPage } from './Pages/BookingParkingPage';
import { FaqsPage } from './Pages/FaqsPage';
import { AddFirstVehicle } from './Pages/AddFirstVehicle';
import "./Stylesheets/Scrollbar.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>   {/*  HOME */}
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/map-location' element={<MapLocation/>}></Route>
          <Route path='/rent-page' element={<RentPage/>}></Route>
          <Route path='/parking' element={<ParkingPage/>}></Route>
          <Route path='/activate-user' element={<ActivateUser/>}></Route>
          <Route path='/user-page' element={<MainUserPage/>}></Route>
          <Route path='/user-config' element={<ConfigUser/>}></Route>
          <Route path='/add-parking' element={<AddParkingsUser/>}></Route>
          <Route path='/my-parkings' element={<ParkingsOfUserPage/>}></Route>
          <Route path='/correct-payment' element={<CorrectPayment/>}></Route>
          <Route path='/booked-map-page' element={<BookingParkingPage/>}></Route>
          <Route path='/faqs' element={<FaqsPage/>}></Route>
          <Route path='/add-first-vehicle' element={<AddFirstVehicle/>}></Route>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
