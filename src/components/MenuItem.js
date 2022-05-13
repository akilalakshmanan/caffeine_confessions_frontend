import { Card } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from '../Store';

function MenuItem(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <div
        style={{
          backgroundImage: 'url(' + product.images + ')',
        }}
      ></div>
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '60px', width: '60px', borderRadius: '50%' }}
      />
      <div>
        <h3 style={{ color: '#fff' }}>{product.name}</h3>
        <span style={{ color: 'white' }}>₹{product.price}</span>
      </div>
      <p style={{ color: 'gray' }}>{product.description}</p>
    </div>
  );
}

export default MenuItem;
