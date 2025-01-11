import axios from "axios";
import axiosInstance from "../Services/axiosServiceHandler";

const allCategories = async () => {
  const response = await axiosInstance.get(
    "/category?pageNumber=1&pageSize=50"
  );
  return response.data.data;
};

const getCategoryDetails = async (_id) => {
  console.log(_id);
  const response = await axiosInstance.get(`/category/${_id}`);
  console.log(response.data);
  return response.data.details;
};

const addCategory = async (categoryData) => {
  const response = await axiosInstance.post("/categorys", categoryData);
  return response.data.data;
};

const updatedCategory = async (categoryData) => {
  const response = await axiosInstance.put(
    `/category/${categoryData._id}`,
    categoryData
  );
  console.log(response)
  return response.data;
};

const categoriesServices = {
  allCategories,
  addCategory,
  updatedCategory,
  getCategoryDetails,
};

export default categoriesServices;
