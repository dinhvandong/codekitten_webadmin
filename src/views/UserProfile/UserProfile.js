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
import React from "react";
import Modal from "react-awesome-modal";

//import bindAll from "lodash.bindall";

//import { connect } from "react-redux";
//import { compose } from "redux";
import PropTypes from "prop-types";
import { Paper, TablePagination } from "@material-ui/core";
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

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    //   bindAll(this, [
    //     "closePopup",
    //     "handleChangePage",
    //     "handleChangeRowsPerPage","convertStringtoDate","formatDate","convertUTCDateToLocalDate"
    // ]);
    this.state = { user: [], page: 0, rowsPerPage: 5, emptyRows: 0 };

    this.state.user = [];
    this.state.page = 0;
    this.state.rowsPerPage = 5;
    this.state.emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.state.user.length - this.state.page * this.state.rowsPerPage
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
    const apiUrl = "http://localhost:8080/api/project/getAll";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data });
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

  render() {
    const { user } = this.state;
    const { page } = this.state;

    const { rowsPerPage } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, user.length - page * rowsPerPage);

    return (
      <div>
        <Paper
          style={{
            backgroundColor: "#FFF",
          }}
        >
          <TableContainer>
            <Table
              style={{
                backgroundColor: "#FFF",
                width: "800px",
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
                    Tên dự án
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Mô tả
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Thời gian tạo
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#2d365d",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Hình ảnh
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? user.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : user
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
                      {row.desc}{" "}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(
                        new Date(row.createdTime).toUTCString()
                      ).toLocaleString()}{" "}
                    </TableCell>

                    <TableCell align="right">
                      {" "}
                      <div>
                        <img
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 5,
                          }}
                          src={row.icon}
                        />
                      </div>{" "}
                    </TableCell>
                    <TableCell align="right">
                      <CreateIcon />
                    </TableCell>
                    <TableCell align="right">
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={user.length}
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
      </div>
    );
  }
}
