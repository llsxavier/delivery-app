import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const history = useHistory();

  const [email, setMail] = useState('');
  const [pass, setPass] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    //regex validando apenas com ".com" ou com abreviação do país
    const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailTest.test(email) && pass.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, pass]);

  const signIn = async () => {
    const result = await login(email, pass);
    if (result.data.err) {
      alert(result.data.err);
    } else {
      if (result.data.user.role === 'client') {
        localStorage.setItem('token', JSON.stringify(result.data.token));
        history.push('/products');
      } else {
        localStorage.setItem('token', JSON.stringify(result.data.token));
        history.push('/admin/orders');
      }
    }
  };

  const signUp = () => {
    history.push('/register');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          name="email"
          type="text"
          placeholder="Digite o email"
          onChange={(e) => setMail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          name="password"
          type="number"
          placeholder="Digite a senha"
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <button type="button" disabled={disabled} onClick={() => signIn()}>
        Sign in
      </button>
      <button type="button" onClick={() => signUp()}>
        Ainda não tenho conta! (Sign up)
      </button>
    </form>
  );
};

export default Login;
