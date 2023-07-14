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
import { register } from "../redux/features/authSlice";

const initialstate = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confimrPassword: "",
};

function Register() {
  const [formValue, setFormValue] = useState(initialstate);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confimrPassword } = formValue;
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
    if (password !== confimrPassword) {
      return toast.error("passwords do not match");
    }
    if (email && password && lastName && firstName && confimrPassword) {
     dispatch(register({ formValue, navigate, toast }));
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
        <h5>Sign UP </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="firstName"
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                required
                validation="please provide your first Name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="lastName"
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleChange}
                required
                validation="please provide your last Name"
              />
            </div>
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
              <MDBInput
                label="password confirm"
                type="password"
                value={confimrPassword}
                name="confimrPassword"
                onChange={handleChange}
                required
                validation="please confirm your password"
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
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p> Already have an accout? please sign in!</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Register;
