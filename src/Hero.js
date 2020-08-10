import React, { useState, useEffect } from "react";
import Api from "./Api";
import { Container, Card, CardBody, Row, Col } from "reactstrap"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Hero = () => {
  var mylong = "",
    mylat = "",
    locationError = true;

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // }
  // function showPosition(position) {
  //   mylat = position.coords.latitude;
  //   mylong = position.coords.longitude;
  //   locationError = false
  // }

  function showPosition(position) {
    // var coor = position.coords.longitude + ", " + position.coords.latitude;
    // alert(coor);
    mylat = position.coords.latitude;
    mylong = position.coords.longitude;
    locationError = false
  }
  function errorPosition(error) {
    alert(error);
  }

  navigator.geolocation.watchPosition(showPosition, errorPosition);

  const [locationKey, setLocationKey] = useState(null);


  useEffect(() => {

    async function fetchKey() {
      const api = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${mylat},${mylong}&apikey=kAUVOMxAoBnjFcjYeis0shOiulKGGznD`
      const result = await fetch(api)
      const getResult = await result.json()
      setLocationKey(getResult)
    }

    // const fetchKey = async () => {
    //   const { data } = await Axios.get(
    //     `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${mylat},${mylong}&apikey=nQCSgg5V6ne7o3cT2U1TfH2OAY91xaUA`
    //   );
    //   setLocationKey(data);
    // };

    fetchKey();
  }, [mylat, mylong]);

  console.log(locationKey);

  return <>
    <ToastContainer position="bottom-right" />
    {locationKey ? <Api locationKey={locationKey} /> : <Container>
      <Card className="bg-transparent text-white mt-5" style={{ border: "3px solid grey", borderRadius: "1rem" }}>
        <CardBody>
          <Row>

            <Col lg="7" sm="12">
              <h1> -- ° C</h1> <br />
              <h1>Something Error</h1>
            </Col>

            <Col lg="5" sm="12">
              {<img src="unknown.png" alt="" />}
              <h2> -- </h2>
            </Col>

          </Row>
          {locationError ? toast("Allow location access to see Weather Condition", { type: "warning" }) : null}
        </CardBody>
      </Card>
    </Container>}
    <h5 className="text-center text-white bg-dark">This Application is developed by Praveen in <img src="logo192.png" alt="" className="developerIcon" /></h5>
  </>;
};

export default Hero;
