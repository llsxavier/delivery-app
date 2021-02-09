import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/getNewPass/style.css';
import { setNewPass } from '../services/api';

const SetPass = () => {
  const history = useHistory();
  const token = history.location.pathname.split('/')[2];
  const email = history.location.search.split('=')[1];
  const [pass, setPass] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [cssRule, setCssRule] = useState('false');

  const fieldset = document.querySelector('fieldset');
  const span = document.createElement('span');
  span.setAttribute('data-testid', 'errorPass');

  useEffect(() => {
    if (!pass || !passConfirmation) {
      setDisabled(true);
      setCssRule('false');
    } else if (pass !== passConfirmation) {
      setDisabled(true);
      setCssRule('false');
      if (document.querySelector('span')) {
        document.querySelector('span').remove();
      }
      span.innerText = 'As senhas não são iguais!';
      fieldset.appendChild(span);
    } else {
      setDisabled(false);
      setCssRule('true');
      if (document.querySelector('span')) {
        document.querySelector('span').remove();
      }
    }
  }, [pass, passConfirmation]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    span.setAttribute('data-testid', 'errorMsg');
    try {
      const result = await setNewPass(token, email, pass);
      if (result.err) {
        if (document.querySelector('span')) {
          document.querySelector('span').remove();
        }
        span.innerText = result.err;
        fieldset.appendChild(span);
      } else {
        if (document.querySelector('span')) {
          document.querySelector('span').remove();
        }
        span.innerText = 'Senha alterada com sucesso!';
        span.setAttribute('class', 'success');
        fieldset.appendChild(span);
      }
    } catch (e) {
      if (document.querySelector('span')) {
        document.querySelector('span').remove();
      }
      span.innerText = e;
      fieldset.appendChild(span);
    }
  };

  return (
    <form
      method="POST"
      className="getNewPass"
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset>
        <label htmlFor="password">
          Nova senha
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a nova senha"
            autoFocus
            required
            onChange={(e) => setPass(e.target.value)}
            minLength="6"
            maxLength="8"
            title="A senha deve conter de seis a oito caracteres."
          />
        </label>
        <label htmlFor="confirmation">
          Confirmar
          <input
            id="confirmation"
            name="confirmation"
            type="password"
            placeholder="Confirme a nova senha"
            required
            onChange={(e) => setPassConfirmation(e.target.value)}
            minLength="6"
            maxLength="8"
          />
        </label>
        <button type="submit" className={cssRule} disabled={disabled}>
          Enviar
        </button>
      </fieldset>
    </form>
  );
};

export default SetPass;
