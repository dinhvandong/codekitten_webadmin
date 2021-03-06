// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import PlushOne from "@material-ui/icons/Add"
import React from "react";
import Modal from "react-awesome-modal";
//import bindAll from "lodash.bindall";
//import { connect } from "react-redux";
//import { compose } from "redux";
import PropTypes from "prop-types";
import { Paper, TablePagination } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Create } from "@material-ui/icons";
import AddMore from "./AddBackDropList";
import UpdatePopup from "./UpdateBackDropList";

import { ConfigServer } from "../../config_server";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default class BackDropList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.onClickShowpopUp = this.onClickShowpopUp.bind(this);
    this.onClickClosePopup = this.onClickClosePopup.bind(this);
    this.state = { fileAssets: [], page: 0, rowsPerPage: 5, emptyRows: 0 , showpopup:false};
    this.state.fileAssets = [];
    this.state.page = 0;
    this.state.showpopup = false;
    this.state.showupdate = false;
    this.state.rowsPerPage = 5;
    this.state.emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.state.fileAssets.length - this.state.page * this.state.rowsPerPage
      );
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }
  closePopup() {
    console.log("Close Popup");
    this.props.closeMyProject(false);
  }
  convertStringtoDate(dateString) {
    return new Date(dateString);
  }

  handleClickDelete = (id, column) => {
    return (event) => {

      //handleClickDelete

      this.deleteBackDrop(id);



      //console.log(`You clicked on row with id ${id}, in column ${column}.`);
    }
  }

  reload()
  {

    const apiUrl = ConfigServer.host + "/api/asset/getByType/backdrop";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ fileAssets: data });
      });

  }
  deleteBackDrop(id)
  {
    const apiUrl = ConfigServer.host + "/api/asset/delete/"+ id;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        //this.setState({ fileAssets: data });
        this.reload();
      });
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  componentDidMount() {
    const apiUrl = ConfigServer.host + "/api/asset/getByType/backdrop";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ fileAssets: data });
      });
  }

  convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  onClickShowUpdate()
  {
    this.setState({showupdate: true});
  }
  onClickShowpopUp()
  {

    this.setState({showpopup:true});

  }
  onClickClosePopup()
  {
    this.setState({showpopup:false});


  }

  onClickCloseUpdate()
  {
    this.setState({showupdate:false});


  }

  render() {
    const { fileAssets } = this.state;
    const { page } = this.state;

    console.log("SHowpup:", this.state.showpopup);
    //const {showpopup} = this.state;

    const { rowsPerPage } = this.state;
    const {showpopup} = this.state;
    const {showupdate} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, fileAssets.length - page * rowsPerPage);

    return (
      <div style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',}}>
        <div style={{display:"flex", flexDirection:"row", }}>
        <button style={{marginBottom:20, width:60, height:40, borderRadius:5}} onClick = {this.onClickShowpopUp}>
        <PlushOne style={{ alignSelf:'center'}} />
        </button>
  
        <div style={{width:"100%"}}>
        </div>
  
        <div >
      <form style={{display:"flex", flexDirection:"row"}}>
        <input style={{width:"300px"}} type="text" placeholder="T??m ki???m.." name="search"/>
        <button style={{width:'50px', height:'auto'}} type="submit"><i class="fa fa-search"></i></button>
      </form>
    </div>
  
        </div>
  
      <Paper
          style={{
            backgroundColor: "#FFF",
          }}
        >
          <TableContainer>
            <Table
              style={{
                backgroundColor: "#FFF",
                width: "100%",
                //height: "800px",
                alignSelf: "center",
                margin: 0,
              }}
            >
              <TableHead style={{ backgroundColor: "#FFF" }}>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                  >
                    T??n file
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    Groups
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Lo???i t???p 
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                    align="left"
                  >
                    H??nh ???nh
                  </TableCell>

                  <TableCell
                  style={{
                    color: "#2d365d",
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Link t???i
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? fileAssets.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : fileAssets
                ).map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell
                      style={{ maxWidth: "200px", textAlign: "left" }}
                      align="right"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ maxWidth: "200px", textAlign: "left" }}
                    >
                    {row.tags.join('\r\n')}

                    </TableCell>
                    <TableCell align="right">
                      {row.dataFormat}
                    </TableCell>

                    <TableCell align="left">
                      {" "}
                      <div>
                        <img
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 5,
                          }}
                          src={row.base64}
                        />
                      </div>{" "}
                    </TableCell>

                    <TableCell
                    style={{ maxWidth: "200px", textAlign: "left" }}
                    align="right"
                  >
                  <div style={{whiteSpace:'pre-line'}}>
                  <a href={row.base64}><u>Copy link</u></a>
                  </div>
                   
                  </TableCell>
                    <TableCell align="right">
                      <CreateIcon />
                    </TableCell>
                    <TableCell onClick={this.handleClickDelete(row._id, "protein")} align="right">
                      <DeleteIcon />{" "}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination style={{marginRight:0}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={fileAssets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            //  onChangePage={handleChangePage}
            //  onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>

       
        

        <div>

            {
                showpopup ? <AddMore closePopUp={this.onClickClosePopup}  />
                :<div></div> 
            }  

       
        </div>

        <div>

        {
            showupdate ? <UpdatePopup closeUpdate={this.onClickCloseUpdate}  />
            :<div></div> 
        }  

   
    </div>

       
        
       
      </div>
      
    );
  }
}
