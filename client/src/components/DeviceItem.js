import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import Star from '../assets/images/star.png'
import { useNavigate} from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/const';
const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        
        navigate(DEVICE_ROUTE + '/' + device.id);
      };  
    return (
        
        <Col  md={3} className='mt-3' onClick={handleClick}>
           <Card style={{width : 150, cursor:'pointer'}} border={'ligth'}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}  className='rounded-top' />
            <div className=' text-black-50 d-flex justify-content-between align-items-center'>
                <div>Samsung...</div>
                <div className='d-flex mt-1 align-items-center'>
                    <div >
                    {device.rating}
                    </div>
                   <Image width={18} height={18} src={Star}/> 
                </div>
            </div>
                <div className='p-1'>{device.name}</div>
           </Card>
        </Col>
    );
};

export default DeviceItem;