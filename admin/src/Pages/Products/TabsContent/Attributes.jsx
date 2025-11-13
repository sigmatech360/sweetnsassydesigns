import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { getAllAttributes } from "../../../api/attribute";
import { FaCaretDown } from "react-icons/fa6";
import { Accordion } from "react-bootstrap";
import CustomMultiSelect from "../../../components/Shared/CustomMultiSelect";

const Attributes = ({formData, setFormData}) => {
  const dropdownRef = useRef(null);

  const [isSaved, setIsSaved] = useState(false);


  const [addExistingAttribute, setAddExistingAttribute] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [searchAttribute, setSearchAttribute] = useState("");
  const [selectedAttributeList, setSelectedAttributeList] = useState([
      {
        name: "",
        value: [],
      },
    ]);

  const {
    data: attributesData = [],
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAllAttributes,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (attributesData && attributesData.status) {
      setAttributesList(attributesData.data);
    }
  }, [attributesData]);

  const addNewAttribute = () => {
    setSelectedAttributeList((prev) => [...prev, { name: "", value: [] }]);
    setIsSaved(false)
  };
  const removeAttribute = (index) => {
    setSelectedAttributeList((prev) => prev.filter((_, i) => i !== index));
    setSelectedValues((prev) => prev.filter((_, i) => i !== index));
    setIsSaved(false)
};

  const handleAttributeChange = (e, index) => {
    const { name, value } = e.target;
    if (name == "selectedValues") {
      if (index !== undefined && index !== null) {
        setSelectedAttributeList((prev) => {
          // make a shallow copy of the array
          const updated = [...prev];
          let values = value.split(" | ");

          // make a shallow copy of the specific object and update its key
          updated[index] = { ...updated[index], [name]: values };

          return updated;
        });
      }
      setIsSaved(false)
    //   let values = value.split(" | ");
    //   setTempAttribute((prev) => ({ ...prev, [name]: values }));
      return;
    }
    if (name == "visible" || name == "used_for_variation") {
      const { checked } = e.target;
      // setFormData({ ...formData, [name]: checked ? 1 : 0 });
      setSelectedAttributeList((prev) => {
        // make a shallow copy of the array
        const updated = [...prev];

        // make a shallow copy of the specific object and update its key
        updated[index] = { ...updated[index], [name]: checked ? 1 : 0 };

        return updated;
      });
    //   setTempAttribute((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setSelectedAttributeList((prev) => {
        // make a shallow copy of the array
        const updated = [...prev];

        // make a shallow copy of the specific object and update its key
        updated[index] = { ...updated[index], [name]: value };

        return updated;
      });
    //   setTempAttribute((prev) => ({ ...prev, [name]: value }));
    }
    console.log('is changed');
    
    setIsSaved(false)
    // setSelectedAttributeList((prev=> ({...prev, ...{prev[index][name]:value}})))
    // setFormData({ ...formData, [name]: value });
  };

  const [selectedValues, setSelectedValues]= useState([]);

  const handleSelectValueChange = (selected, index) => {
    // setSelectedValues(selected || []);
    // setSelectedValues((prev) => ([...prev,[selected || []]]));
    // console.log('selected',selected.map(item=>(item.value)));

    setSelectedAttributeList((prev) => {
      // make a shallow copy of the array
      const updated = [...prev];

      // make a shallow copy of the specific object and update its key
      updated[index] = {
        ...updated[index],
        selectedValues: selected.map((item) => item.value),
      };

      return updated;
    });
    setSelectedValues((prev) => {
      const updated = [...prev];
      updated[index] = selected; // directly store selected array
      return updated;
    });
    setIsSaved(false)
  };

  const saveAllAttributes = async () => {
    // console.log("selectedValues", selectedValues);
    console.log("SelectedAttributeList", selectedAttributeList);
    const attribut = selectedAttributeList.map((selAttr, ind) => {
      // if (selAttr.slug) {
      //   return {
      //     name: selAttr.name,
      //     value: selectedValues[ind]?.map((v) => v.value) || [],
      //     visible: selAttr.visible,
      //   };
      // }
      // return selAttr;
      return {
        name: selAttr.name,
        value: selAttr.selectedValues,
        visible: selAttr.visible ?? 0,
        used_for_variation: selAttr.used_for_variation ?? 0,
      };
    });
    setAttributes(attribut);
    setFormData((prev)=>({...prev, attributes: attribut}))
    console.log("attribut", attribut);
    setIsSaved(true)

    // setAttributes
  };

//   const saveAttribute = (e, index) => {
//     e.preventDefault();

//     if (index !== undefined && index !== null) {
//       console.log("saving attribute of index", index);
//       // setSelectedAttributeList((prev) => ([
//       //   ...prev,
//       //   [index]: tempAttribute,
//       // ]));
//       if (tempAttribute.name != "" && tempAttribute.value.length > 0) {
//         setSelectedAttributeList((prev) => {
//           // make a shallow copy of the array
//           const updated = [...prev];

//           // make a shallow copy of the specific object and update its key
//           updated[index] = tempAttribute;

