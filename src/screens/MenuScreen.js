import { Row } from 'react-bootstrap';
import MenuItem from '../components/MenuItem';
import Col from 'react-bootstrap/Col';
import { useEffect, useReducer, useState } from 'react';
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

function MenuScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  const [categories, setCategories] = useState([]);
  const [catProds, setCatProds] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const instance = axios.create({ baseURL: 'http://172.17.0.2:5000' });
        const result = await instance.get('/api/products');
        const categoriesSet = new Set();
        for (let i = 0; i < result.data.length; i++) {
          categoriesSet.add(result.data[i].category);
        }
        let sample = Array.from(categoriesSet);
        setCategories(sample);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className="menu-div"
      style={{
        marginTop: '120px',
        marginLeft: '30px',
        marginRight: '30px',
        marginBottom: '30px',
        backgroundImage: 'url(' + '/images/bg_4.jpg' + ')',
        height: '100%',
        width: '100%',
      }}
    >
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          {/* {categories}
              {products.map((product) =>{
                if(product.category==='coffee')
                  return <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <MenuItem product={product}></MenuItem>
                  </Col>
                  })
              } */}
          {categories.map((categorie) => (
            <div>
              <h3
                style={{
                  marginLeft: '10px',
                }}
              >
                {categorie}
              </h3>
              <Row
                style={{
                  marginLeft: '10px',
                  marginTop: '10px',
                }}
              >
                {products.map((product) => {
                  if (product.category === categorie)
                    return (
                      <Col
                        key={product.slug}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-3"
                      >
                        <MenuItem product={product}></MenuItem>
                      </Col>
                    );
                })}
              </Row>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuScreen;
