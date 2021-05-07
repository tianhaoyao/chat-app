import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, withTheme } from '@material-ui/core/styles';
import gradient from './assets/images/bg-img.png'
import bubble from './assets/images/bubble.svg'
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles({
  switch: {
    position: "absolute",
    top: '30px',
    right: '30px',
  },
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
  text: {
    height: '100vh',
    paddingBottom: '50vh',
  },
  button: {
    maxWidth: '200px',
    maxHeight: '70px',
    minWidth: '200px',
    minHeight: '70px',
  }

});


const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" alignItems="center" xm>
      <Hidden initialWidth='md' smDown>
      <Grid item xs={4} className={classes.panel}>
        <Grid container justify="flex-end" direction="column" xm className={classes.text} spacing={5}>
          <Grid item>
            <img src={bubble}/>
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
        <Grid container className={classes.switch} direction="row" justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h6" color="secondary">Don't have an account?</Typography>
          </Grid>
          <Grid item>
            <Box boxShadow={3}>
              <Button size="large" onClick={() => history.push("/register")} className={classes.button}>
                <Typography color="primary" variant="h6">
                  Create account
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Grid container direction="column" justify="center" alignItems="center" xm className={classes.forms}>
            
            <form onSubmit={handleLogin}>
            <Grid
              style = {{minWidth: "40vw"}} 
              container
              direction="column"
              justify="center"
              alignItems="left"
              spacing={3}
            >
                <Grid item>
                  <Typography variant="h4" color="textPrimary">
                    Welcome back!
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      aria-label="username"
                      label="E-mail address"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Password"
                      aria-label="password"
                      type="password"
                      name="password"
                      InputProps={{endAdornment:
                      <Button>
                        <Typography variant="h6" color="primary" disableFocusRipple disableRipple>
                          Forgot?
                        </Typography>
                      </Button>}
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                <Grid container justify="center" direction="row" alignItems="center">
                  <Grid item>
                    <Button color="primary" type="submit" variant="contained" className={classes.button} style={{marginTop: '50px'}}>
                      <Typography variant="h6">
                        Login
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
            </form>

        </Grid>
      </Grid>
      
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
