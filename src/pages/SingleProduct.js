import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { getProduct } from "../redux/features/productSlice";
function SingleProduct() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => ({ ...state.product }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [id]);

  return (
    <MDBCard
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBCardImage
        src={product.imageFile}
        position="center"
        alt={product.title}
        style={{
          display: "flex",
          maxWidth: "300px",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <MDBCardBody>
        <MDBCardTitle> {product.name} </MDBCardTitle>
        <MDBCardText>{product.description}</MDBCardText>
        <MDBBtn href={product.imageFile} style={{ backgroundColor: "#BAB86C" }}>
          DOWNLOAD 3D FILE
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default SingleProduct;
