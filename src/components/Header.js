import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";

function Header() {
  const [show, setshow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <div>
      <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
        <MDBContainer>
          <MDBNavbarBrand
            href="/"
            style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
          >
            Design & designers
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setshow(!show)}
            style={{ color: "#606080" }}
          />
          <MDBIcon icon="bars" fas />
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
              {user?.result?._id && (
                <>
                  <h5 style={{ marginRight: "30px", marginTop: "15px" }}>
                    {" "}
                    Your are logged in as : {user?.result?.name}{" "}
                  </h5>
                </>
              )}
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text"> Home</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              {user?.result?._id && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/addProduct">
                      <p className="header-text"> Add a product</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard">
                      <p className="header-text"> Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}

              {user?.result?._id ? (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/login">
                      <p className="header-text" onClick={handleLogout}>
                        {" "}
                        Logout
                      </p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              ) : (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/login">
                      <p className="header-text"> login</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;
