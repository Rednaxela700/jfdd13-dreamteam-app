import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo';
import IconGoogle from "../assets/googleIcon.svg"


export default function UserAuth(
  {
    title,
    submitMsg,
    submitFn,
    customBg,
    optionMessage,
    optionLink,
    optionLinkTitle,
    googleMsg,
    googleFn,

  }
) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = userData
  const registerError = async () => {
    try {
      await submitFn(email, password);
    } catch (e) {
      setErrorMsg(e.code);
    }
  };

  const handleInputs = ({target: {name, value}}) => setUserData({...userData, [name]: value})

  return (
    <Fragment>
      <main className="wrapper login">
        <section className="login__container">
          <div className="login__logo">
            <Logo />
          </div>
          <div className="login__content">
            <h1 className="section__title login__title">
              {title}
            </h1>
            <form
              className="login__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="">
                <div className="">
                  <input
                    className="form__input login__input"
                    name="email"
                    value={userData.email}
                    type="email"
                    onChange={handleInputs}
                    placeholder="E-mail"
                  />
                </div>
                <div className="">
                  <input
                    className="form__input login__input"
                    name="password"
                    value={password}
                    onChange={handleInputs}
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <button
                  className="login__input login--submit cta"
                  onClick={() => registerError()}
                  type="submit"
                >
                  {submitMsg}
                </button>
                <button
                  className="login__input login--submit login__google cta"
                  onClick={() => googleFn()}
                  type="submit"
                >
                  <img src={IconGoogle} alt="" />&nbsp;{googleMsg}
            </button>
              </div>
            </form>
            <p>
            {optionMessage}&nbsp;<Link to={optionLink} className="section__link">{optionLinkTitle}</Link>
            </p>
          </div>
          <div className="terms__container">
            <Link to="/" className="terms__link">Privacy Policy</Link>
            &nbsp;and&nbsp;
            <Link to="/" className="terms__link">Terms of Service</Link>
          </div>
        </section>
        <div className="login__container login__bg" style={customBg ? {backgroundImage: `url(${customBg})`} : null}/>
      </main>
      {errorMsg && (
        <div className="form__error">Podaj poprawny E-mail oraz Hasło</div>
      )}
    </Fragment>
  );
};
