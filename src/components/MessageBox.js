import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
  return <Alert  style={{marginTop:"120px"}} variant={props.variant || 'info'}>{props.children}</Alert>;
}
