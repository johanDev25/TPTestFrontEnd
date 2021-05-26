import React from "react";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AuthOptions = ({ setSelectedForm }) => {
  const classes = useStyles();
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in or Sign up
      </Typography>
      <form className={classes.form} noValidate>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => setSelectedForm("signin")}
        >
          Sign In
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => setSelectedForm("signup")}
        >
          Sign Up
        </Button>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
};

export default AuthOptions;
