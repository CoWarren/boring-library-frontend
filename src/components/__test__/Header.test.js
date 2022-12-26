import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Header';

test('Should render the Header component', () => {
  render(<Header/>); 
  const HeaderElement = screen.getByTestId('header-test')
  expect(HeaderElement).toBeInTheDocument(); 
})

test('Should render the Header component and check if img exist', () => {
  render(<Header/>); 
  const headerImg = screen.getByTestId('header-img-test')
  expect(headerImg).toBeInTheDocument(); 
})


//Logged in as: ${testUser}