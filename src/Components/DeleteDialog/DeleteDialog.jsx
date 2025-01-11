import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';


// const CancelIconStyle = styled(TablePagination)(({ theme }) => ({

//     "& .css-1d159sf-MuiSvgIcon-root": {
//         fontSize: "7rem",
//         backgroundColor: "red",
//         color:"white"
//     }

// }))


const DeleteDialog = ({ handleCloseDeleteBox, openDeleteBox, id }) => {
  // Delete User

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const handleUserDelete = (id) => {
    dispatch(deleteUser(id, user.token));
  };

 
  return (
    <>
      <Dialog open={openDeleteBox} onClose={handleCloseDeleteBox}>
        <Box sx={{width:"30rem", height:"15rem",fontSize:"7rem", backgroundColor:"red"}}>
            <CancelIcon sx={{color:"white"}}/>
        </Box>
        <Box>
          <DialogTitle sx={{textAlign:"center", fontSize:"1.5rem"}}>Delete User</DialogTitle>
          <DialogContentText>
            Are you sure you want to Delete the User.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => handleUserDelete(id)}>Yes</Button>
            <Button onClick={() => handleCloseDeleteBox()}>No</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
