import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import ProductCreateScreen from '../screens/ProductCreateScreen';
import { createRoot } from 'react-dom/client';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  const root = createRoot(container);
  root.render(<ProductCreateScreen />);
  root.unmount()
//   const testRenderer = TestRenderer.create(<ProductScreen />);
//   console.log(testRenderer.toJSON());
});