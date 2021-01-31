import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import Login from './pages/Login';
import renderWithRouter from './renderWithRouter';

const clientData = {
  email: 'user@test.com',
  pass: '123456',
};
const adminData = {
  email: 'admin@deliveryapp.com.br',
  pass: '123456',
};

const noUser = {
  email: 'doesnt@exists.com',
  pass: '123456',
  error: 'Wrong email or password. Try again!',
};

afterEach(cleanup);

describe('Login Page', () => {
  it('Email input check', () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const emailInput = getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');
  });

  it('Password input check', () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const passInput = getByLabelText('Senha');
    expect(passInput).toBeInTheDocument();
    expect(passInput.type).toBe('password');
  });

  it("'Sign in' button check", () => {
    const { getByText } = renderWithRouter(<Login />);
    const signInBtn = getByText('Sign in');
    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn.textContent).toBe('Sign in');
  });

  it("'Sign up' button check", () => {
    const { getByText } = renderWithRouter(<Login />);
    const signUpBtn = getByText(/Sign up/i);
    expect(signUpBtn).toBeInTheDocument();
    expect(signUpBtn.textContent).toBe('Não tenho conta! (Sign up)');
  });

  it('Client is able to login', async () => {
    const { getByLabelText, getByText, history } = renderWithRouter(<Login />);
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signInBtn = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: clientData.email } });
    expect(emailInput).toHaveValue(clientData.email);
    fireEvent.change(passInput, { target: { value: clientData.pass } });
    expect(passInput).toHaveValue(clientData.pass);

    fireEvent.click(signInBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/products');
    });
  });

  it('Admim is able to login', async () => {
    const { getByLabelText, getByText, history } = renderWithRouter(<Login />);
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signInBtn = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: adminData.email } });
    expect(emailInput).toHaveValue(adminData.email);
    fireEvent.change(passInput, { target: { value: adminData.pass } });
    expect(passInput).toHaveValue(adminData.pass);

    fireEvent.click(signInBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/admin/orders');
    });
  });

  it('Wrong user receives error', async () => {
    const { getByLabelText, getByText, getByTestId } = renderWithRouter(
      <Login />
    );
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signInBtn = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: noUser.email } });
    expect(emailInput).toHaveValue(noUser.email);
    fireEvent.change(passInput, { target: { value: noUser.pass } });
    expect(passInput).toHaveValue(noUser.pass);

    fireEvent.click(signInBtn);

    await waitFor(() => {
      expect(getByTestId('errorMsg')).toBeInTheDocument();
    });
  });

  it('A new user is able to going to register yourself', async () => {
    const { getByText, history } = renderWithRouter(<Login />);

    const signUpBtn = getByText(/Sign up/i);

    fireEvent.click(signUpBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/register');
    });
  });
});
