import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import gradient from './assets/images/bg-img.png'
import bubble from './assets/images/bubble.svg'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import {
  Grid,
  Typography,
  Hidden,
} from "@material-ui/core";

const useStyles = makeStyles({
  panel: {
    backgroundImage: `linear-gradient(to bottom, rgba(58,141,255, 0.85), rgba(134,185,255, 0.85)), url(${gradient})`,
    backgroundSize: 'cover',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '100vh',
    padding: '0 30px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  text: {
    height: '100vh',
    paddingBottom: '50vh',
  },

});

const formStyle = {
  switch: {
    position: "absolute",
    top: '30px',
    right: '30px',
  },
  forms: {
    background: 'white',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: '100vh',
    padding: '0 30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    maxWidth: '200px',
    maxHeight: '70px',
    minWidth: '200px',
    minHeight: '70px',
  },

}


const LoginBase = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" xm>
      <Hidden initialWidth='md' smDown>
      <Grid item xs={4} className={classes.panel}>
        <Grid container justify="flex-end" direction="column" xm className={classes.text} spacing={5}>
          <Grid item>
            <img src={bubble} alt="bubblespeech"/>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Hidden>


      <Grid item xs={8}>
        {props.login ? <LoginForm styling={formStyle}/> : <SignupForm styling={formStyle}/>}
        
        
      </Grid>
      
    </Grid>
  );
};

export default LoginBase;
