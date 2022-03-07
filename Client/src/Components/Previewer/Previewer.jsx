import { Cancel, PlayArrowOutlined, PlayCircleFilledWhite } from '@material-ui/icons';
import React from 'react';
import ButtonStyled from '../../UI/Button/Button';
import styles from './Previewer.module.scss';

const Previewer = ({ Show }) => {
  const showHandler = () => {
    Show(false);
  };

  return (
    <div className={styles.previewer}>
      <div className={styles.wrapper}>
        <div className={styles.image}> </div>
        <div className={styles.left}>
          <div className={styles.info}>
            <img src='Assets/moneyheist-logo.png' alt='img' />
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis tempore qui illum
              doloremque fuga quam iure ea et alias laborum, id voluptas? Sunt quidem, consequuntur
              nesciunt doloribus fugit alias accusantium.
            </h1>
            <div className={styles.buttons}>
              <ButtonStyled id='play'>
                <PlayArrowOutlined /> Watch Now
              </ButtonStyled>
              <ButtonStyled id='trailer'>
                <PlayCircleFilledWhite className={styles.icon} /> Play Trailer
              </ButtonStyled>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Cancel className={styles.closeIcon} onClick={showHandler} />
        </div>
      </div>
    </div>
  );
};

export default Previewer;
