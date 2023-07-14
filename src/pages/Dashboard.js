import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProductsBySupplier,
} from "../redux/features/productSlice";
import { toast } from "react-toastify";

function Dashboard() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { supplierProducts, loading } = useSelector((state) => ({
    ...state.product,
  }));
  const supplierId = user?.result._id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (supplierId) {
      dispatch(getProductsBySupplier(supplierId));
    }
  }, [supplierId]);

  const except = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
      return str + "...";
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct({ id, toast }));
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h4 className="text-center"> Dashboard of :{user?.result?.name} </h4>
      <hr style={{ maxWidth: "570px" }} />
      {supplierProducts &&
        supplierProducts.map((item) => (
          <MDBCardGroup>
            <MDBCard
              style={{ maxWidth: "800px" }}
              key={item._id}
              className="mt-2"
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    style={{ maxHeight: "100px" }}
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                  ></MDBCardImage>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}{" "}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {except(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    ></div>
                    <MDBBtn className="mt-0" tag="a" color="none">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                        onClick={() => handleDelete(item._id)}
                      />
                      <Link to={`/editProduct/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
}

export default Dashboard;
