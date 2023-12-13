import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import TopBar from "../../components/TopBar";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [userName, setUserName] = useState("");
  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Date.now() / 1000;
  }

  useEffect(() => {
    if (cookies.token) {
      if (isTokenExpired(cookies.token)) {
        navigate("/signIn");
      } else {
        setUserName(jwtDecode(cookies.token).name);
      }
    } else {
      console.log("No Token in Cookies");
      navigate("/signIn");
    }
  }, [cookies.token, navigate]);

  return (
    <>
      <div className="dashboard">
        <TopBar userEmail={userName} />
        <Container fluid>
          <h4>Welcome to User Authentication system</h4>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
