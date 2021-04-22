
// import { flex } from "to-style/src/prefixProperties";

import stylescss from "./saveproject.css";

import React from "react";
import Modal from "react-awesome-modal";
//import iconCat from "../Project/ic_cat.svg";
//import iconExit from "../Project/ic_exit.png";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
//import PropTypes from "prop-types";

export default class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectDesc: "",
    };

    this.closePopup = this.closePopup.bind(this);
    this.saveproject = this.saveproject.bind(this);
    this.storeMyProject = this.storeMyProject.bind(this);

    this.myChangeHandlerName = this.myChangeHandlerName.bind(this);
    this.myChangeHandlerDesc = this.myChangeHandlerDesc.bind(this);
  }

  myChangeHandlerName(event) {
    this.setState({ projectName: event.target.value });
    console.log("projectName", event.target.value);
  }

  myChangeHandlerDesc(event) {
    this.setState({ projectDesc: event.target.value });
    console.log("projectDesc", event.target.value);
  }

  storeMyProject(name, desc) {}

  saveproject(e) {
    e.preventDefault();
    this.storeMyProject(this.state.projectName, this.state.projectDesc);
    alert("Dự án lưu thành công !");
  }

  closePopup() {
    console.log("Close Popup");
    //this.props.closeMyProject(false);
  }
  render() {
    return (
      <Modal id="modal" name="modal" visible={true} effect="fadeInUp">
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
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              display: "flex",
              flexDirection:"column",
              
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

            <form className={stylescss.formcontainer}>
            <div>
              <h2 style={{ color: "#2d365d",
             }}></h2>
             <div>
              <label style={stylescss.label} for="name">
                <b>Tên dự án</b>
              </label>
              <input
                type="text"
                placeholder="Tên dự án"
                onChange={this.myChangeHandlerName}
              />

              </div>

              <div>

              <label style={stylescss.label} for="name">
                <b>Mô tả</b>
              </label>
              <textarea
                onChange={this.myChangeHandlerDesc}
                type="text"
                placeholder="Mô tả thông tin về dự án"
              ></textarea>

              </div>
              <button
                //type="submit"
                style={stylescss.btn}
                //onClick={this.saveproject}
                onClick={(e) => {
                  this.saveproject(e);
                }}
              >
                Lưu dự án
              </button>
              <button
                type="button"
                style={stylescss.cancel}
                onclick="closeForm()"
              >
                Huỷ
              </button>

              </div>
            </form>
          </div>
        </view>

        <div></div>
      </Modal>
    );
  }
}

// const getProjectFilename = (curTitle, defaultTitle) => {
//     let filenameTitle = curTitle;
//     if (!filenameTitle || filenameTitle.length === 0) {
//         filenameTitle = defaultTitle;
//     }
//     return `${filenameTitle.substring(0, 100)}.sb3`;
// };

// const mapDispatchToProps = (dispatch) => ({
//     closeMyProject: () => dispatch(setStoreMyProject(false)),
// });
// const mapStateToProps = (state, ownProps) => {
//     return null;
// };

// const mapStateToProps = state => ({
//     saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
//     projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
// });

// export default compose(
//     injectIntl,
//     MenuBarHOC,
//     connect(mapStateToProps, mapDispatchToProps)
// )(StoreMyProject);

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(StoreMyProject);

/**
 * 
 * SB3Downloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func
};
SB3Downloader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SB3Downloader);

 */
