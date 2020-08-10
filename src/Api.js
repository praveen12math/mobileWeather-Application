import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Row, Col, CardTitle } from "reactstrap";
import { FaCaretDown, FaCaretUp, FaMapMarkerAlt } from "react-icons/fa"
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const Api = ({ locationKey }) => {
  const [myDetail, setMyDetail] = useState([])
  const [fiveDayFore, setFiveDayFore] = useState([])
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [weekDay] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

  useEffect(() => {

    async function getData() {
      const api = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey[0].Key}?apikey=HEyv47OKN1XjX5HvQG4uft5GFGxGcHxQ&details=true`;
      const result = await fetch(api)
      const getResult = await result.json()
      setMyDetail(getResult[0])
    }

    async function fiveDay() {
      const api = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey[0].Key}?apikey=HEyv47OKN1XjX5HvQG4uft5GFGxGcHxQ&details=true&metric=true`
      const result = await fetch(api)
      const getResult = await result.json()
      setFiveDayFore(getResult.DailyForecasts)
      console.log(getResult.DailyForecasts[0].Date);
      setMin(getResult.DailyForecasts[0].Temperature.Minimum.Value)
      setMax(getResult.DailyForecasts[0].Temperature.Maximum.Value)
    }

    getData();
    fiveDay()
  }, [locationKey])



  var b = "", c = "", d = "", e = "", a1, a2, b1, b2, c1, c2, d1, d2, e1, e2;
  if (fiveDayFore) {
    a1 = new Date(fiveDayFore[0]?.Sun.Rise)
    a2 = new Date(fiveDayFore[0]?.Sun.Set)
    b = new Date(fiveDayFore[1]?.Date)
    b1 = new Date(fiveDayFore[1]?.Sun.Rise)
    b2 = new Date(fiveDayFore[1]?.Sun.Set)
    c = new Date(fiveDayFore[2]?.Date)
    c1 = new Date(fiveDayFore[2]?.Sun.Rise)
    c2 = new Date(fiveDayFore[2]?.Sun.Set)
    d = new Date(fiveDayFore[3]?.Date)
    d1 = new Date(fiveDayFore[2]?.Sun.Rise)
    d2 = new Date(fiveDayFore[2]?.Sun.Set)
    e = new Date(fiveDayFore[4]?.Date)
    e1 = new Date(fiveDayFore[2]?.Sun.Rise)
    e2 = new Date(fiveDayFore[2]?.Sun.Set)
  }


  return (
    <>
      <Container>
        <h3 className="text-white text-center mt-3">
          <FaMapMarkerAlt /> &nbsp;
          {locationKey[0].SupplementalAdminAreas[0]?.EnglishName} &nbsp;
          {locationKey[0].AdministrativeArea.EnglishName} &nbsp;
          {locationKey[0].Country.EnglishName} &nbsp;
          {((Date(Date.now())).toString()).slice(0, 24)}
        </h3>
        <Card className="bg-transparent text-white mt-3" style={{ border: "3px solid grey", borderRadius: "1rem" }}>
          <CardBody>
            <Row>
              <Col lg="4" sm="12">
                <h1>{Math.round(myDetail.Temperature?.Metric.Value)}° C</h1>
                <h3>Feel Like {myDetail.RealFeelTemperature?.Metric.Value}° C</h3>
                <h3>Humidity {myDetail.RelativeHumidity} %</h3>
              </Col>
              <Col lg="5" sm="12" style={{ textAlign: "center" }}>
                <h3 className="mt-3">
                  {a1.toLocaleTimeString()}&nbsp;
                  <img src="icons8-sunrise-100.png" alt="" style={{ width: "15%" }} /> <br />
                  {a2.toLocaleTimeString()}&nbsp;
                  <img src="icons8-sunset-100.png" alt="" style={{ width: "15%" }} /> <br />
                  Rain: {fiveDayFore[0]?.Day.RainProbability}% &nbsp;
                       Snow: {fiveDayFore[0]?.Day.SnowProbability}%
                </h3>
              </Col>
              <Col lg="3" sm="12" className="iconStyle">
                {myDetail.WeatherIcon ? <img src={myDetail.WeatherIcon + ".png"} style={{ width: "60%" }} alt="" className="mx-auto d-block" /> : <img src="unknown.png" alt="" />}
                <h2>{myDetail.WeatherText}</h2>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <h3 className="text-white mt-3">
          <Row>
            <Col lg="4" sm="12" className="mt-2">
              Wind : &nbsp; {myDetail.Wind?.Direction.Localized} {myDetail.Wind?.Speed.Metric.Value} km/h </Col>
            <Col lg="4" sm="12" className="mt-2"> Min Temp : {Math.round(min)}° C
              </Col>
            <Col lg="4" sm="12" className="mt-2"> Max Temp : {Math.round(max)}° C
              </Col>
          </Row>
        </h3>
      </Container>

      <Row className="dailyFore">
        <Col lg="3" sm="12" className="mb-4">
          <Card className="text-center h-100" style={{ borderRadius: "1rem" }}>
            <CardBody>
              <CardTitle>
                <h5>
                  {(weekDay[b.getDay()])}
                </h5>
              </CardTitle>
              <h6>
                <FaCaretDown /> Min: {Math.round(fiveDayFore[1]?.Temperature.Minimum.Value)}° C  &nbsp;&nbsp;&nbsp; <FaCaretUp /> Max {Math.round(fiveDayFore[1]?.Temperature.Maximum.Value)}° C <br /><br />
                {b1.toLocaleTimeString()} <img src="wi-sunrise.svg" alt="" style={{ width: "10%" }} />
              </h6>
            </CardBody>
            <span> <img src={fiveDayFore[1]?.Day.Icon + ".png"} style={{ width: "50%" }} alt="" />
              <img src={fiveDayFore[1]?.Night.Icon + ".png"} style={{ width: "50%" }} alt="" />
            </span>

            <Row>
              <Col>
                <h6 className="dayCard">
                  <b>Day</b> <br />
                  {fiveDayFore[1]?.Day.IconPhrase} <br />
                       Rain: {fiveDayFore[1]?.Day.RainProbability}% <br />
                       Snow: {fiveDayFore[1]?.Day.SnowProbability}% <br />
                       Wind: {fiveDayFore[1]?.Day.Wind.Direction.Localized} {fiveDayFore[1]?.Day.Wind.Speed.Value} km/h
                      </h6>
              </Col>
              <Col>
                <h6 className="nightCard">
                  <b>Night</b> <br />
                  {fiveDayFore[1]?.Night.IconPhrase} <br />
                       Rain: {fiveDayFore[1]?.Night.RainProbability}% <br />
                       Snow: {fiveDayFore[1]?.Night.SnowProbability}% <br />
                       Wind: {fiveDayFore[1]?.Night.Wind.Speed.Value} km/h
                      </h6>
              </Col>
            </Row>
            <h6>
              {b2.toLocaleTimeString()} <img src="wi-sunset.svg" alt="" style={{ width: "10%" }} />
            </h6>
          </Card>
        </Col>
        <Col lg="3" sm="12" className="mb-4">
          <Card className="text-center h-100" style={{ borderRadius: "1rem" }}>
            <CardBody>
              <CardTitle>
                <h5>
                  {(weekDay[c.getDay()])}
                </h5>
              </CardTitle>
              <h6>
                <FaCaretDown /> Min: {Math.round(fiveDayFore[2]?.Temperature.Minimum.Value)}° C  &nbsp;&nbsp;&nbsp; <FaCaretUp /> Max {Math.round(fiveDayFore[2]?.Temperature.Maximum.Value)}° C <br /><br />
                {c1.toLocaleTimeString()} <img src="wi-sunrise.svg" alt="" style={{ width: "10%" }} />
              </h6>
            </CardBody>
            <span> <img src={fiveDayFore[2]?.Day.Icon + ".png"} style={{ width: "50%" }} alt="" />
              <img src={fiveDayFore[2]?.Night.Icon + ".png"} style={{ width: "50%" }} alt="" />
            </span>

            <Row>
              <Col>
                <h6 className="dayCard">
                  <b>Day</b> <br />
                  {fiveDayFore[2]?.Day.IconPhrase} <br />
                       Rain: {fiveDayFore[2]?.Day.RainProbability}% <br />
                       Snow: {fiveDayFore[2]?.Day.SnowProbability}% <br />
                       Wind: {fiveDayFore[2]?.Day.Wind.Direction.Localized} {fiveDayFore[2]?.Day.Wind.Speed.Value} km/h
                      </h6>
              </Col>
              <Col>
                <h6 className="nightCard">
                  <b>Night</b> <br />
                  {fiveDayFore[2]?.Night.IconPhrase} <br />
                       Rain: {fiveDayFore[2]?.Night.RainProbability}% <br />
                       Snow: {fiveDayFore[2]?.Night.SnowProbability}% <br />
                       Wind: {fiveDayFore[2]?.Night.Wind.Direction.Localized} {fiveDayFore[2]?.Night.Wind.Speed.Value} km/h
                      </h6>
              </Col>
            </Row>
            <h6>
              {c2.toLocaleTimeString()} <img src="wi-sunset.svg" alt="" style={{ width: "10%" }} />
            </h6>
          </Card>
        </Col>
        <Col lg="3" sm="12" className="mb-4">
          <Card className="text-center h-100" style={{ borderRadius: "1rem" }}>
            <CardBody>
              <CardTitle>
                <h5>
                  {(weekDay[d.getDay()])}
                </h5>
              </CardTitle>
              <h6>
                <FaCaretDown /> Min: {Math.round(fiveDayFore[3]?.Temperature.Minimum.Value)}° C  &nbsp;&nbsp;&nbsp; <FaCaretUp /> Max {Math.round(fiveDayFore[3]?.Temperature.Maximum.Value)}° C <br /><br />
                {d1.toLocaleTimeString()} <img src="wi-sunrise.svg" alt="" style={{ width: "10%" }} />
              </h6>
            </CardBody>
            <span> <img src={fiveDayFore[3]?.Day.Icon + ".png"} style={{ width: "50%" }} alt="" />
              <img src={fiveDayFore[3]?.Night.Icon + ".png"} style={{ width: "50%" }} alt="" />
            </span>

            <Row>
              <Col>
                <h6 className="dayCard">
                  <b>Day</b> <br />
                  {fiveDayFore[3]?.Day.IconPhrase} <br />
                       Rain: {fiveDayFore[3]?.Day.RainProbability}% <br />
                       Snow: {fiveDayFore[3]?.Day.SnowProbability}% <br />
                       Wind: {fiveDayFore[3]?.Day.Wind.Direction.Localized} {fiveDayFore[3]?.Day.Wind.Speed.Value} km/h
                      </h6>
              </Col>
              <Col>
                <h6 className="nightCard">
                  <b>Night</b> <br />
                  {fiveDayFore[3]?.Night.IconPhrase} <br />
                       Rain: {fiveDayFore[3]?.Night.RainProbability}% <br />
                       Snow: {fiveDayFore[3]?.Night.SnowProbability}% <br />
                       Wind: {fiveDayFore[3]?.Night.Wind.Direction.Localized} {fiveDayFore[3]?.Night.Wind.Speed.Value} km/h
                      </h6>
              </Col>
            </Row>
            <h6>
              {d2.toLocaleTimeString()} <img src="wi-sunset.svg" alt="" style={{ width: "10%" }} />
            </h6>
          </Card>
        </Col>
        <Col lg="3" sm="12" className="mb-4">
          <Card className="text-center h-100" style={{ borderRadius: "1rem" }}>
            <CardBody>
              <CardTitle>
                <h5>
                  {(weekDay[e.getDay()])}
                </h5>
              </CardTitle>
              <h6>
                <FaCaretDown /> Min: {Math.round(fiveDayFore[4]?.Temperature.Minimum.Value)}° C  &nbsp;&nbsp;&nbsp; <FaCaretUp /> Max {Math.round(fiveDayFore[4]?.Temperature.Maximum.Value)}° C <br /><br />
                {e1.toLocaleTimeString()} <img src="wi-sunrise.svg" alt="" style={{ width: "10%" }} />
              </h6>
            </CardBody>
            <span> <img src={fiveDayFore[4]?.Day.Icon + ".png"} style={{ width: "50%" }} alt="" />
              <img src={fiveDayFore[4]?.Night.Icon + ".png"} style={{ width: "50%" }} alt="" />
            </span>

            <Row>
              <Col>
                <h6 className="dayCard">
                  <b>Day</b> <br />
                  {fiveDayFore[4]?.Day.IconPhrase} <br />
                       Rain: {fiveDayFore[4]?.Day.RainProbability}% <br />
                       Snow: {fiveDayFore[4]?.Day.SnowProbability}% <br />
                       Wind: {fiveDayFore[4]?.Day.Wind.Direction.Localized} {fiveDayFore[4]?.Day.Wind.Speed.Value} km/h
                      </h6>
              </Col>
              <Col>
                <h6 className="nightCard">
                  <b>Night</b> <br />
                  {fiveDayFore[4]?.Night.IconPhrase} <br />
                       Rain: {fiveDayFore[4]?.Night.RainProbability}% <br />
                       Snow: {fiveDayFore[4]?.Night.SnowProbability}% <br />
                       Wind: {fiveDayFore[4]?.Night.Wind.Direction.Localized} {fiveDayFore[4]?.Night.Wind.Speed.Value} km/h
                      </h6>
              </Col>
            </Row>
            <h6>
              {e2.toLocaleTimeString()} <img src="wi-sunset.svg" alt="" style={{ width: "10%" }} />
            </h6>
          </Card>
        </Col>
      </Row>

    </>
  );
};

export default Api;
