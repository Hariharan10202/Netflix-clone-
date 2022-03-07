import { ArrowForwardIosOutlined } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import styles from './Register.module.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const startHandler = () => {
    setEmail(emailRef.current.value);
  };

  const finishHandler = async event => {
    event.preventDefault();
    try {
      setPassword(passwordRef.current.value);
      setUsername(usernameRef.current.value);
      await axios.post('auth/register', { email, username, password });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <img className={styles.logo} src='Assets/Netflix.png' alt='logo' />
        </div>
      </div>
      <div className={styles.container}>
        <Link to='/login' className='link'>
          <button className={styles.loginButton}>Sign In</button>
        </Link>
        <h1>Unlimited movies, TV shows and more.</h1>
        <h2>Watch anywhere... Cancel Anytime</h2>
        <p>Ready to watch? Enter your Email to create or restart your membership</p>
        {!email ? (
          <div className={styles.input}>
            <input type='email' ref={emailRef} placeholder='email address' />
            <button className={styles.registerButton} onClick={startHandler}>
              Get Started <ArrowForwardIosOutlined />
            </button>
          </div>
        ) : (
          <form className={styles.input}>
            <input type='text' ref={usernameRef} placeholder='username' />
            <input type='password' ref={passwordRef} placeholder='password' />
            <button type='submit' className={styles.registerButton} onClick={finishHandler}>
              Start <ArrowForwardIosOutlined />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
