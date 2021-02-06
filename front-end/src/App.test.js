import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from './pages/Login';
import Register from './pages/Register';

const client = {
  email: 'user@test.com',
  pass: '123456',
};

const admin = {
  email: 'admin@deliveryapp.com.br',
  pass: '123456',
};

const noUser = {
  email: 'doesnt@exists.com',
  pass: '123456',
  error: 'Wrong email or password. Try again!',
};

const newUser = {
  name: 'New',
  lastname: 'User',
  email: 'user@test.com.br',
  pass: '123456',
};

const admUser = {
  name: 'New',
  lastname: 'User',
  email: 'user@test.com.sp',
  pass: '123456',
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

    fireEvent.change(emailInput, { target: { value: client.email } });
    expect(emailInput).toHaveValue(client.email);
    fireEvent.change(passInput, { target: { value: client.pass } });
    expect(passInput).toHaveValue(client.pass);

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

    fireEvent.change(emailInput, { target: { value: admin.email } });
    expect(emailInput).toHaveValue(admin.email);
    fireEvent.change(passInput, { target: { value: admin.pass } });
    expect(passInput).toHaveValue(admin.pass);

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

  it('User can change his password', async () => {
    const { getByText, history } = renderWithRouter(<Login />);

    const newPassBtn = getByText(/Esqueci/i);

    fireEvent.click(newPassBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/getNewPassword');
    });
  });
});

describe('Register Page', () => {
  it('Name input check', () => {
    const { getByLabelText } = renderWithRouter(<Register />);
    const nameInput = getByLabelText('Nome');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.type).toBe('text');
  });

  it('Lastname input check', () => {
    const { getByLabelText } = renderWithRouter(<Register />);
    const lastNameInput = getByLabelText('Sobrenome');
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput.type).toBe('text');
  });
  it('Email input check', () => {
    const { getByLabelText } = renderWithRouter(<Register />);
    const emailInput = getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');
  });

  it('Password input check', () => {
    const { getByLabelText } = renderWithRouter(<Register />);
    const passInput = getByLabelText('Senha');
    expect(passInput).toBeInTheDocument();
    expect(passInput.type).toBe('password');
  });

  it('Sign up button check', () => {
    const { getByText } = renderWithRouter(<Register />);
    const signInBtn = getByText('Cadastrar');
    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn.textContent).toBe('Cadastrar');
  });

  it('Client is able to register', async () => {
    const { getByLabelText, getByText, history } = renderWithRouter(
      <Register />
    );
    const nameInput = getByLabelText('Nome');
    const lastNameInput = getByLabelText('Sobrenome');
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signUpBtn = getByText('Cadastrar');

    fireEvent.change(nameInput, { target: { value: newUser.name } });
    expect(nameInput).toHaveValue(newUser.name);
    fireEvent.change(lastNameInput, { target: { value: newUser.lastname } });
    expect(lastNameInput).toHaveValue(newUser.lastname);
    fireEvent.change(emailInput, { target: { value: newUser.email } });
    expect(emailInput).toHaveValue(newUser.email);
    fireEvent.change(passInput, { target: { value: newUser.pass } });
    expect(passInput).toHaveValue(newUser.pass);

    fireEvent.click(signUpBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/products');
    });
  });

  it('Seller is able to register', async () => {
    const { getByLabelText, getByText, history } = renderWithRouter(
      <Register />
    );
    const nameInput = getByLabelText('Nome');
    const lastNameInput = getByLabelText('Sobrenome');
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const sellerBtn = getByText('Quero Vender');
    const signUpBtn = getByText('Cadastrar');

    fireEvent.change(nameInput, { target: { value: admUser.name } });
    expect(nameInput).toHaveValue(admUser.name);
    fireEvent.change(lastNameInput, { target: { value: admUser.lastname } });
    expect(lastNameInput).toHaveValue(admUser.lastname);
    fireEvent.change(emailInput, { target: { value: admUser.email } });
    expect(emailInput).toHaveValue(admUser.email);
    fireEvent.change(passInput, { target: { value: admUser.pass } });
    expect(passInput).toHaveValue(admUser.pass);

    fireEvent.click(sellerBtn);
    fireEvent.click(signUpBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/admin/orders');
    });
  });
  it('Registered user receives error with recovery password button', async () => {
    const { getByLabelText, getByText, getByTestId } = renderWithRouter(
      <Register />
    );
    const nameInput = getByLabelText('Nome');
    const lastNameInput = getByLabelText('Sobrenome');
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signUpBtn = getByText('Cadastrar');

    fireEvent.change(nameInput, { target: { value: newUser.name } });
    expect(nameInput).toHaveValue(newUser.name);
    fireEvent.change(lastNameInput, { target: { value: newUser.lastname } });
    expect(lastNameInput).toHaveValue(newUser.lastname);
    fireEvent.change(emailInput, { target: { value: newUser.email } });
    expect(emailInput).toHaveValue(newUser.email);
    fireEvent.change(passInput, { target: { value: newUser.pass } });
    expect(passInput).toHaveValue(newUser.pass);

    fireEvent.click(signUpBtn);

    await waitFor(() => {
      expect(getByTestId('errorMsg')).toBeInTheDocument();
      expect(getByTestId('newPass')).toBeInTheDocument();
    });
  });
  it('Registered user goes to new password page', async () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      history,
    } = renderWithRouter(<Register />);
    const nameInput = getByLabelText('Nome');
    const lastNameInput = getByLabelText('Sobrenome');
    const emailInput = getByLabelText('Email');
    const passInput = getByLabelText('Senha');
    const signUpBtn = getByText('Cadastrar');

    fireEvent.change(nameInput, { target: { value: newUser.name } });
    expect(nameInput).toHaveValue(newUser.name);
    fireEvent.change(lastNameInput, { target: { value: newUser.lastname } });
    expect(lastNameInput).toHaveValue(newUser.lastname);
    fireEvent.change(emailInput, { target: { value: newUser.email } });
    expect(emailInput).toHaveValue(newUser.email);
    fireEvent.change(passInput, { target: { value: newUser.pass } });
    expect(passInput).toHaveValue(newUser.pass);

    fireEvent.click(signUpBtn);

    await waitFor(() => {
      expect(getByTestId('newPass')).toBeInTheDocument();
      fireEvent.click(getByTestId('newPass'));
      const { pathname } = history.location;
      expect(pathname).toBe('/getNewPassword');
    });
  });
});
