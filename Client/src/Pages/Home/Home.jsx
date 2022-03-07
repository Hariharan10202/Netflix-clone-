import React, { useState } from 'react';
import { useEffect } from 'react';
import Featured from '../../Components/Featured/Featured';
import List from '../../Components/List/List';
import Navbar from '../../Components/Navbar/Navbar';
import Previewer from '../../Components/Previewer/Previewer';
import styles from './Home.module.scss';
import axios from 'axios';
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const [show, setShow] = useState(false);
  const showHandler = params => {
    setShow(params);
  };

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGJjOWE5NWZkZWY3MjVhYzBmOTE3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTM3Mzg1OSwiZXhwIjoxNjQ1ODA1ODU5fQ.orNBrzNnTZH7xBTWyZZNrktKkNFqKmqhwBgnfdVbbmY',
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [genre, type]);

  return (
    <div className={styles.home}>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map(list => (
        <List Show={showHandler} key={list._id} list={list} />
      ))}
      {show && <Previewer Show={showHandler} />}
    </div>
  );
};

export default Home;
