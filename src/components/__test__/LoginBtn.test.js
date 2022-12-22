import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Header';
import LoginBtn from '../LoginBtn';

test('Should render Login button', () => {
  render(<LoginBtn/>); 
  const loginBtnElement = screen.getByTestId('loginBtn-test')
  expect(loginBtnElement).toBeInTheDocument(); 
})