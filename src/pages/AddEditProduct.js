import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBSpinner,
  MDBBtn,
} from "mdb-react-ui-kit";
// import ChipInput from "npm i material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../redux/features/productSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

function AddEditProduct() {
  const [productData, setProductData] = useState(initialState);
  const { error, loading, supplierProducts } = useSelector((state) => ({
    ...state.product,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, description, tags } = productData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleProduct = supplierProducts.find(
        (product) => product._id === id
      );
      setProductData({ ...singleProduct });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleClear = () => {
    setProductData({ title: "", description: "", tags: [] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && title) {
      const updatedProductData = { ...productData, name: user?.result?.name };

      if (!id) {
        dispatch(createProduct({ updatedProductData, navigate, toast }));
      } else {
        dispatch(updateProduct({ updatedProductData, id, toast, navigate }));
      }
      handleClear();
    }
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
      className="container"
    >
      <MDBCard alignment="center">
        <h5> {id ? "update Product" : "add Product"} </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                placeholder="title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                className="form-control"
                required
                validation="please provide title"
              />
            </div>
            <div className="col-md-12">
              <input
                placeholder="Description"
                type="text"
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={handleChange}
                className="form-control"
                required
                validation="please provide Description"
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setProductData({ ...productData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn type="submit" style={{ width: "100%" }}>
                {" "}
                {id ? "Update" : "Submit"}{" "}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default AddEditProduct;
