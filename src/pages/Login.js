import React from "react";
import { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";

const initialstate = {
  email: "",
  password: "",
};

function Login() {
  const [formValue, setFormValue] = useState(initialstate);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => error && toast.error(error), [error]);
  // next one from chatGPT
  useEffect(() => {
    if (error && toast && typeof toast.error === "function") {
      toast.error(error);
    }
    return () => {
      if (toast && typeof toast.dismiss === "function") {
        toast.dismiss();
      }
    };
  }, [error, toast]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign IN </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
                validation="please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="password"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
                validation="please provide your password"
              />
            </div>
            <div className="col-md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p> Don't have an account yet? Sign up Now!</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Login;
