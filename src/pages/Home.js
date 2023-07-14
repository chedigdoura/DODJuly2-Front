import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../redux/features/productSlice";
import CardProduct from "../components/CardProduct";

function Home() {
  const { products, loading } = useSelector((state) => ({ ...state.product }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) {
    return <h5>Loading...</h5>;
  }

  return (
    <div
      style={{
        margin: "50px",
        padding: "5px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {products.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            no products found
          </MDBTypography>
        )}
      </MDBRow>
      <MDBCol>
        <MDBContainer>
          <MDBRow className="row-cols-1 row-cols-md-3 g-2">
            {products &&
              products.map((item, index) => (
                <CardProduct key={index} {...item} />
              ))}
          </MDBRow>
        </MDBContainer>
      </MDBCol>
    </div>
  );
}

export default Home;
