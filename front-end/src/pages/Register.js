import React from 'react';

const Register = () => {
  return (
    <form method="POST">
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
          />
          <input
            id="checkbox"
            name="checkbox"
            type="checkbox"
            title="Mostrar senha?"
          />
        </label>
        <label htmlFor="sales">
          Quero Vender
          <input id="sales" name="sales" type="checkbox" title="Sou vendedor" />
        </label>
      </fieldset>
    </form>
  );
};

export default Register;
