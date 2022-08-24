import React, { useContext, useState } from 'react';
import style from './LoginForm.module.css'
import { LoginButton } from "../LoginButton/LoginButton";
import { AppContext } from "../../hoc/AppContext";
import close from '../../Icons/close.svg';
import { useNavigate } from 'react-router-dom';


export const LoginForm = () => {

  const { isShowPopUp, setIsShowPopUp, setIsLogin, users, setCurrentUser } = useContext(AppContext);
  const [state, setState] = useState({
    name: '',
    password: '',
  })
  const [isFormValid, setValidFrom] = useState(true);
  const navigate = useNavigate();

  const handleReset = (event) => {
    event.preventDefault()
    if (isShowPopUp) {
      setIsShowPopUp(false);
    }
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    users.map(user => {
      if (user.name === state.name && user.password === state.password) {
        setCurrentUser(user.name)
        setIsLogin(true);
        setIsShowPopUp(false);
        navigate(`/`);
      } else {
        setValidFrom(false)
      }
    })
  }

  return (
    <div className={style.formWrapper}>
      <h3 className={style.formTitle}>To add item to the cart, log in</h3>
      <form
        onSubmit={handleSubmit}
        method='post'
      >
        <input
          className={style.field}
          name='name'
          type='text'
          placeholder='Name'
          required
          value={state.name}
          onChange={handleInput}
        />
        <input
          className={style.field}
          name='password'
          type='password'
          placeholder='Password'
          required
          value={state.password}
          onChange={handleInput}
        />
        {isFormValid || <div style={{ color: 'red' }}>The name or password is incorrect</div>}
        <div className={style.buttonWrapper}>
          <LoginButton handleClick={handleSubmit}>Enter</LoginButton>
          <LoginButton handleClick={handleReset}>Cancel</LoginButton>
        </div>
        <img
          onClick={handleReset}
          className={style.close}
          src={close}
          alt='close'
        />
      </form>
    </div>
  );
};

