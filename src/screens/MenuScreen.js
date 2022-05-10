import { Row } from "react-bootstrap";
import MenuItem from "../components/MenuItem";
import Col from 'react-bootstrap/Col';
import { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function MenuScreen(){
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
      });

      useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const instance = axios.create({ baseURL: 'http://localhost:5000' });
            const result = await instance.get('/api/products');
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message });
          }
        };
        fetchData();
      }, []);
    return (
        <div style={{marginTop:"106px",
          backgroundImage:
          'url(' +
          '/images/bg_4.jpg' +
          ')',
          height: '100%',
          width: '100%'
        }}>
            {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
                {products.map((product) => (
                    
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <MenuItem product={product}></MenuItem>
                </Col>
              ))}
            </Row>)}
        </div>
    )
}

export default MenuScreen;