//           return updated;
//         });
//       }
//     } else {
//       console.log("saving attribute without index");
//       setSelectedAttributeList((prev) => [...prev, tempAttribute]);
//       setTempAttribute({
//         name: "",
//         value: [],
//       });
//     }
//   };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAddExistingAttribute(false);
      }
    };

    if (addExistingAttribute) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addExistingAttribute]);
  return (
    <>
      <div className="attributes position-relative">
        <button
          type="button"
          onClick={addNewAttribute}
          className="btn btn-sm btn-outline-primary"
          disabled={selectedAttributeList.length > 0}
        >
          Add new
        </button>
        <div className="attributes_addexisting" ref={dropdownRef}>
          <p
            className="text-gray-500 m-0"
            onClick={() => setAddExistingAttribute(!addExistingAttribute)}
          >
            Add existing <FaCaretDown />
          </p>
          {addExistingAttribute && (
            <div>
              <div className="attribute_item_input">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchAttribute(e.target.value);
                  }}
                />
              </div>
              {attributesList &&
                attributesList.length > 0 &&
                attributesList
                //   .filter(
                //     (attr) =>
                //       attr.name
                //         .toLowerCase()
                //         .includes(searchAttribute.toLowerCase()) &&
                //       !selectedAttributeList.some((item) => item.id == attr.id)
                //   )
                  .map((attr, index) => (
                    <p
                      key={attr.id}
                      className={`attribute_item ${selectedAttributeList[0]?.id== attr.id && 'active'}`}
                      onClick={() => {
                        // setSelectedAttributeList(
                        //   // (prev) => [...prev, attr]
                        //   (prev) => [
                        //     ...prev,
                        //     {
                        //       id: attr.id,
                        //       name: attr.name,
                        //       value: attr.value,
                        //       slug: attr.slug,
                        //     },
                        //   ]
                        // );
                        setSelectedAttributeList(
                          // (prev) => [...prev, attr]
                          (prev) => [
                            {
                              id: attr.id,
                              name: attr.name,
                              value: attr.value,
                              slug: attr.slug,
                            },
                          ]
                        );
                      }}
                    >
                      {attr.name}
                    </p>
                  ))}
            </div>
          )}
        </div>
      </div>
      {selectedAttributeList &&
        // selectedAttributeList.length > 0 ? (
        selectedAttributeList.map((item, index) => (
          <div key={index}>
            <Accordion defaultActiveKey="0" className="mt-3 me-3" key={index}>
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header as="h4">
                  <div className="d-flex align-items-center justify-content-between flex-grow-1">
                    {item.name ? (
                      <p className="fw-bold m-0">{item.name}</p>
                    ) : (
                      <p className="text-secondary m-0">New attribute</p>
                    )}
                    <p
                      className="text-danger m-0 me-3 fs-6"
                      onClick={() => removeAttribute(index)}
                    >
                      Remove
                    </p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-lg-4 ">
                      <div className="category-input-field">
                        <label>Name:</label>
                        {item.slug ? (
                          <p className="fw-bold m-0">{item.name}</p>
                        ) : (
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            // value={item.name}
                            onBlur={(e) => handleAttributeChange(e, index)}
                          />
                        )}
                      </div>
                      <div className="mt-2">
                        <label>
                          <input
                            type="checkbox"
                            placeholder="Name"
                            className="me-2"
                            name="visible"
                            onChange={(e) => handleAttributeChange(e, index)}
                          />
                          Visible on the product page
                        </label>
                      </div>
                      <div className="mt-2">
                        <label>
                          <input
                            type="checkbox"
                            placeholder="Name"
                            className="me-2"
                            name="used_for_variation"
                            onChange={(e) => handleAttributeChange(e, index)}
                          />
                          Used for variations
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8 category-input-field">
                      <label>Value(s):</label>
                      {item.slug ? (
                        <div>
                          <CustomMultiSelect
                            // label="Select Technologies"
                            options={item.value.map((v) => ({
                              label: v,
                              value: v,
                            }))}
                            value={selectedValues[index]}
                            onChange={(selected) =>
                              handleSelectValueChange(selected, index)
                            }
                            placeholder="Choose multiple..."
                          />
                        </div>
                      ) : (
                        <textarea
                          cols={5}
                          rows={5}
                          name="selectedValues"
                          required
                          value={
                            item.selectedValues &&
                            item.selectedValues.join(" | ")
                          }
                          onChange={(e) => handleAttributeChange(e, index)}
                          placeholder="Enter some descriptive text. Use “|” to separate different values."
                        />
                      )}
                    </div>
                  </div>
                  {/* <form
                                              onSubmit={(e) =>
                                                saveAttribute(e, index)
                                              }
                                            > */}
                  {/* <button
                                              className="btn btn-secondary btn-sm d-block ms-auto"
                                              type="submit"
                                              // onClick={()=>saveAttribute(index)}
                                            >
                                              Save
                                            </button> */}
                  {/* </form> */}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      <button
        type="button"
        className="btn btn-secondary btn-sm mt-3"
        disabled={
          selectedAttributeList.length == 0 ||
          isSaved || 
        //   attributes == formData.attributes ||
          // selectedAttributeList[0].name == "" ||
          // selectedAttributeList[0].value == "" ||
          selectedAttributeList.some(
            (item) =>
              item.name == "" ||
              !item.hasOwnProperty("selectedValues") ||
              item?.selectedValues?.length == 0
          )
        }
        onClick={saveAllAttributes}
      >
        {/* {isSaved ? } */}
        Save Attributes
      </button>
    </>
  );
};

export default Attributes;
