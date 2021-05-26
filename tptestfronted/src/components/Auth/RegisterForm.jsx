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
import { startRegister } from '../../actions/auth';
import firebase from "../../utils/Firebase";
import "firebase/auth";

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

const RegisterForm = ({ setSelectedForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    username: '',
    email: '',
    password: ''
});

const { username, email, password } = formRegisterValues;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
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
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      dispatch( startRegister( email, password, username ) );
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(async () => {
          changeUserName();
          sendVerificationEmail();
        })
        .catch(() => {
          toast.error("Error al crear la cuenta.");
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  };

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username,
      })
      .catch(() => {
        toast.error("Error al asignar el  de usuario.");
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado un email de verificacion.");
      })
      .catch(() => {
        toast.error("Error al enviar el email de verificacion.");
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
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
          onChange={ handleRegisterInputChange }
          error={formError.email}
        />
        {formError.email && <span className="error-text">E-mail invalid</span>}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={ password }
          onChange={ handleRegisterInputChange }
          error={formError.password}
        />
        {formError.password && (
          <span className="error-text">
            Password must be more than 6 characters
          </span>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="UserName"
          name="username"
          autoComplete="username"
          autoFocus
          value={ username }
          onChange={ handleRegisterInputChange }
          error={formError.username}
        />
        {formError.username && (
          <span className="error-text">Create your own username</span>
        )}
        <Button
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => setSelectedForm("signin")}
            >
              {"Already have an account? Sign In"}
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
    username: "",
  };
}

export default RegisterForm;
