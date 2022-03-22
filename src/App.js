import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import SearchIcon from '@material-ui/icons/Search';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://my-json-server.typicode.com/Ved-X/assignment/orders"
      );
      // console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      // console.log(e);
    }
  };

  // const filterDropDown=status.filter(function(result){
  //   return result.status=status;
  // })

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      <h1>Lets Code..</h1>
      {/* <SearchIcon /> */}
      <input
        type="text"
        style={{display:'flex',marginLeft:'42px',marginBottom:'24px',borderRadius:'18px',width:'20%',height:'32px'}}
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(e.target.value);
        }}
      />

      {/* <input
        type="text"
        style={{display:'flex',marginLeft:'42px',marginBottom:'24px',borderRadius:'18px',width:'20%',height:'32px'}}
        placeholder="Search here status"
        onChange={(e) => {
          setStatus(e.target.value);
          console.log(e.target.value);
        }}
      /> */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order_id</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Date Order</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((item) => {
                if (search == ""  && status == "") {
                  return item;
                } else if (
                  item.customer.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
                else if (
                  item.status.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                } 

              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.order_id}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.customer}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.address}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.product_title}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.status}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
