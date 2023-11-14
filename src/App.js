import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home";
import Administration from "./pages/administration/Administration";
import BasicOrders from "./pages/basicOrders/BasicOrders";
import Reports from "./pages/reports/Reports";
import OtherOrders from "./pages/otherOrders/OtherOrders.jsx";
import WorkerDetail from "./pages/worker/WorkerDetail";
import Create from "./pages/create/Create";

import AuthProvider from "./components/auth/AuthContext.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";


function App() {

  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    const savedJwtToken  = localStorage.getItem('jwtToken');

    if(savedJwtToken) {
      setJwtToken(savedJwtToken);
    }
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>  
            <Route path="/login" element={<Login />}></Route>

            <Route path="/" element={<PrivateRoute component={Home} />}></Route>
            {/* <Route index element={<Navigate to="/login" />}></Route> */}

            <Route path="/:id" element={<WorkerDetail />}></Route>

            <Route path="/create" element={<Create />}></Route>

            <Route path="/administration" element={<Administration />} />
            <Route path="/basic-orders" element={<BasicOrders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/other-orders" element={<OtherOrders />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
