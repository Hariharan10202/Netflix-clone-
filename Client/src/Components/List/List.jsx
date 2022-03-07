import React, { useRef, useState } from 'react';

import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import styles from './List.module.scss';
import ListItem from '../ListItem/ListItem';

const List = ({ Show, list }) => {
  const listRef = useRef();

  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  let show = false;

  const showHandler = () => {
    Show(!show);
  };

  const arrowHandler = direction => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    console.log(slideNumber);
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 6) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className={styles.list}>
      <span className={styles.listTitle}>{list.title}</span>
      <div className={styles.wrapper}>
        <ArrowBackIosOutlined
          className={`${styles.sliderArrow} ${styles.left}`}
          onClick={() => arrowHandler('left')}
          style={{ display: !isMoved && 'none' }}
        />
        <div className={styles.container} ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem Show={showHandler} index={i} item={item} key={i} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className={`${styles.sliderArrow} ${styles.right}`}
          onClick={() => arrowHandler('right')}
        />
      </div>
    </div>
  );
};

export default List;
