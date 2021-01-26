import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import renderWithRouter from './renderWithRouter';

const clientData = {
  email: 'user@test.com',
  pass: '123456',
};
const adminData = {
  email: 'admin@deliveryapp.com.br',
  pass: 123456,
};

afterEach(cleanup);

describe('Login Page', () => {
  it('Email input check', () => {
    const { getByLabelText } = renderWithRouter(<App />, { route: '/login' });
    const emailInput = getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');
  });

  it('Password input check', () => {
    const { getByLabelText } = renderWithRouter(<App />, { route: '/login' });
    const passInput = getByLabelText('Senha');
    expect(passInput).toBeInTheDocument();
    expect(passInput.type).toBe('password');
  });

  it("'Sign in' button check", () => {
    const { getByText } = renderWithRouter(<App />, { route: '/login' });
    const signInBtn = getByText(/Sign in/i);
    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn.textContent).toBe('Sign in');
  });

  it("'Sign up' button check", () => {
    const { getByText } = renderWithRouter(<App />, { route: '/login' });
    const signUpBtn = getByText(/Sign up/i);
    expect(signUpBtn).toBeInTheDocument();
    expect(signUpBtn.textContent).toBe('Ainda não tenho conta! (Sign up)');
  });

  it('User is able to login', () => {

    const { getByLabelText, getByText, history } = renderWithRouter(<App />, { route: '/login' });
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signInBtn = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: clientData.email } });
    expect(emailInput).toHaveValue(clientData.email);
    fireEvent.change(passInput, { target: { value: clientData.pass } });
    expect(passInput).toHaveValue(clientData.pass);
    console.log('58')
    fireEvent.click(signInBtn);

    const { pathname } = history.location;
    console.log(pathname)
    expect(pathname).toBe('/products');
  });
});
