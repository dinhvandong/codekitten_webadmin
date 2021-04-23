import React from "react";
import Modal from "react-awesome-modal";
import AddMoreCss from "./AddImageList.css";
import iconCat from "../../assets/img/ic_cat.svg";
import iconExit from "../../assets/img/ic_exit.png";
import { ConfigServer } from "../../config_server";
//import iconAvatar from "./img_avatar2.png";

export default class AddImageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      imagePreviewUrl: "",
      projectName: "",
      projectDesc: "",
    };

    this.state.projectName = "";
    this.state.projectDesc = "";

    this._handleImageChange = this._handleImageChange.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.onSaveProject = this.onSaveProject.bind(this);
    this.myChangeHandlerName = this.myChangeHandlerName.bind(this);
    this.myChangeHandlerDesc = this.myChangeHandlerDesc.bind(this);
  }

  onClosePopup = () => {
    this.props.closePopUp();
  };
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  onSaveProject() {
    var input = document.querySelector('input[type="file"]');
    const formData = new FormData();
    // const  link_download = ConfigServer.host +'/api/upload';
    const url = ConfigServer.host + "/api/fileasset/create";
    // const file = new File([blob], filename);
    formData.append("file", input.files[0]);
    formData.append("name", this.state.projectName);
    formData.append("desc", this.state.projectDesc);
    formData.append("filetype", "image");


    formData.append("fileextend", input.files[0].name.split('.').pop());
    return fetch(url, {
      method: "POST",
      body: formData,
    });
  }

  myChangeHandlerName(event) {
    this.setState({ projectName: event.target.value });
    console.log("projectName", event.target.value);
  }

  myChangeHandlerDesc(event) {
    this.setState({ projectDesc: event.target.value });
    console.log("projectDesc", event.target.value);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <iframe
          style={{ maxWidth: "480px", width: "480px", alignSelf: "center" }}
          //style={{width:'100%', alignItems:'stretch', display:'flex', marginLeft:'0px', marginRight:'0px'}}
          src={imagePreviewUrl}
        ></iframe>
      );

      //<img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    return (
      <div>
        <Modal id="modal" name="modal" visible={true} effect="fadeInUp">
          <view
            id="viewid"
            style={{
              width: 490,
              minWidth: 490,
              height:"auto",
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
                width:"490px",
                height:"auto",

                alignContent:"center",
                alignItems:"center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
              style={{
                width:'100%',
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
                  onClick={this.onClosePopup}
                  style={{
                    marginRight: 5,
                    width: 20,
                    height: 20,
                    alignSelf: "center",
                  }}
                  src={iconExit}
                />
              </div>

              <form
                style={{
                  height:"100%",
                  maxHeight:"600px",
                  width: "480px",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <div

                  style={{
                    width: "100%",
                    borderColor: "#4CAF50",
                    borderWidth: "0px",
                    height: "360px",
                    overflow: "hidden",
                  }}
                >
                  {$imagePreview}
                </div>

                <div style={{ width: "100%" }}>
                  <input
                    className={AddMoreCss.fileInput}
                    type="file"
                    onChange={(e) => this._handleImageChange(e)}
                  />
                </div>

                <div className={AddMoreCss.container}>
                  <label for="uname">
                    <b>Tên hình ảnh</b>
                  </label>
                  <input
                    onChange={this.myChangeHandlerName}
                    type="text"
                    placeholder="Tên hình ảnh"
                    name="uname"
                    required
                  />
                  <label for="psw">
                    <b>Mô tả</b>
                  </label>
                  <input
                    onChange={this.myChangeHandlerDesc}
                    type="text"
                    placeholder="Mô tả thông tin"
                    name="psw"
                    required
                  />
                  <button type="submit" onClick={this.onSaveProject}>
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </view>
        </Modal>
      </div>
    );
  }
}
