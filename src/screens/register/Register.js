import React, { Fragment, useState } from "react";
import {
  Message,
} from "semantic-ui-react";
import { register } from "../../services/AuthService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");

  const registerTime = Date.now()

  const registerError = async () => {
    try {
      await register(email, password, name, registerTime);
    } catch (e) {
      setRegisterErrorMsg(e.code);
    }
  };

  return (
      <Fragment>
        <h1>
          Utwórz konto
        </h1>
        <form >
          <div>
            <input
              value={name}
              type="text"
              onChange={event => setName(event.target.value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Imię"
            />
            <input
              value={email}
              type="text"
              onChange={event => setEmail(event.target.value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail"
            />
            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Hasło"
              type="password"
            />

            <button
              onClick={() => registerError()}
              color="blue"
              fluid
              size="large"
              type="submit"
            >
              Zarejestruj się
            </button>
          </div>
        </form>
        {registerErrorMsg && (
          <Message error={true}>Podaj poprawny E-mail oraz Hasło</Message>
        )}
      </Fragment>
  );
};

export default Register;
