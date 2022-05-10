import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// import Caurosel from 'react-bootstrap/Carousel'

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}
      fade={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/bg_1.jpg"
            alt="First slide"
            interval="3000"
            style={{height:"590px"}}
          />
        <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <LinkContainer to="/shop">
              <Button>Order Now</Button>
            </LinkContainer>
            <LinkContainer to="/menu" style={{marginLeft: "10px"}}>
              <Button>Menu</Button>
            </LinkContainer>            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/bg_2.jpg"
            alt="Second slide"
            interval="3000"
            style={{height:"590px"}}
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <LinkContainer to="/shop">
              <Button>Order Now</Button>
            </LinkContainer>
            <LinkContainer to="/menu" style={{marginLeft: "10px"}}>
              <Button>Menu</Button>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/bg_3.jpg"
            alt="Third slide"
            interval="3000"
            style={{height:"590px"}}
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <LinkContainer to="/shop">
              <Button>Order Now</Button>
            </LinkContainer>
            <LinkContainer to="/menu" style={{marginLeft: "10px"}}>
              <Button>Menu</Button>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default ControlledCarousel;