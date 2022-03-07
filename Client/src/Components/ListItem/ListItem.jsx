import { CircularProgress } from '@material-ui/core';
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './ListItem.module.css';

const ListItem = ({ index, Show, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movies, setMovies] = useState({});
  const [isloading, setIsLoading] = useState(false);

  let show = false;

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('/movies/find/' + item, {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGJjOWE5NWZkZWY3MjVhYzBmOTE3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTM3Mzg1OSwiZXhwIjoxNjQ1ODA1ODU5fQ.orNBrzNnTZH7xBTWyZZNrktKkNFqKmqhwBgnfdVbbmY',
          },
        });
        setMovies(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [item]);

  const showHandler = () => {
    Show(!show);
  };

  return (
    <div
      className={styles.listItem}
      onClick={showHandler}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isloading ? (
        <CircularProgress style={{ color: 'white' }} />
      ) : (
        <img src={movies.imgSm} alt='img' />
      )}
      {isHovered && (
        <div className={styles.itemInfo}>
          <div className={styles.icons}>
            <PlayArrow className={styles.icon} />
            <Add className={styles.icon} />
            <ThumbUpAltOutlined className={styles.icon} />
            <ThumbDownAltOutlined className={styles.icon} />
          </div>
          <div className={styles.itemInfoTop}>
            <span>{movies.duration}</span>
            <span className={styles.limit}>{movies.limit}+</span>
            <span>{movies.year}</span>
          </div>
          {/* <div className={styles.desc}>{movies.desc}</div> */}
          <div className={styles.genre}>{movies.genre}</div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
