import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  editCategory,
  getAllCategories,
  updateCategory,
} from "../../Redux/Categories/categoriesSlice";
import EditIcon from "@mui/icons-material/Edit";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { toast } from "react-toastify";
import CircularLoader from "../Loading/CircularLoader";
import { useNavigate } from "react-router-dom";

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  "& .css-levciy-MuiTablePagination-displayedRows": {
    fontSize: "1.6rem",
    color: "white",
    fontFamily: "Philosopher, sans-serif",
  },
  "& .MuiTablePagination-selectLabel": {
    fontSize: "1.6rem",
    color: "white",
    fontFamily: "Philosopher, sans-serif",
  },
  "& .MuiTablePagination-select": {
    fontSize: "1.6rem",
    color: "gray",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Philosopher, sans-serif",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    fontSize: "2.2rem",
    color: "white",
    fontFamily: "Philosopher, sans-serif",
  },
  "& .MuiTablePagination-selectIcon": {
    fontSize: "1.6rem",
    color: "white",
    fontFamily: "Philosopher, sans-serif",
  },
  "& .MuiTablePagination-spacer": {
    fontSize: "1.6rem",
    color: "white",
    fontFamily: "Philosopher, sans-serif",
  },
  "& .MuiTablePagination-actions": {
    fontSize: "1.6rem",
    color: "white",
    fontFamily: "Philosopher, sans-serif",
  },
}));

const CategoryListData = () => {
  const { allCategories, edit, isLoading } = useSelector(
    (state) => state.category
  );
  const token = localStorage.getItem("token");

  // API Fetch
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories(token));
  }, []);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentPageData = allCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Categary State Define
  const [categoryData, setCategoryData] = useState({
    name: "",
    status: "",
  });
  const { name, status } = categoryData;

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  // Create and Update Category
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (edit.isEdit) {
      dispatch(
        updateCategory({
          _id: edit.category._id,
          name: name,
          status: status,
        })
      );
      toast.success("Successfully Update Category!!");
    } else {
      dispatch(createCategory(categoryData));
      toast.success("Successfully Create Category!!");
    }
    setCategoryData({
      name: "",
      status: "",
    });
  };

  const handleEditCategory = (category) => {
    dispatch(editCategory(category));
    navigate(`/category-update/${category._id}`);
  };

  useEffect(() => {
    setCategoryData({
      name: edit.category.name,
      status: edit.category.status,
    });
  }, [edit]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "1.4rem",
            display: "flex",
            alignItems: "end",
            justifyContent: "start",
            fontFamily: "Philosopher, sans-serif",
          }}
        >
          <HomeIcon
            sx={{ color: "white", fontSize: "3.5rem", marginRight: "1rem" }}
          />{" "}
          / Categories
        </p>
        <Button
          variant="contained"
          sx={{
            fontSize: "1.2rem",
            paddingBlock: "0.9rem",
            borderRadius: "0rem",
            backgroundColor: "#D4AF37",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "",
            },
          }}
          onClick={() => {
            navigate("/category");
          }}
        >
          <PlaylistAddIcon sx={{ fontSize: "3rem" }} />
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          overflowY: "scroll",
        }}
      >
        {isLoading ? (
          <>
            <CircularLoader />
          </>
        ) : (
          <>
            <TableContainer
              sx={{
                width: "100%",
                height: "85%",
                minWidth: 700,
              }}
            >
              <Table
                sx={{
                  width: "100%",
                  height: "100%",
                  // minWidth: 700,
                }}
                aria-label="customized table"
              >
                <TableHead sx={{ width: "100%", height: "8rem" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "30%",
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        textAlign: "start",
                        color: "white",
                        fontFamily: "Philosopher, sans-serif",
                      }}
                    >
                      Id
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "30%",
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Philosopher, sans-serif",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "40%",
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Philosopher, sans-serif",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentPageData.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell
                        sx={{
                          fontSize: "1.3rem",
                          color: "#b0bec5",
                          textAlign: "start",
                          fontFamily: "Philosopher, sans-serif",
                        }}
                      >
                        {category._id}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.3rem",
                          color: "#b0bec5",
                          textAlign: "center",
                          fontFamily: "Philosopher, sans-serif",
                        }}
                      >
                        {category.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.3rem",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Philosopher, sans-serif",
                        }}
                      >
                        <Box
                          sx={{
                            width: "60%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="warning"
                            sx={{ fontSize: "1rem", paddingBlock: "0.7rem" }}
                            onClick={() => handleEditCategory(category)}
                          >
                            <EditIcon />
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              fontSize: "1rem",
                              backgroundColor: "#2e7d32",
                              fontFamily: "Philosopher, sans-serif",
                              "&:hover": {
                                backgroundColor: "#1b5e20",
                                color: "white",
                              },
                            }}
                            onClick={() => {
                              navigate(`/category-details/${category._id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Box sx={{ width: "100%", height: "10%" }}>
          <StyledTablePagination
            component="div"
            count={allCategories.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
};

export default CategoryListData;
