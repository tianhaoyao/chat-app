import React, { useState } from "react";
import { makeStyles, withStyles} from '@material-ui/core/styles';
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";


const useStyles = makeStyles({
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
  }

});

const SwitchButton = withStyles({
  label: {
    color: '#3A8DFF'
  },
})(Button);


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
    
        <Grid container className={classes.switch} direction="row" justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h6" color="secondary">Already have an account?</Typography>
          </Grid>
          <Grid item>
            <Box boxShadow={3}>
              <SwitchButton onClick={() => history.push("/login")} className={classes.button} label>
                Login
              </SwitchButton>
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
                      
                      Create
                      
                    </Button>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
            </form>

        </Grid>
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
