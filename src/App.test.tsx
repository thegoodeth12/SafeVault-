import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders SafeVault app heading', () => {
  render(<App />);
  expect(screen.getByText(/SafeVault/i)).toBeInTheDocument();
});
