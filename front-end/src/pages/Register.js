import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import registerIMG from '../assets/images/register.jpg';
import '../assets/css/register/style.css';

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cssRule, setCssRule] = useState('false');
  const [disabled, setDisabled] = useState(true);
  const [imgOpacity, setImgOpacity] = useState('registerIMG');
  const [role, setRole] = useState('client');

  useEffect(() => {
    if (name && lastname && email && password) {
      setImgOpacity('registerIMG10');
      setCssRule('true');
      setDisabled(false);
    } else if (name && lastname && email) {
      setImgOpacity('registerIMG6');
    } else if (name && lastname) {
      setImgOpacity('registerIMG3');
    } else {
      setImgOpacity('registerIMG');
      setCssRule('false');
      setDisabled(true);
    }
  }, [name, lastname, email, password]);

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

  const roleSetting = () => {
    const roleCheck = document.querySelector('#seller').checked;
    if (roleCheck === true) {
      setRole('administrator');
    } else {
      setRole('client');
    }
  };

  function register(e) {
    e.preventDefault();
    console.log(name, lastname, email, password, role);
  }

  return (
    <form method="POST" onSubmit={(e) => register(e)}>
      <img
        id={imgOpacity}
        src={registerIMG}
        alt="user fingering with 'push' text on it"
      />
      <fieldset>
        <legend>Register</legend>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            type="text"
            minLength="2"
            maxLength="12"
            placeholder="Digite o seu nome"
            title="Primeiro nome"
            autoFocus
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          Sobrenome
          <input
            id="lastname"
            name="lastname"
            type="text"
            minLength="2"
            maxLength="12"
            placeholder="Digite o seu sobrenome"
            title="Último nome"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite o seu e-mail"
            title="Campo e-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            name="password"
            type="password"
            minLength="6"
            maxLength="8"
            placeholder="Escolha uma senha"
            title="A senha deve conter de seis a oito caracteres."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            id="checkbox"
            name="checkbox"
            type="checkbox"
            title="Mostrar senha?"
            onClick={() => showPass()}
          />
        </label>
        <label htmlFor="seller">
          Quero Vender
          <input
            id="seller"
            name="sales"
            type="checkbox"
            className="seller"
            title="Sou vendedor"
            onClick={() => roleSetting()}
          />
        </label>
        <button
          id="signupBTN"
          type="submit"
          className={cssRule}
          disabled={disabled}
        >
          Cadastrar
        </button>
      </fieldset>
    </form>
  );
};

export default Register;
