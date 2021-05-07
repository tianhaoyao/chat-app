import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const SwitchButton = withStyles({
  label: {
    color: '#3A8DFF'
  },
})(Button);


const LoginForm = (props) => {
  const useStyles = makeStyles(props.styling);
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
    <div>
        <Grid container className={classes.switch} direction="row" justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h6" color="secondary">Don't have an account?</Typography>
          </Grid>
          <Grid item>
            <Box boxShadow={3}>
              <SwitchButton onClick={() => history.push("/register")} className={classes.button}>
                  Create Account
              </SwitchButton>
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
                    <Button color="primary" type="submit" variant="contained" className={classes.button} style={{marginTop: '50px', color: "white"}}>
                        Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
