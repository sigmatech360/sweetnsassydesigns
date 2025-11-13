import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { formatDate } from "../../../utils/dateFormat";

const Variations = ({ formData, setFormData }) => {
  const [downloadableFiles, setDownloadablefiles] = useState([]);
  const [variations, setVariations] = useState([]);

  useEffect(() => {
    console.log("variations", variations);
  }, [variations]);

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

  const removeVariation = (index) => {
    setVariations((prev) => prev.filter((_, i) => i !== index));
    // setSelectedValues((prev) => prev.filter((_, i) => i !== index));
    // setIsSaved(false)
  };

  const generateVariation = () => {
    let newVariations = [];
    formData.attributes.forEach((attr,ind)=>{
        console.log('attr name', attr.name);
        
        // newVariations = attr.value.map((item,index)=>
        //      ({
        //         name: attr.name,
        //         value: item
        //     })
        // )

        attr.value.forEach((value,index)=>{
            newVariations.push({
                name:attr.name,
                value: value
            })
        })
    })
    console.log('newVariations', newVariations);
    setVariations(newVariations)
    
  }

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
          <button
            type="button"
            // onClick={addNewVariation}
            className="btn btn-sm btn-outline-primary"
          >
            Add manually
          </button>
        </div>
        <div>
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
                          value={variation.value}
                        >
                          {formData.attributes?.length > 0 &&
                            variations.length > 0 &&
                            formData.attributes
                              .find((item) => item.name == variations[0].name)
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
                      <div className="col-md-6 category-input-field">
                        <label>Regular Price</label>
                        <input type="text" name="price" />
                      </div>
                      <div className="col-md-6 category-input-field">
                        <label>Sale Price</label>
                        <input type="text" name="sale_price" />
                      </div>
                    </div>
                    <div className="category-input-field border border-secondary p-2">
                      <label>Downloadable files</label>
                      {downloadableFiles &&
                        downloadableFiles.length > 0 &&
                        downloadableFiles.map((downloadableFile, index) => (
                          <>
                            <div className=" d-flex align-items-start gap-3 border-top border-bottom pt-2">
                              <div className="flex-grow-1 d-flex align-items-start gap-3">
                                <div className=" flex-grow-1">
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="File Name"
                                    // value={term}
                                    // onChange={(e) =>
                                    //   handleChangeTerm(e, index)
                                    // }
                                    required
                                  />
                                </div>
                                {/* <label>Name</label> */}
                                <div className=" flex-grow-1">
                                  <input
                                    type="text"
                                    name="url"
                                    placeholder="http://"
                                    // value={term}
                                    // onChange={(e) =>
                                    //   handleChangeTerm(e, index)
                                    // }
                                    required
                                  />
                                </div>
                              </div>
                              <input
                                type="file"
                                id="downloadableFile"
                                name="file"
                                hidden
                              />

                              <label
                                htmlFor="downloadableFile"
                                className="btn btn-sm btn-outline-primary"
                              >
                                Choose File
                              </label>
                              <span
                                className="bg-secondary btn btn-sm d-flex-align-center justify-content-center"
                                type="button"
                                onClick={() => {
                                  const updated = downloadableFiles.filter(
                                    (_, i) => i !== index
                                  );
                                  // setFormData({
                                  //   ...formData,
                                  //   value: updatedTerms,
                                  // });
                                  setDownloadablefiles(updated);
                                }}
                              >
                                <FaTrash size={10} color="white" />
                              </span>
                            </div>
                          </>
                        ))}
                      <div>
                        <button
                          className="btn-secondary btn btn-sm ms-auto mt-2"
                          type="button"
                          onClick={() => {
                            setDownloadablefiles((prev) => [
                              ...prev,
                              { name: "", url: "" },
                            ]);
                          }}
                        >
                          Add file
                        </button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
        </div>
      </div>
      <button
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
        // onClick={saveAllAttributes}
      >
        Save Changes
      </button>
    </>
  );
};

export default Variations;
