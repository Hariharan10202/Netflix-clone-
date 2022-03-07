import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyle = makeStyles({
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: '400',
    color: props => (props.id === 'play' ? 'black' : 'black'),
    backgroundColor: props =>
      props.id === 'play' ? 'white' : props.id === 'trailer' ? 'transparent' : 'gray',
    marginRight: props => (props.id === 'play' ? '10px' : 0),
    transition: 'all 0.5s ease',
    '&:hover': {
      backgroundColor: props =>
        props.id === 'play' ? 'white' : props.id === 'trailer' ? 'rgb(255, 0, 0)' : 'gray',
    },
  },
});

const ButtonStyled = props => {
  const styles = useStyle(props);
  return <Button className={styles.button}>{props.children}</Button>;
};

export default ButtonStyled;
