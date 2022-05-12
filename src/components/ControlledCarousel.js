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
    <Carousel activeIndex={index} onSelect={handleSelect} fade={true}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/bg_1.jpg"
          alt="First slide"
          interval="1000"
          style={{ height: '680px' }}
        />
        <Carousel.Caption>
          <h3>Caffeine Confessions</h3>
          <p>Dive in to the World of Coffee</p>
          <LinkContainer to="/shop">
            <Button>Order Now</Button>
          </LinkContainer>
          <LinkContainer to="/menu" style={{ marginLeft: '10px' }}>
            <Button>Menu</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/bg_2.jpg"
          alt="Second slide"
          interval="1000"
          style={{ height: '680px' }}
        />

        <Carousel.Caption>
          <h3>Caffeine Confessions</h3>
          <p>Indulge and Experience</p>
          <LinkContainer to="/shop">
            <Button>Order Now</Button>
          </LinkContainer>
          <LinkContainer to="/menu" style={{ marginLeft: '10px' }}>
            <Button>Menu</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/bg_3.jpg"
          alt="Third slide"
          interval="1000"
          style={{ height: '680px' }}
        />

        <Carousel.Caption>
          <h3>Caffeine Confessions</h3>
          <p>A Therapeutic Addiction</p>
          <LinkContainer to="/shop">
            <Button>Order Now</Button>
          </LinkContainer>
          <LinkContainer to="/menu" style={{ marginLeft: '10px' }}>
            <Button>Menu</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
