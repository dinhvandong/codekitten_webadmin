import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";

import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { flex } from "to-style/src/prefixProperties";
import { ButtonToolbar } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import bindAll from "lodash.bindall";
import myproject from "./myproject.css";

import "reactjs-popup/dist/index.css";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
import { setMyProject } from "../../reducers/mode";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import MenuBarHOC from "../../containers/menu-bar-hoc.jsx";
import { Paper, TablePagination } from "@material-ui/core";
import { autoUpdateProject } from "../../reducers/project-state";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

class ShowMyProject extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "closePopup",
            "handleChangePage",
            "handleChangeRowsPerPage","convertStringtoDate","formatDate","convertUTCDateToLocalDate"
        ]);
        this.state = { user: [], page: 0, rowsPerPage: 5, emptyRows: 0 };

        this.state.user = [
           
        ];
        this.state.page = 0;
        this.state.rowsPerPage = 5;
        this.state.emptyRows =
            this.state.rowsPerPage -
            Math.min(
                this.state.rowsPerPage,
                this.state.user.length -
                    this.state.page * this.state.rowsPerPage
            );
    }

    //  handleChangePage (event, newPage)
    //  {
    //   //setPage(newPage);
    //   console.log("handleChangePage", newPage);
    //   this.state.page = newPage;
    //   this.setState= {page : newPage};
    // };

    //  handleChangeRowsPerPage (event){
    //   //setRowsPerPage(parseInt(event.target.value, 10));
    //   //setPage(0);
    //   console.log("handleChangeRowsPerPage", parseInt(event.target.value, 10));

    //   this.state.rowsPerPage = parseInt(event.target.value, 10);
    //   this.state.page = 0;
    // };

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
    convertStringtoDate(dateString)
    {
        return new Date(dateString);
    }

     formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:8080/api/project/getAll';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            this.setState({user: data});
          });
      }

    convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
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
            rowsPerPage -
            Math.min(rowsPerPage, user.length - page * rowsPerPage);


        

        // this.setState= {page : newPage};

        return (
            <Modal
                id="modal"
                name="modal"
                visible={true}
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}
            >
                <view
                    id="viewid"
                    style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            width:800,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            display: flex,
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "#2d365d",
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                height: 50,
                            }}
                        >
                            <img
                                style={{
                                    width: 35,
                                    height: 35,
                                    alignSelf: "center",
                                }}
                                src={iconCat}
                            />

                            <text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                    color: "white",
                                    height: "100%",
                                    width: "100%",
                                    marginTop: 25,
                                }}
                            >
                                Code Kitten Project
                            </text>

                            <img
                                onClick={this.closePopup}
                                style={{
                                    marginRight: 5,
                                    width: 20,
                                    height: 20,
                                    alignSelf: "center",
                                }}
                                src={iconExit}
                            />
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
                                        width: "800px",
                                        //height: "800px",
                                        alignSelf: "center",
                                        margin: 0,
                                    }}
                                >
                                    <TableHead
                                        style={{ backgroundColor: "#FFF" }}
                                    >
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
                                                  page * rowsPerPage +
                                                      rowsPerPage
                                              )
                                            : user
                                        ).map((row, index) => (
                                            <TableRow key={row._id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {index + 1 + (page * rowsPerPage)}
                                                </TableCell>
                                                <TableCell style={{maxWidth: "200px", textAlign:"left"}} align="right">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right" style={{maxWidth: "200px", textAlign:"left"}} >
                                                    {row.desc}{" "}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {new Date(new Date(row.createdTime).toUTCString()).toLocaleString()}{" "}
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
                                onChangeRowsPerPage={
                                    this.handleChangeRowsPerPage
                                }

                                //  onChangePage={handleChangePage}
                                //  onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </view>
            </Modal>
        );
    }
}

ShowMyProject.propTypes = {
    closeMyProject: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    closeMyProject: () => dispatch(setMyProject(false)),
});
const mapStateToProps = (state, ownProps) => {
    return null;
};

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(null, mapDispatchToProps)
)(ShowMyProject);
