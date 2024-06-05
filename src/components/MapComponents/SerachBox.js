import React from "react";

function SerachBox({ handleRoute }) {
  return (
    <div className="container search-wrapper">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card p-2">
            <div className="d-flex justify-content-center align-items-center">
              {/* <input
                type="text"
                className="form-control"
                placeholder="Enter address e.g. street, city and state or zip"
              />
              &nbsp; */}
              <button className="btn btn-info btn-block" onClick={handleRoute}>
                Locate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SerachBox;
