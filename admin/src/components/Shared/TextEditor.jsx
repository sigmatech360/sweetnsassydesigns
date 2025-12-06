import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill-new"; // ✅ new package
import "react-quill-new/dist/quill.snow.css";
import api from "../../api/axios";

const videoHandler = function () {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "video/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    // -------- UPLOAD VIDEO TO SERVER --------
    const formData = new FormData();
    formData.append("video", file);

    // const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/video`, {
    //   body: formData,
    // });
    const token = localStorage.getItem("token");
    const response = await api.post("api/video", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;

    // const data = await res.json();
    console.log("api upload response", data);

    const videoUrl = data.video; // server se wapas aai URL

    // -------- INSERT VIDEO IN QUILL --------
    const range = this.quill.getSelection();
    this.quill.insertEmbed(range.index, "video", videoUrl);
  };
};

function TextEditor({ handleChange, value, name }) {
  // const [value, setValue] = useState("");

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, false] }], // resizing text
  //     ["bold", "italic"], // bold & italic
  //     [{ list: "ordered" }, { list: "bullet" }], // lists
  //     ["clean"], // clear formatting
  //     ["link"],
  //     [{align: []}],
  //     ["image","video"],

  //   ],
  // };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "italic"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
        ["link"],
        [{ align: [] }],
        // ["image", "video"],
      ],
      // handlers: {
      //   video: videoHandler, // <-- custom handler
      // },
    },
  };

  // console.log('name : ',name, ' data', value);

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        // name={name}
        // onChange={handleChange}
        onChange={(content, delta, source, editor) => {
          console.log('content', content);
          
          handleChange({
            target: {
              name: name, // your field name here
              value: content,
            },
          });
        }}
        modules={modules}
        // className="ht-200"
      />
    </>
  );
}

export default TextEditor;
