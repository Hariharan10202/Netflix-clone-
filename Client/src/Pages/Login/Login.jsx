import { useContext } from 'react';
import { useState } from 'react';
import styles from './Login.module.scss';

import { AuthContext } from '../../Components/AuthContext/AuthContext';
import { login } from '../../Components/AuthContext/ApiCalls';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useContext(AuthContext);

  const Loginhandler = e => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <img className={styles.logo} src='Assets/Netflix.png' alt='logo' />
        </div>
      </div>
      <div className={styles.container}>
        <form>
          <h1>Sign In</h1>
          <input
            type='email'
            placeholder='Email or Phone number'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            autoComplete='off'
            onChange={e => setPassword(e.target.value)}
          />
          <button className={styles.loginButton} onClick={Loginhandler}>
            Sign in
          </button>
          <span>
            New to Netflix?<b>Sign up now..</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn More</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
