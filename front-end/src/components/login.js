import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const history = useHistory();

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    //regex validando apenas com ".com" ou com abreviação do país
    const mailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailTest.test(mail) && pass.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [mail, pass]);

  const signIn = async () => {
    const result = await login(mail, pass);
    return result;
    // history.push('/products');
  };

  const signUp = () => {
    history.push('/register')
  }



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
      <button type="button" onClick={() => signUp()}>Ainda não tenho conta! (Sign up)</button>
    </form>
  );
};

export default Login;
