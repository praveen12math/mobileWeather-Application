import React, { useState } from "react";
import Api from "./Api";
import { Container, Card, CardBody, Row, Input, Button } from "reactstrap"
import { toast, ToastContainer } from "react-toastify"
import firebase from "firebase/app"
import "firebase/firestore"
import 'react-toastify/dist/ReactToastify.css'

const Hero = () => {

  const [appKey, setAppKey] = useState(null)
  const [firebaseError, setFirebaseError] = useState(true)

  var db = firebase.firestore()

  if (firebaseError) {

    db.collection("key")
      .doc("iicXTCOB4hg6z5A3dWWR")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Here is your api key - " + doc.data().apiKey);
          setAppKey(doc.data().apiKey)
        }
        else {
          console.log("No data found");
        }
      })
      .catch(function (error) {
        console.log(error.message);
      })
    setFirebaseError(false)
  }



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
  const [toastCheck, setToastCheck] = useState(true)
  const [locationKey, setLocationKey] = useState(null);


  async function fetchKey() {
    const api = `https://dataservice.accuweather.com/locations/v1/search?q=${city}&apikey=${appKey}`
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

  console.log(locationKey);
  console.log(appKey);

  return <>

    {locationKey ? <Api locationKey={locationKey} appKey={appKey} /> : <Container>
      <Card className="bg-transparent text-white mt-5" style={{ border: "3px solid grey", borderRadius: "1rem" }}>
        <CardBody>
          <h5 className="text-center mb-4">Weather Application</h5>
          <Row>

            <Input type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button className="mx-auto mt-3" color="primary"
              onClick={fetchKey}
            >See Condition</Button>
          </Row>
        </CardBody>
      </Card>
    </Container>}
    <h6 className="text-center text-white bg-dark fixed-bottom mb-0">This Application is developed by Praveen with <img src="logo192.png" alt="" className="developerIcon" /></h6>
    <ToastContainer position="bottom-right" />
    {toastCheck ? (
      toast("Enter city to see weather condition", { type: "warning" }),
      setToastCheck(false)
    ) : null}
  </>;
};

export default Hero;