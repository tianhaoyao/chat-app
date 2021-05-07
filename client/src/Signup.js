import React, { useState } from "react";
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import gradient from './assets/images/bg-img.png'
import bubble from './assets/images/bubble.svg'
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Hidden,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";


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
  const history = useHistory();
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
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
            <Typography variant="h6" color="secondary">Already have an account?</Typography>
          </Grid>
          <Grid item>
            <Box boxShadow={3}>
              <Button size="large" onClick={() => history.push("/login")} className={classes.button}>
                <Typography color="primary" variant="h6">
                  Login
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Grid container direction="column" justify="center" alignItems="center" xm className={classes.forms}>
            
            <form onSubmit={handleRegister}>
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
                    Create an account.
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                </FormControl>
                </Grid>

                <Grid item>
                  <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" required fullWidth>
                    <TextField
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
                </Grid>
                <Grid item>
                <Grid container justify="center" direction="row" alignItems="center">
                  <Grid item>
                    <Button color="primary" type="submit" variant="contained" className={classes.button} style={{marginTop: '50px'}}>
                      <Typography variant="h6">
                        Create
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

{/* 

    <Grid container justify="center">
      <Box>
        <Grid container item>
          <Typography>Need to log in?</Typography>
          <Button onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button type="submit" variant="contained" size="large">
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
