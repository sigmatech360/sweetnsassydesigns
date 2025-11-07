import { useState } from "react";
import ReactQuill from "react-quill-new"; // ✅ new package
import "react-quill-new/dist/quill.snow.css";

function TextEditor({ handleChange, value, name }) {
  // const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }], // resizing text
      ["bold", "italic"], // bold & italic
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["clean"], // clear formatting
      ["link"],
    ],
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        // name={name}
        // onChange={handleChange}
        onChange={(content, delta, source, editor) => {
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
