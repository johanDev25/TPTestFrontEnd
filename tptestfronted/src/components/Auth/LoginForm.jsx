import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/Validations";
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({ setSelectedForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    email: '',
    password: ''
});

const { email, password } = formLoginValues;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
        dispatch( startLogin( email, password ));
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={ email }
          onChange={ handleLoginInputChange }
          error={formError.email}
        />
        {formError.email && (
          <span className="error-text">
            Por favor, introduce un correo electronico válido.
          </span>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={ password }
          autoComplete="current-password"
          onChange={ handleLoginInputChange }
          error={formError.password}
        />
        {formError.password && (
          <span className="error-text">
            Por favor, elige una contraseña superior a 5 caracteres.
          </span>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => setSelectedForm("signup")}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
};


function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}



export default LoginForm;
