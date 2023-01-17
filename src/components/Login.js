import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./../styles.css";
import loginUser from "../services/login";
import useStyles from "../styles/useStyles";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import Icon from "./Icon";
import Logo from "./Logo";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.prevantDefault();

    //call login service function
    const response = await loginUser({
      email,
      password,
    });
    console.log({ email, password });
    setPassword("");
    setEmail("");
    if ("accessToken" in response) {
      swal("Sucess", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("accessToken", response["accessToken"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        window.location.href = "/cases";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <div className="column">
        <Icon />
      </div>
      <div className="column">
        <h2>Welcome</h2>
        <p>Enter your Email and Password to sign in.</p>
        <br />

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={passwordType}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {passwordType === "password" ? (
                      <VisibilityOutlinedIcon onClick={togglePassword} />
                    ) : (
                      <VisibilityOffOutlinedIcon onClick={togglePassword} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <br />
          <br />
          <label>
            <input
              type="checkbox"
              name="remember me"
              formControlName="remember"
            />
            Remember Me
          </label>

          <br />
          <div>
            <Link to="user/forgot-password">Forgot Password</Link>
          </div>
          <div>
            <Link to="user/change-password">Change Password</Link>
          </div>
        </form>
      </div>
      <div className="column">
        <Logo />
      </div>
    </Grid>
  );
};

export default Login;
