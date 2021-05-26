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
import { AppContext } from "../../components/context/AppContext";
import {useContext} from "react"
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
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

const LoginForm = ({ setSelectedForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);
 
  const { setlocalUser } = useContext(AppContext);

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
      setIsLoading(true);
        firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          dispatch( startLogin( email, password ));
          localStorage.setItem('user', response.user)
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning("You must verify your account");
          }
          setlocalUser(localStorage.getItem('user'))
        })
        .catch((err) => {
          handlerErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
  
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
          loading={isLoading}
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
        {!userActive && (
          <ButtonResetSendEmailVerification
            user={user}
            setIsLoading={setIsLoading}
            setUserActive={setUserActive}
          />
        )}
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
};

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("user or password are incorrect");
      break;
    case "auth/too-many-requests":
      toast.warning("you has been sending a lot of request in a few seconds.");
      break;
    case "auth/user-not-found":
      toast.warning("user or password are incorrect");
      break;
    default:
      break;
  }
}

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el email de verificacion.");
      })
      .catch((err) => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        If you dont have recived the verification email please click{" "}
        <Link href="#" variant="body2" onClick={resendVerificationEmail}>
          {"Here"}
        </Link>
      </p>
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}



export default LoginForm;
