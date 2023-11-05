import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/images/bigStar.png";
import {useParams} from 'react-router-dom'
import { fetchOneDevice } from "../http/deviceApi";

const DevicePage = () => {
 const [ device, setDevice] = useState({info:[]})

 const {id} = useParams()

 useEffect(() => {
     fetchOneDevice(id).then(data => setDevice(data))
 }, [])
  return (
    <Container className="mt-3">
      <Row>
      <Col md={4}>
        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <Row className="d-flex justify-content-center align-content-center">
         <div className=" d-flex justify-content-center"> <h2>{device.name}</h2></div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              background: `url(${bigStar}) no-repeat center center`,
              width: 240,
              height: 240,
              backgroundSize: "cover",
              fontSize: 64,
            }}
          >
            {" "}
            {device.rating}{" "}d
          </div>
        </Row>
      </Col>
      <Col md={4} className=" d-flex justify-content-center">
        <Card
          className="d-flex flex-column align-items-center justify-content-around"
          style={{width:300, height:300, fontSize:32, border:'5px solid lightgray'}}
        >
          <h3>Narxi: {device.price} so'm</h3>
          <Button variant={"outline-dark"}>Karzinkaga qo'shish</Button>
        </Card>
      </Col>
      </Row>
  <h1 className="mt-3">Xususiyati</h1>
<Row className="d-flex flex-column mt-3 ms-1" >
  {

   
    device.info.map((info, index) => 
      <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray': 'transparent ', padding:10}}>
        {info.title}:{info.description}
      </Row>
      )
  }
</Row>
    </Container>
  );
};

export default DevicePage;
