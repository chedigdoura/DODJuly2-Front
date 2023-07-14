import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
function CardProduct({
  _id,
  title,
  description,
  creator,
  name,
  tags,
  imageFile,
  createdAt,
  likeCount,
  __v,
}) {
  const except = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
      return str + "...";
    }
  };
  return (
    <MDBCard>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage
          src={imageFile}
          fluid
          alt={title}
          style={{
            display: "flex",
            height: "200px",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <a>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
      <MDBCardTitle> supplier : {name} </MDBCardTitle>
        <MDBCardText>Product : {title}</MDBCardText>
        <MDBBtn
          style={{
            backgroundColor: "#BAB86C",
            width: "100%",
            position: "relative",
          }}
        >
          <Link to={`/product/${_id}`} style={{ color: "white" }}>
            Download 3D
          </Link>
        </MDBBtn>{" "}
      </MDBCardBody>
    </MDBCard>
  );
}

export default CardProduct;
