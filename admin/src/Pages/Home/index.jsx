import React from "react";
import { Link } from "react-router-dom";
import TextEditor from "../../components/Shared/TextEditor";

const Home = () => {

    const handlefileChange = (e) => {
        const {files} = e.target;
        let file = files[0]
        let filetype = file.type;
        console.log('file type', filetype);
        
    }
  return (
    <section className="category-pg-sec">
      <div className="container">
        <div className="row justify-content-center">
          {/* Page Header */}
          <div className="col-lg-12">
            <div className="pg-head position-relative">
              <h4>Home Page</h4>
              <div className="category-searchadd-flex">
                <button className="btn-primary position-sticky sticky-btn">
                  Publish
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="list-table">
                <h4>Media</h4>
                <TextEditor
                  name="promotion"
                  handleChange={(e) => {
                    console.log(e.target.value);
                  }}
                  value="<p>hello</p>"
                />
                <input type="file" onChange={handlefileChange} />
                <div className="d-flex align-items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    name="visible"
                    id="visible"
                    // checked={formData.simple_product?.virtual == 1}
                    // onChange={(e) => {
                    //   const { checked } = e.target;
                    //   setFormData((prev) => ({
                    //     ...prev,
                    //     simple_product: {
                    //       ...prev["simple_product"],
                    //       virtual: checked ? 1 : 0,
                    //     },
                    //   }));
                    // }}
                  />
                  <label htmlFor="visible">Visible on page</label>
                </div>

                <div className="category-form-btn mt-3">
                  <button type="submit">
                    {/* {isLoading ? "Updating..." : "Update Tag"} */}
                    Save
                  </button>
                </div>
              </div>
              <div className="list-table mt-3">
                <h4>New Design</h4>
                <div className="category-input-field">
                  <label>Product Type</label>
                  <select
                    name="parent_category"
                    id="parent_category"
                    className="w-50"
                    // value={formData.parent_category}
                    // onChange={handleChange}
                  >
                    <option value="all">All</option>
                    <option value="sale">Sale Only</option>
                    <option value="featured">Featured Only</option>
                    <option value="best_selling">Best Selling Only</option>
                  </select>
                </div>
                <div className="category-input-field">
                  <label>Product Type</label>
                  <select multiple name="category" class="dropdown_multi w-50">
                    <option class="all" value="all" selected="selected">
                      All
                    </option>
                    <option class="free-designs" value="free-designs">
                      Free Designs
                    </option>
                    <option class="gift-certificates" value="gift-certificates">
                      Gift Certificates
                    </option>
                    <option class="hero-inspired" value="hero-inspired">
                      Hero-Inspired Designs
                    </option>
                    <option class="holiday-designs" value="holiday-designs">
                      Holiday Designs
                    </option>
                    <option class="in-the-hoop" value="in-the-hoop">
                      In the Hoop (ITH) Designs
                    </option>
                    <option class="ith-bunny-designs" value="ith-bunny-designs">
                      ITH Bunny Designs
                    </option>
                    <option
                      class="ith-hand-sanitizers-in-the-hoop-ith-designs"
                      value="ith-hand-sanitizers-in-the-hoop-ith-designs"
                    >
                      ITH Hand Sanitizers
                    </option>
                    <option
                      class="ith-mug-rug-in-the-hoop-ith-designs"
                      value="ith-mug-rug-in-the-hoop-ith-designs"
                    >
                      ITH Mug Rug
                    </option>
                    <option
                      class="ith-stuffies-in-the-hoop-ith-designs"
                      value="ith-stuffies-in-the-hoop-ith-designs"
                    >
                      ITH Stuffies
                    </option>
                    <option
                      class="ith-wreath-parts-in-the-hoop-ith-designs"
                      value="ith-wreath-parts-in-the-hoop-ith-designs"
                    >
                      ITH Wreath Parts
                    </option>
                    <option
                      class="miscellaneous-designs"
                      value="miscellaneous-designs"
                    >
                      Miscellaneous Designs
                    </option>
                    <option
                      class="movie-character-inspired"
                      value="movie-character-inspired"
                    >
                      Movie Character Designs
                    </option>
                    <option class="new-releases" value="new-releases">
                      New Releases
                    </option>
                    <option class="popular-packs" value="popular-packs">
                      Popular Packs
                    </option>
                    <option class="popular-pairs" value="popular-pairs">
                      Popular Pairs
                    </option>
                    <option
                      class="princess-inspired-designs"
                      value="princess-inspired-designs"
                    >
                      Princess-Inspired Designs
                    </option>
                    <option
                      class="reading-buddy-bookmarks"
                      value="reading-buddy-bookmarks"
                    >
                      Reading Buddy Bookmarks
                    </option>
                    <option class="sketch-designs" value="sketch-designs">
                      Sketch Designs
                    </option>
                    <option class="sports" value="sports">
                      Sports Designs
                    </option>
                    <option class="subway-designs" value="subway-designs">
                      Subway Designs
                    </option>
                    <option
                      class="tv-character-inspired"
                      value="tv-character-inspired"
                    >
                      TV Character Designs
                    </option>
                    <option
                      class="valentines-day-designs-holiday-designs"
                      value="valentines-day-designs-holiday-designs"
                    >
                      Valentine's Day Designs
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
