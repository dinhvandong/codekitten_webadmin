import React from "react";
import Modal from "react-awesome-modal";
import AddMoreCss from "./AddMoreCSS.css";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
import iconAvatar from "./img_avatar2.png";

export default class AddMore extends React.Component {
  constructor(props) {
    super(props);

    this.state = { file: "", imagePreviewUrl: "" };
    this._handleImageChange = this._handleImageChange.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
  }

  onClosePopup = () =>
  {
    this.props.closePopUp();


  }
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

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview =    <iframe    style={{maxWidth:'600px'}}

      //style={{width:'100%', alignItems:'stretch', display:'flex', marginLeft:'0px', marginRight:'0px'}} 
      src={imagePreviewUrl}
      
      ></iframe>

      
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
              width: 500,
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

              <form className={AddMoreCss.formcontainer}>
              <div 
            //   style={{margin: 'auto',
            //     width: '90%',maxHeight:'400px',
            //     border: '0px',
            //     padding: '0px', overflow:'hidden'}}
              
              style={{width:'100%', borderColor:'#4CAF50',borderWidth:'10px',
                height:'400px',
                overflow:'hidden'}}
                
                >
              {$imagePreview}
              </div>

                <input
                  className={AddMoreCss.fileInput}
                  type="file"
                  onChange={(e) => this._handleImageChange(e)}
                />

                <div className={AddMoreCss.container}>
                  <label for="uname">
                    <b>Tên dự án</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Tên dự án"
                    name="uname"
                    required
                  />
                  <label for="psw">
                    <b>Mô tả</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Mô tả thông tin"
                    name="psw"
                    required
                  />
                  .<button type="submit">Cập nhật thông tin</button>
                </div>
              </form>
            </div>
          </view>
        </Modal>
      </div>
    );
  }
}
