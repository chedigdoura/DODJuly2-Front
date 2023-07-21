import React, { useState, useEffect } from "react";
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
import { searchProducts } from "../redux/features/productSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const [show, setshow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));

  // Debounce function to delay the search action by 1 second
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchProducts(search));
      navigate(`/product/search?searchQuery=${search}`);
      setSearch("")
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
        <MDBContainer>
          <MDBNavbarBrand
            href="/"
            style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
          >
            DesignPedia
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
                  <h5
                    style={{
                      marginRight: "300px",
                      marginTop: "28px",
                      fontSize: "17px",
                    }}
                  >
                    Welcome, {user?.result?.name}.
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
            <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
              <input
                type="search"
                class="form-control rounded"
                placeholder="Search products"
                aria-label="Search"
                aria-describedby="search-addon"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span
                class="input-group-text text-white border-0"
                id="search-addon"
              >
                <i class="fas fa-search"></i>
              </span>
            </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;
