import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles.css";
import useStyles from "../styles/useStyles";
import swal from "sweetalert";
import { Button, CssBaseline, TextField, Grid } from "@material-ui/core";
import changePassword from "../services/changePassword";
import Icon from "./Icon";
import Logo from "./Logo";

const ChangePassword = () => {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.prevantDefault();

    //call login service function
    const response = await changePassword({
      newPassword,
      password,
    });
    console.log({ newPassword, password });
    setNewPassword("");
    setPassword("");
    if ("accessToken" in response) {
      swal("SucCess", response.message, "success", {
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
  const skip = () => navigate("/cases");

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <div className="column">
        <div className="row">
          <Icon />
        </div>
      </div>
      <div className="column">
        <h2>Welcome</h2>
        <p>Enter your password and Password to sign in.</p>
        <br />

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            name="newPassword"
            label="New Password "
            onChange={(e) => setNewPassword(e.target.value)}
          />
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
          />
          <div className="input-group-btn">
            <button
              className="btn btn-outline-primary"
              onClick={togglePassword}
            >
              {passwordType === "password" ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </button>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CHANGE PASSWORD
          </Button>

          <br />
          <div>
            <span className="link" onClick={skip}>
              SKIP{" "}
            </span>
          </div>
          <br />
        </form>
      </div>
      <div className="column">
        <Logo />
      </div>
    </Grid>
  );
};

export default ChangePassword;
