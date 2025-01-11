import axiosInstance from "../Services/axiosServiceHandler";

const allProducts = async () => {
  const response = await axiosInstance.get("/product?pageNumber=1&pageSize=10");
  return response.data.data;
};

const getProductDetails = async (_id) => {
  const response = await axiosInstance.get(`/product/${_id}`);
  return response.data.data;
};

const productAdd = async (productData) => {
  for (let [key, value] of productData.entries()) {
    console.log(key, value);
  }

  console.log(productData, "Service Create product");
  const response = await axiosInstance.post("/product", productData);
  console.log(response);
  return response;
};

const productServices = {
  allProducts,
  getProductDetails,
  productAdd,
};

export default productServices;
