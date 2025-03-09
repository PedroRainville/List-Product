import { Paper, TableContainer, Table, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  padding: "10px",
  overflow: "hidden",
  backgroundColor: "#e0e0e0",  
  fontFamily: "'Arial', sans-serif",
  fontSize: "1rem",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 30,
});

export const StyledFormControl = styled(FormControl)({
  width: "15%", 
  marginBottom: "16px",
  '& .MuiInputBase-root': {
    fontSize: '1.1rem',
    fontFamily: "'Roboto', sans-serif",
  },
  position: "fixed", 
  top: "16px", 
  right: "16px", 
  zIndex: 40, 
  backgroundColor: "white", 
});

export const StyledTableContainer = styled(TableContainer)({
  width: "90%",
  maxHeight: "75vh",
  overflowY: "auto",
  borderRadius: "16px",  
  border: "1px solid #ddd",
  position: "fixed",
  top: "80px", 
  left: "5%",
  right: "5%",
  zIndex: 20,
  fontFamily: "'Roboto', sans-serif",
  fontSize: "0.875rem",
  backgroundColor: "white",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ccc",
    borderRadius: "3px",
  },
});

export const StyledTable = styled(Table)({
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "16px",  
  "& thead": {
    position: "sticky",
    top: 0,
    backgroundColor: "#007bff",
    zIndex: 2,
  },
  "& thead th": {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    padding: "12px",
    border: "1px solid #ffffff",
    fontFamily: "'Arial', sans-serif",
    fontSize: "1.1rem",
  },
  "& tbody td": {
    textAlign: "left",
    padding: "12px",
    border: "1px solid #ddd",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1rem",
  },
  "& tbody tr:hover": {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#d1d1d1",
  },
});