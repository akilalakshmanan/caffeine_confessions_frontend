import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { userInfo } = state;

  const getPriceIdAndQuantity = (cartItems) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const orderId = uuidv4();
    localStorage.setItem('clientOrderId', orderId);
    const sessionData = {
      userId: userInfo._id,
      clientOrderId: orderId,
      cartItems: cartItems,
    };
    return JSON.stringify(sessionData);
  };

  const updateCartHandler = async (item, quantity) => {
    const instance = axios.create({ baseURL: 'http://172.17.0.2:5000' });
    const { data } = await instance.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = async (event) => {
    event.preventDefault();
    try {
      const instance = axios.create({ baseURL: 'http://172.17.0.2:5000' });
      const response = await instance.post(`/create-checkout-session`);
      // const resJson = response.json();
      if (response.status === 303) {
        console.log('responseresponse', response);
      } else {
        console.log('responseresponseresponse', response);
      }
      // if (data.countInStock < quantity) {
      //   window.alert('Sorry. Product is out of stock');
      //   return;
      // }
      window.location.assign(response.request.responseURL);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: '120px' }}>
      <Helmet>
        <title>Checkout Your Coffees</title>
      </Helmet>
      <h2>Selected Products</h2>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/shop">Shop Now</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      {item.name}
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        &#10134;
                        {/* <i className="fas fa-minus-circle"></i> */}
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        &#10133;
                        {/* <i className="fas fa-plus-circle"></i> */}
                      </Button>
                    </Col>
                    <Col md={3}>₹{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        &#x1F5D1;
                        {/* <i className="fas fa-trash"></i> */}
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card style={{ marginRight: '10px' }}>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : ₹
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <form
                    action="/api/orders/create-checkout-session"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="priceIdAQuantity"
                      value={getPriceIdAndQuantity(cartItems)}
                    />
                    <input
                      type="hidden"
                      name="authToken"
                      value={`Bearer ${userInfo.token}`}
                    />
                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        // onClick={checkoutHandler}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </form>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
