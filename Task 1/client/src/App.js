import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRouter from "./helper/ProtectedRouter";

function App() {
  return (
    <>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          } />
          <Route path="/*" element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/register" element={
            <Register />
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
