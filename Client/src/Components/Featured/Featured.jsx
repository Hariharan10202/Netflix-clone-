import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ButtonStyled from '../../UI/Button/Button';
import styles from './Featured.module.scss';
import axios from 'axios';
import { BackgroundImage } from './Image.styled';

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomMovies = async () => {
      try {
        const response = await axios.get('/movies/random?type=' + type, {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGJjOWE5NWZkZWY3MjVhYzBmOTE3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTM3Mzg1OSwiZXhwIjoxNjQ1ODA1ODU5fQ.orNBrzNnTZH7xBTWyZZNrktKkNFqKmqhwBgnfdVbbmY',
          },
        });
        setContent(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomMovies();
  }, [type]);

  return (
    <BackgroundImage img={content.img}>
      <div className={styles.featured}>
        {type && (
          <div className={styles.category}>
            <span> {type === 'movie' ? 'Movies' : 'Series'}</span>
            <select name='genre' id='genre' onChange={e => setGenre(e.target.value)}>
              <option>Genre</option>
              <option value='Adventure'>Adventure</option>
              <option value='Thriller'>Thriller</option>
              <option value='Sci-fi'>Sci-fi</option>
              <option value='Action'>Action</option>
              <option value='Comedy'>Comedy</option>
              <option value='Romance'>Romance</option>
              <option value='Drama'>Drama</option>
              <option value='Horror'>Horror</option>
              <option value='Crime'>Crime</option>
              <option value='Animation'>Animation</option>
              <option value='Fantasy'>Fantasy</option>
              <option value='Documentry'>Documentry</option>
              <option value='Western'>Western</option>
            </select>
          </div>
        )}
        <div className={styles.info}>
          <img src={content.imgTitle} alt='info-img' />
          <h1> {content.title} </h1>
          <div className={styles.itemInfoTop}>
            <span> {content.year} </span>
            <span className={styles.space}>|</span>
            <span className={styles.limit}>{content.limit}+ </span>
            <span className={styles.space}>|</span>
            <span> {content.duration}</span>
            <span className={styles.space}>|</span>
            <span> {content.genre}</span>
          </div>
          <span className={styles.desc}>{content.desc}</span>

          <div className={styles.buttons}>
            <ButtonStyled id='play'>
              <PlayArrow />
              Play
            </ButtonStyled>
            <ButtonStyled id='info'>
              <InfoOutlined />
              Info
            </ButtonStyled>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Featured;
