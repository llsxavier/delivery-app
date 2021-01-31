import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const history = useHistory();

  const [email, setMail] = useState('');
  const [pass, setPass] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!email || !pass) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, pass]);

  const signIn = async (e) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const span = document.createElement('span');
    span.setAttribute('data-testid', 'errorMsg');
    try {
      const result = await login(email, pass);
      if (!result) {
        throw new Error('Servidor indisponível. Tente novamente mais tarde!');
      }
      if (result.err) {
        if (document.querySelector('span')) {
          document.querySelector('span').remove();
        }
        span.innerText = result.err;
        form.appendChild(span);
      } else {
        if (result.data.role === 'client') {
          localStorage.setItem('token', JSON.stringify(result.data.token));
          history.push('/products');
        } else {
          localStorage.setItem('token', JSON.stringify(result.data.token));
          history.push('/admin/orders');
        }
      }
    } catch (e) {
      if (document.querySelector('span')) {
        document.querySelector('span').remove();
      }
      span.innerText = e;
      form.appendChild(span);
    }
  };

  const showPass = () => {
    const passInput = document.querySelector('#password');
    const passBox = document.querySelector('#checkbox');
    if (passInput.type === 'password') {
      passInput.type = 'text';
      passBox.title = 'Ocultar senha?';
    } else {
      passInput.type = 'password';
      passBox.title = 'Mostrar senha?';
    }
  };

  const signUp = () => {
    history.push('/register');
  };

  return (
    <form method="POST" onSubmit={(e) => signIn(e)}>
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite o email"
            autoComplete="email"
            autoFocus
            required
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a senha"
            minLength="6"
            maxLength="8"
            size="8"
            title="A senha deve conter de seis a oito caracteres.
          "
            required
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            id="checkbox"
            name="checkbox"
            type="checkbox"
            title="Mostrar senha?"
            onClick={() => showPass()}
          />
        </label>
        <button type="submit" disabled={disabled}>
          Sign in
        </button>
        <button type="button" onClick={() => signUp()}>
          Ainda não tenho conta! (Sign up)
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
