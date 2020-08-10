import React, { useState } from "react";
import Api from "./Api";
import { Container, Card, CardBody, Row, Input, Button } from "reactstrap"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Hero = () => {


  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // }
  // function showPosition(position) {
  //   mylat = position.coords.latitude;
  //   mylong = position.coords.longitude;
  //   locationError = false
  // }

  //function showPosition(position) {
  // var coor = position.coords.longitude + ", " + position.coords.latitude;
  // alert(coor);
  //   mylat = position.coords.latitude;
  //   mylong = position.coords.longitude;
  //   locationError = false
  // }
  // function errorPosition(error) {
  //   alert(error);
  // }

  // navigator.geolocation.watchPosition(showPosition, errorPosition);
  const [city, setCity] = useState(null)

  const [locationKey, setLocationKey] = useState(null);


  async function fetchKey() {
    const api = `https://dataservice.accuweather.com/locations/v1/search?q=${city}&apikey=HEyv47OKN1XjX5HvQG4uft5GFGxGcHxQ`
    const result = await fetch(api)
    const getResult = await result.json()
    console.log(getResult[0].Key);
    setLocationKey(getResult)
  }

  // const fetchKey = async () => {
  //   const { data } = await Axios.get(
  //     `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${mylat},${mylong}&apikey=nQCSgg5V6ne7o3cT2U1TfH2OAY91xaUA`
  //   );
  //   setLocationKey(data);
  // };

  console.log(locationKey);

  return <>

    {locationKey ? <Api locationKey={locationKey} /> : <Container>
      <Card className="bg-transparent text-white mt-5" style={{ border: "3px solid grey", borderRadius: "1rem" }}>
        <CardBody>
          <h5 className="text-center mb-4">Weather Application</h5>
          <Row>

            <Input type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button className="mx-auto mt-3" color="primary" style={{ width: "15%" }}
              onClick={fetchKey}
            >See Condition</Button>
          </Row>
        </CardBody>
      </Card>
    </Container>}
    <h6 className="text-center text-white bg-dark fixed-bottom mb-0">This Application is developed by Praveen with <img src="logo192.png" alt="" className="developerIcon" /></h6>
    <ToastContainer position="bottom-right" />
    {toast("Enter city to see weather condition", { type: "warning" })}
  </>;
};

export default Hero;