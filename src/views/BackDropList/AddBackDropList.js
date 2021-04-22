import React from "react";
import Modal from "react-awesome-modal";
import AddMoreCss from "./AddBackDropList";
import iconCat from "../../assets/img/ic_cat.svg";
import iconExit from "../../assets/img/ic_exit.png";
//import iconAvatar from "./img_avatar2.png";
import makeAnimated from "react-select/animated";
import Select from "react-select";

export default class AddBackDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      name: "",
      link_image: "",
      arrayTags: [],
      arrayTagsDefault: [],
      arrayTagsDisplay: [
        {
          value: "fantasy",
          label: "Fantasy",
        },
        {
          value: "music",
          label: "Music",
        },
        {
          value: "sports",
          label: "Sports",
        },
        {
          value: "outdoors",
          label: "Outdoors",
        },
        {
          value: "indoors",
          label: "Indoors",
        },
        {
          value: "space",
          label: "Space",
        },
        {
          value: "underwater",
          label: "Uounderwaterod",
        },
        {
          value: "patterns",
          label: "Patterns",
        },
      ],
      arrayTagsString: [],
    };

    this.state.name = "";
    this.state.link_image = "";

    this._handleImageChange = this._handleImageChange.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.onSaveProject = this.onSaveProject.bind(this);
    this.myChangeHandlerName = this.myChangeHandlerName.bind(this);
    this.myChangeHandlerDesc = this.myChangeHandlerDesc.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
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

  onChangeTags = (e) => {
    //  setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);

    this.setState({
      arrayTagsString: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
    //console.log("ArrayVlue:", Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  onSaveProject(e) {
    e.preventDefault();
    
    const url = "http://localhost:8080/api/asset/create";
    const name = this.state.name;
    const base64 = this.state.imagePreviewUrl;
    const assetId = this.state.name;
    const tags = this.state.arrayTagsString;
    const bitmapResolution = 1;
    const md5ext = this.state.name;
    const dataFormat = "svg";
    const rotationCenterX = 240;
    const rotationCenterY = 180;
    const type = "backdrop";
    var md5 = require('md5');

    var backdropObject = 
    {
      name: name,
      base64: base64,
      assetId: md5(name),
      tags: tags,
      bitmapResolution: bitmapResolution,
      md5ext: md5(name)+ "."+ dataFormat,
      dataFormat: dataFormat,
      rotationCenterX: rotationCenterX,
      rotationCenterY: rotationCenterY,
      type: type,
    };
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backdropObject),
    });
  }

  myChangeHandlerName(event) {
    this.setState({ name: event.target.value });
    console.log("name", event.target.value);
  }

  myChangeHandlerDesc(event) {
    event.preventDefault();
    this.setState({ link_image: event.target.value });
    this.state.link_image = event.target.value;
    //this.state.imagePreviewUrl =
    this.setState({ imagePreviewUrl: event.target.value });

    console.log("link_image", event.target.value);
  }

  render() {
    const animatedComponents = makeAnimated();

    let { imagePreviewUrl } = this.state;
    // console.log("imagePreviewUrl",imagePreviewUrl);
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <iframe
          style={{ maxWidth: "480px", width: "480px", alignSelf: "center" }}
          //style={{width:'100%', alignItems:'stretch', display:'flex', marginLeft:'0px', marginRight:'0px'}}
          src={this.state.link_image}
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
                width: "490px",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: "#2d365d",
                  display: "flex",
                  width: "100%",

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
                  width: "480px",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
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
                  <label for="uname">
                    <b>URL</b>
                  </label>
                  <input
                    onChange={this.myChangeHandlerDesc}
                    type="text"
                    placeholder="Link hình ảnh"
                    name="uname"
                    required
                  />
                </div>
                <div style={{ width: "100%" }}>
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
                  <label style={{ marginTop: 50 }} for="uname">
                    <b>Chọn group</b>
                  </label>
                  <Select
                    onChange={this.onChangeTags}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[this.state.arrayTagsDisplay[0]]}
                    isMulti
                    options={this.state.arrayTagsDisplay}
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
