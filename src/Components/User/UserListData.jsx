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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, getAllUser } from "../../Redux/auth/authSlice";
import EditIcon from "@mui/icons-material/Edit";
import CircularLoader from "../Loading/CircularLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

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

const UserListData = () => {
  const { user, allUsersData, isLoading } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // api data fetch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Delete User
  const handleUserDelete = (id) => {
    dispatch(deleteUser(id, user.token));
  };

  // Get All Users
  useEffect(() => {
    dispatch(getAllUser(user.token));
  }, [dispatch, user.token]);

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

  const currentPageData = allUsersData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleUserDetails = (userId) => {
    navigate(`/user-details/${userId}`);
  };

  const handleUserUpdate = (user) => {
    dispatch(editUser(user));
    navigate(`/user-update/${user.id}`);
  };


  // Delete Dialog
  const [openDeleteBox, setOpenDeleteBox] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDeleteBox(true);
  };

  const handleCloseDeleteBox = () => {
    setOpenDeleteBox(false);
  };

  
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
            sx={{ color: "white", fontSize: "3.6rem", marginRight: "1rem" }}
          />{" "}
          / User
        </p>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          overflowY: "scroll",
        }}
      >
        {isLoading ? (
          <CircularLoader />
        ) : (
          <TableContainer
            sx={{
              width: "100%",
              height: "85%",
              minWidth: 700,
              fontFamily: "Philosopher, sans-serif",
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
                      width: "20%",
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
                      width: "20%",
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
                      width: "30%",
                      fontSize: "1.6rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                      fontFamily: "Philosopher, sans-serif",
                    }}
                  >
                    Email
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentPageData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                      sx={{
                        fontSize: "1.3rem",
                        color: "#b0bec5",
                        textAlign: "start",
                        fontFamily: "Philosopher, sans-serif",
                      }}
                    >
                      {user.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.3rem",
                        color: "#b0bec5",
                        textAlign: "center",
                        fontFamily: "Philosopher, sans-serif",
                      }}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.3rem",
                        color: "#b0bec5",
                        textAlign: "center",
                        fontFamily: "Philosopher, sans-serif",
                      }}
                    >
                      {user.email}
                    </TableCell>

                    <TableCell
                      sx={{
                        width: "100%",
                        fontSize: "1.rem",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{
                            fontSize: "1.2rem",
                            paddingBlock: "0.6rem",
                            fontFamily: "Philosopher, sans-serif",
                          }}
                          onClick={() => handleUserUpdate(user)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            fontSize: "1.2rem",
                            paddingBlock: "0.6rem",
                            fontFamily: "Philosopher, sans-serif",
                          }}
                          // onClick={() => handleUserDelete(user.id)}
                          onClick={handleClickOpen}
                        >
                          <DeleteIcon />
                        </Button>
                        <DeleteDialog id={user.id} handleCloseDeleteBox={handleCloseDeleteBox} openDeleteBox={openDeleteBox} />

                        <Button
                          variant="contained"
                          sx={{
                            fontSize: "1rem",
                            paddingBlock: "0.6rem",
                            backgroundColor: "#2e7d32",
                            fontFamily: "Philosopher, sans-serif",
                            "&:hover": {
                              backgroundColor: "#1b5e20",
                              color: "white",
                            },
                          }}
                          onClick={() => handleUserDetails(user.id)}
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
        )}
        <Box sx={{ width: "100%", height: "10%" }}>
          <StyledTablePagination
            component="div"
            count={allUsersData.length}
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

export default UserListData;