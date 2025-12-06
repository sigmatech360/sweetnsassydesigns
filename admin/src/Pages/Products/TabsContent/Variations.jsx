import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { formatDate } from "../../../utils/dateFormat";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const Variations = ({ formData, setFormData }) => {
  const [downloadableFilesUrl, setDownloadablefilesUrl] = useState([]);
  const [variations, setVariations] = useState([]);
  const [isSaved, setIsSaved] = useState(true);

  const handleVariation = (e, index) => {
    const { name, value } = e.target;

    // setVariation((prev)=>([...prev,{[name]:value}]))
    setVariations((prev) => {
      // make a shallow copy of the array
      const updated = [...prev];

      // make a shallow copy of the specific object and update its key
      updated[index] = { ...updated[index], [name]: value };

      return updated;
    });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name == "downloadable") {
      const { checked } = e.target;
      setVariations((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [name]: checked ? 1 : 0 };
        if (updated[index].downloadable == 1) {
          updated[index] = {
            ...updated[index],
            downloadableFiles: [{ name: "", url: "" }],
          };
        }
        console.log("updated variation", updated[index]);

        // else{
        //   updated[index] = { ...updated[index], downloadableFiles :  []  }

        // }
        return updated;
      });
    } else {
      setVariations((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [name]: value };
        return updated;
      });
    }
    setIsSaved(false);
  };

  const addDownloadableFile = (index) => {
    setVariations((prev) => {
      const updated = [...prev];
      const tempdownloadableFiles = updated[index].downloadableFiles || [];
      updated[index] = {
        ...updated[index],
        downloadableFiles: [...tempdownloadableFiles, { name: "", url: "" }],
      };
      return updated;
    });
    setIsSaved(false);
  };
  const deleteDownloadableFile = (index, ind) => {
    setVariations((prev) => {
      const updated = [...prev];
      const tempdownloadableFiles = updated[index].downloadableFiles.filter(
        (_, i) => i !== ind
      );
      updated[index] = {
        ...updated[index],
        downloadableFiles: [...tempdownloadableFiles],
      };
      return updated;
    });
  };

  const handleDownloadableFileChange = async (e, index, ind) => {
    const { name, value } = e.target;
    setVariations((prev) => {
      const updated = [...prev];
      const updatedDownloadableFiles = updated[index].downloadableFiles;
      updatedDownloadableFiles[ind] = {
        ...updatedDownloadableFiles[ind],
        [name]: value,
      };
      updated[index].downloadableFiles = updatedDownloadableFiles;
      return updated;
    });
  };
  const handleDownloadableFileUpload = (e, index, ind) => {
    // console.log('file upload of index',index, ind);
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      setDownloadablefilesUrl((prev) => {
        let updated = [...prev];
        updated[ind] = URL.createObjectURL(file);
        return updated;
      });
      setVariations((prev) => {
        const updated = [...prev];
        const updatedDownloadableFiles = updated[index].downloadableFiles;

        updatedDownloadableFiles[ind] = {
          ...updatedDownloadableFiles[ind],
          [name]: file,
          url: URL.createObjectURL(file),
        };
        console.log(
          "updatedDownloadableFiles of index",
          index,
          ind,
          updatedDownloadableFiles[ind]
        );
        updated[index].downloadableFiles = updatedDownloadableFiles;
        return updated;
      });
      setIsSaved(false);
    }
  };

  const removeVariation = (index) => {
    setVariations((prev) => prev.filter((_, i) => i !== index));
    // setSelectedValues((prev) => prev.filter((_, i) => i !== index));
    setIsSaved(false);
  };

  const generateVariation = () => {
    let newVariations = [];
    formData.attributes.forEach((attr, ind) => {
      console.log("attr name", attr.name);
      // if(attr.used_for_variation == 1){

      // }
      attr.value.forEach((value, index) => {
        newVariations.push({
          attribute_name: attr.name,
          name: value,
        });
      });
      console.log("newVariations", newVariations);
      setVariations(newVariations);
      toast.success("Varaitions generated successfully!");
    });
  };

  const saveVariations = async (e) => {
    e.preventDefault();
    console.log("saving variation", variations);
    toast.success("Variations saved successfully!");
    setFormData((prev) => ({ ...prev, variations: variations }));
    setIsSaved(true);
  };

  return (
    <>
      <div className="variations">
        <div className="variations_top d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={generateVariation}
            className="btn btn-sm btn-outline-primary"
          >
            Generate varations
          </button>
          {/* <button
            type="button"
            // onClick={addNewVariation}
            className="btn btn-sm btn-outline-primary"
          >
            Add manually
          </button> */}
        </div>
        <div>
          <form onSubmit={saveVariations}>
          {variations.length > 0 &&
            variations.map((variation, index) => (
              <Accordion
                defaultActiveKey="0"
                className="mt-3 me-3"
                // key={index}
              >
                <Accordion.Item
                  // eventKey={index.toString()}
                  // key={index}
                  eventKey="0"
                >
                  <Accordion.Header>
                    <div className="d-flex align-items-center justify-content-between flex-grow-1">
                      <div className="d-flex align-items-center gap-2 category-input-field m-0">
                        {/* <select
                          name="name"
                          id=""
                          onClick={(e) => e.stopPropagation()}
                          onFocus={(e) => e.stopPropagation()}
                          onChange={(e) => handleVariation(e, 0)}
                        >
                          {formData.attributes?.length > 0 &&
                            formData.attributes?.map((attr, ind) => (
                              <option value={attr.name}>{attr.name}</option>
                            ))}
                        </select> */}
                        <select
                          name="value"
                          id=""
                          onClick={(e) => e.stopPropagation()}
                          onFocus={(e) => e.stopPropagation()}
                          value={variation.name}
                          // onChange={handleChange}
                        >
                          {formData.attributes?.length > 0 &&
                            variations.length > 0 &&
                            formData.attributes
                              .find(
                                (item) =>
                                  item.name == variations[0].attribute_name
                              )
                              .value.map((value, ind) => (
                                <option value={value}>{value}</option>
                              ))}
                        </select>
                      </div>
                      <p
                        className="text-danger m-0 me-3 fs-6"
                        onClick={() => removeVariation(index)}
                      >
                        Remove
                      </p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className=" row">
                      <div className="d-flex align-items-center mb-3">
                        <input
                          type="checkbox"
                          placeholder="Name"
                          className="me-2"
                          name="downloadable"
                          checked={variation.downloadable == 1}
                          id={`downloadable_id${index}`}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <label htmlFor={`downloadable_id${index}`}>
                          Downloadable
                        </label>
                      </div>

                      <div className="col-md-6 category-input-field">
                        <label>Regular Price</label>
                        <input
                          type="text"
                          name="price"
                          value={variation.price}
                          onChange={(e) => handleChange(e, index)}
                          required
                        />
                      </div>
                      {/* <div className="col-md-6 category-input-field">
                        <label>Sale Price</label>
                        <input
                          type="text"
                          name="sale_price"
                          value={variation.sale_price}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div> */}
                    </div>
                    {variation.downloadable == 1 && (
                      <div className="category-input-field border border-secondary p-2">
                        <label>Downloadable files</label>
                        {variation?.downloadableFiles?.length > 0 &&
                          variation?.downloadableFiles?.map(
                            (downloadableFile, ind) => (
                              <>
                                <div className=" d-flex align-items-start gap-3 border-top border-bottom pt-2">
                                  <div className="flex-grow-1 d-flex align-items-start gap-3">
                                    <div className=" flex-grow-1">
                                      <label htmlFor="">File Name</label>
                                      <input
                                        type="text"
                                        name="name"
                                        placeholder="File Name"
                                        value={downloadableFile.name}
                                        onChange={(e) =>
                                          handleDownloadableFileChange(
                                            e,
                                            index,
                                            ind
                                          )
                                        }
                                        required
                                      />
                                    </div>
                                    {/* <label>Name</label> */}
                                    <div className=" flex-grow-1">
                                      <label htmlFor="">File Url</label>
                                      {/* <input
                                        type="text"
                                        name="url"
                                        placeholder="http://"
                                        value={downloadableFile.url}
                                        // onChange={(e) =>
                                        //   handleDownloadableFileChange(
                                        //     e,
                                        //     index,
                                        //     ind
                                        //   )
                                        // }
                                        readOnly
                                        required
                                      /> */}
                                      <div>
                                        {downloadableFile.url ? (
                                          <a
                                            target="_blank"
                                            href={downloadableFile.url}
                                          >
                                            {downloadableFile.name || "file"}
                                            .zip
                                          </a>
                                        ) : (
                                          <i className="text-secondary">
                                            file url
                                          </i>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <input
                                    type="file"
                                    id={`downloadableFile_id_${index}_${ind}`}
                                    name="file"
                                    onChange={(e) =>
                                      handleDownloadableFileUpload(
                                        e,
                                        index,
                                        ind
                                      )
                                    }
                                    hidden
                                  />

                                  <label
                                    htmlFor={`downloadableFile_id_${index}_${ind}`}
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    Choose File
                                  </label>
                                  {/* <span
                                  className="bg-secondary btn btn-sm d-flex-align-center justify-content-center"
                                  type="button"
                                  onClick={() =>
                                    deleteDownloadableFile(index, ind)
                                  }
                                >
                                  <FaTrash size={10} color="white" />
                                </span> */}
                                </div>
                              </>
                            )
                          )}
                        {/* <div>
                        <button
                          className="btn-secondary btn btn-sm ms-auto mt-2"
                          type="button"
                          onClick={() => addDownloadableFile(index)}
                        >
                          Add file
                        </button>
                      </div> */}
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}

          <button
            type="submit"
            className="btn btn-secondary btn-sm mt-3"
            // disabled={
            //   selectedAttributeList.length == 0 ||
            //   // selectedAttributeList[0].name == "" ||
            //   // selectedAttributeList[0].value == "" ||
            //   selectedAttributeList.some(
            //     (item) =>
            //       item.name == "" ||
            //       !item.hasOwnProperty("selectedValues") ||
            //       item?.selectedValues?.length == 0
            //   )
            // }
            disabled={isSaved}
            // onClick={saveVariations}
          >
            Save variations
          </button>
          </form>
        </div>
      </div>
      {/* <button
        type="button"
        className="btn btn-secondary btn-sm mt-3"
        // disabled={
        //   selectedAttributeList.length == 0 ||
        //   // selectedAttributeList[0].name == "" ||
        //   // selectedAttributeList[0].value == "" ||
        //   selectedAttributeList.some(
        //     (item) =>
        //       item.name == "" ||
        //       !item.hasOwnProperty("selectedValues") ||
        //       item?.selectedValues?.length == 0
        //   )
        // }
        disabled={isSaved}
        onClick={saveVariations}
      >
        Save variations
      </button> */}
    </>
  );
};

export default Variations;
