import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../AuthContext/AuthAction';
import { AuthContext } from '../AuthContext/AuthContext';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  return (
    <div className={isScrolled ? `${styles.navbar} ${styles.scrolled}` : styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src='Assets/Netflix.png' alt='logo' />
          <span>Homepage</span>
          <Link className='link' to='/series'>
            <span>Series</span>
          </Link>
          <Link className='link' to='/movies'>
            <span>Movies</span>
          </Link>
          <Link className='link' to='/Newandpopular'>
            <span>New and popular</span>
          </Link>
          <Link className='link' to='list'>
            <span>My List</span>
          </Link>
        </div>
        <div className={styles.right}>
          <Search className={styles.icon} />
          <span>KIDS</span>
          <Notifications className={styles.icon} />
          <img src='Assets/firstedit.png' alt='' />
          <div className={styles.profile}>
            <ArrowDropDown className={styles.icon} />
            <div className={styles.options}>
              <span>Settings</span>
              <span onClick={() => dispatch(Logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
