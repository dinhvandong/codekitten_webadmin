import React from "react";
import Modal from "react-awesome-modal";
import AddMoreCss from "./AddSpriteList.css";
import iconCat from "../../assets/img/ic_cat.svg";
import iconExit from "../../assets/img/ic_exit.png";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../data/data";
import { ConfigServer } from "../../config_server";

export default class AddSpriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      name: "",
      arrayTags: [],
      arrayImages: [],
      arraySounds: [],
      arrayTagsDefault: [],
      arrayImagesDefault: [],
      arraySoundsDefault: [],
      arrayTagsDisplay: [
        {
          value: "animals",
          label: "Animals",
        },
        {
          value: "people",
          label: "People",
        },
        {
          value: "fantasy",
          label: "Fantasy",
        },
        {
          value: "dance",
          label: "Dance",
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
          value: "food",
          label: "Food",
        },
        {
          value: "fashion",
          label: "Fashion",
        },
        {
          value: "letters",
          label: "Letters",
        },
      ],
      arrayImagesDisplay: [],
      arraySoundsDisplay: [],

      arrayTagsString: [],
      arrayImagesString: [],
      arraySoundsString: [],
    };
    this.state.name = "";
    //this.state.projectDesc = "";

    this.onChangeImages = this.onChangeImages.bind(this);
    this.onChangeSounds = this.onChangeSounds.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.onSaveProject = this.onSaveProject.bind(this);
    this.myChangeHandlerName = this.myChangeHandlerName.bind(this);
    this.myChangeHandlerDesc = this.myChangeHandlerDesc.bind(this);
  }

  /**
   *  {tag: 'animals', intlLabel: messages.animals},
    {tag: 'people', intlLabel: messages.people},
    {tag: 'fantasy', intlLabel: messages.fantasy},
    {tag: 'dance', intlLabel: messages.dance},
    {tag: 'music', intlLabel: messages.music},
    {tag: 'sports', intlLabel: messages.sports},
    {tag: 'food', intlLabel: messages.food},
    {tag: 'fashion', intlLabel: messages.fashion},
    {tag: 'letters', intlLabel: messages.letters}
   * 
   * 
   * 
   */
  onClosePopup = () => {
    this.props.closePopUp();
  };
  _handleImageChange(e) {
    //e.preventDefault();
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

  // onChangeTags(evt)
  // {

  //   //console.log("new value", evt.value);

  // }

  onChangeTags = (e) => {
    //  setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);

    this.setState({
      arrayTagsString: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
    //console.log("ArrayVlue:", Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  onChangeSounds = (e) => {
    this.setState({
      arraySoundsString: Array.isArray(e) ? e.map((x) => x.value) : [],
    });

    console.log("ArrayVlue:", Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  onChangeImages = (e) => {
    this.setState({
      arrayImagesString: Array.isArray(e) ? e.map((x) => x.value) : [],
    });
    console.log("ArrayVlue:", Array.isArray(e) ? e.map((x) => x.value) : []);
  };

   getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return (-1 !== index) ? pathname.substring(index + 1) : pathname;
  };
  

  onSaveProject(e) {
    e.preventDefault();
    const url = ConfigServer.host + "/api/sprite/create";
    var name = this.state.name;
    var arrayTags2 = [];
    var arrayCostumes2 = [];
    var arraySounds2 = [];
    var variables = null;
    var isStage = false;
    var blocks = null;
    var i, j;

    console.log("LENGHT_1", this.state.arrayImagesString);
    console.log("LENGHT_1", this.state.arraySoundsString);
    console.log("LENGHT_1", this.state.arrayTagsString);

    for (i = 0; i < this.state.arrayImagesString.length; i++) {
      const costumeModel = {
        assetId: "",
        name: "",
        bitmapResolution: 1,
        md5ext: "abc",
        dataFormat: "svg",
        rotationCenterX: 100,
        rotationCenterY: 100,
        base64: "",
      };
      const _id = this.state.arrayImagesString[i];

      console.log("Value11:", _id);

      for (j = 0; j < this.state.arrayImagesDefault.length; j++) {
        console.log("arrayImagesDefault", this.state.arrayImagesDefault[j]._id);
        if (_id == this.state.arrayImagesDefault[j]._id) {
          costumeModel.base64 = this.state.arrayImagesDefault[j].url;
          costumeModel.assetId = this.getFilenameFromUrl(this.state.arrayImagesDefault[j].url).split(".")[0];
          costumeModel.dataFormat = this.state.arrayImagesDefault[j].fileextend;

          costumeModel.md5ext = this.getFilenameFromUrl(this.state.arrayImagesDefault[j].url).split(".")[0] + "."+ this.state.arrayImagesDefault[j].fileextend;
          costumeModel.name = this.state.arrayImagesDefault[j].name;
          arrayCostumes2.push(costumeModel);
          break;
        }
      }
    }
    var x, y;
    for (x = 0; x < this.state.arraySoundsString.length; x++) {
      const sound = {
        assetId: "",
        name: "pop",
        dataFormat: "wav",
        format: "",
        rate: 100,
        sampleCount: 111,
        md5ext: "",
        base64: "",
      };

      var _id = this.state.arraySoundsString[x];

      console.log("Value21:", _id);

      for (y = 0; y < this.state.arraySoundsDefault.length; y++) {
        console.log("arraySoundsDefault", this.state.arraySoundsDefault[y]._id);
        if (_id === this.state.arraySoundsDefault[y]._id) {
          sound.assetId = this.state.arraySoundsDefault[y].name;
          sound.base64 = this.state.arraySoundsDefault[y].url;
          sound.name = this.state.arraySoundsDefault[y].name;
          sound.dataFormat = this.state.arraySoundsDefault[y].fileextend;
          //sound.format = this.state.
          arraySounds2.push(sound);
          break;
        }
      }
    }
    arrayTags2 = this.state.arrayTagsString;

    // var formData = new FormData();
    // formData.append("name", name);
    // formData.append("blocks", blocks);
    // formData.append("isStage", isStage);
    // formData.append("variables", variables);
    // formData.append("variables", variables);
    // formData.append("costumes",arrayCostumes2);
    // formData.append("sounds", arraySounds2);
    // //===========================================
    // formData.append("tags", (arrayTags2));

    var spriteObject = {
      name: name,
      blocks: blocks,
      isStage: isStage,
      variables: variables,
      costumes: arrayCostumes2,
      sounds: arraySounds2,
      tags: arrayTags2,
    };

    console.log("FORMDATA:", arrayCostumes2.length);
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spriteObject),
    });
  }

  getImageList() {
    const apiUrl = ConfigServer.host + "/api/fileasset/getAllByType/image";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ arrayImagesDefault: data });

        var i;
        var arrayImagesDisplay = [];
        for (i = 0; i < this.state.arrayImagesDefault.length; i++) {
          const value = this.state.arrayImagesDefault[i]._id;
          const label = this.state.arrayImagesDefault[i].name;
          var imageObject = { value: value, label: label };
          arrayImagesDisplay.push(imageObject);
        }

        this.setState({ arrayImagesDisplay: arrayImagesDisplay });
      });
  }

  getSoundList() {
    const apiUrl = ConfigServer.host+ "/api/fileasset/getAllByType/sound";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ arraySoundsDefault: data });
        var i;
        var arraySoundsDisplay = [];
        for (i = 0; i < this.state.arraySoundsDefault.length; i++) {
          const value = this.state.arraySoundsDefault[i]._id;
          const label = this.state.arraySoundsDefault[i].name;
          var soundObject = { value: value, label: label };
          arraySoundsDisplay.push(soundObject);
        }
        this.setState({ arraySoundsDisplay: arraySoundsDisplay });
      });
  }
  componentDidMount() {
    this.getImageList();
    this.getSoundList();
  }

  myChangeHandlerName(event) {
    this.setState({ name: event.target.value });
    //console.log("projectName", event.target.value);
  }
  myChangeHandlerDesc(event) {
    //this.setState({ projectDesc: event.target.value });
    //console.log("projectDesc", event.target.value);
  }
  render() {
    const animatedComponents = makeAnimated();

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
                  style={{
                    width: "100%",
                    borderColor: "#4CAF50",
                    borderWidth: "10px",
                    height: "300px",
                    overflow: "hidden",
                  }}
                >
                  <label for="uname">
                    <b>Chọn hình ảnh</b>
                  </label>
                  <Select
                    onChange={this.onChangeImages}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[this.state.arrayImagesDisplay[0]]}
                    isMulti
                    options={this.state.arrayImagesDisplay}
                  />
                  <label style={{ marginTop: 50 }} for="uname">
                    <b>Chọn âm thanh</b>
                  </label>
                  <Select
                    onChange={this.onChangeSounds}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[this.state.arraySoundsDisplay[0]]}
                    isMulti
                    options={this.state.arraySoundsDisplay}
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
                </div>
                <div className={AddMoreCss.container}>
                  <label for="uname">
                    <b>Tên nhân vật</b>
                  </label>
                  <input
                    onChange={this.myChangeHandlerName}
                    type="text"
                    placeholder="Tên nhân vật"
                    name="uname"
                    required
                  />

                  <button
                    //type="submit"
                    onClick={this.onSaveProject}
                  >
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
