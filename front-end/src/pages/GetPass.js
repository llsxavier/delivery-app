import React, { useEffect, useState } from 'react';
import '../assets/css/getNewPass/style.css';
import { getNewPass } from '../services/api';

const GetNewPass = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [cssRule, setCssRule] = useState('false');
  useEffect(() => {
    if (!email) {
      setDisabled(true);
      setCssRule('false');
    } else {
      setDisabled(false);
      setCssRule('true');
    }
  }, [email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldset = document.querySelector('fieldset');
    const span = document.createElement('span');
    span.setAttribute('data-testid', 'errorMsg');
    try {
      const result = await getNewPass(email);
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
        span.innerText = 'Verifique a sua caixa de entrada!';
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
        <label htmlFor="email">
          Digite o e-mail para efetuar o recadastramento de senha
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite o email"
            autoComplete="email"
            autoFocus
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" className={cssRule} disabled={disabled}>
          Enviar
        </button>
      </fieldset>
    </form>
  );
};

export default GetNewPass;
