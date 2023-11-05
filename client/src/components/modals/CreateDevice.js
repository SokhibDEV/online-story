import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createDevices, fetchBrand, fetchTypes } from "../../http/deviceApi";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(()=>{
    fetchTypes().then(data => device.setTypes(data))
    fetchBrand().then(data => device.setBrands(data))
    
},[])

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };


   const changeInfo = (key, value, number )=>{
     setInfo(info.map(i => i.number === number ? {...i, [key]: value }: i))
   }
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };


  const addDevice = ()=>{
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))

    createDevices(formData).then(data => onHide())
  }
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tur Qo'shish
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType.name || "Turini tanlang"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedBrand.name || "Brandni tanlang"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Qurilma nomini kiriting"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Qurilma narxini kiriting"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />

          <Button className="mt-3" onClick={addInfo} variant={"outline-dark"}>
            Yangi qurilma qo'shish +
          </Button>
          {info.map((i) => (
            <Row className="mt-2" key={i.number}>
              <Col md={4}>
                <Form.Control value={i.title} onChange={(e)=> changeInfo("title", e.target.value, i.number)} placeholder="Qurilma nomini kiriting" />
              </Col>
              <Col md={4}>
                
                <Form.Control value={i.description} onChange={(e)=> changeInfo("description", e.target.value, i.number)}  placeholder="Qurilma tavsifini kiriting" />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  O'chirish
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          O'chirish
        </Button>
        <Button variant={"outline-success "} onClick={addDevice}>
          Qo'shish
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
