import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
function LoginPage(props) {
  const { handleLogin } = useAuth();
  const [formInput, setFormInput] = useState({
    email: "rozerbagh456@gmail.com",
    password: "19Vicky93@",
  });
  const [checked, setChecked] = useState(false);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Login</h2>
          <div className="text-center mb-5 text-dark">VidyaMargam</div>
          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(formInput.email, formInput.password);
              }}
            >
              {/* <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div> */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  value={formInput.email}
                  onChange={(e) =>
                    setFormInput((ps) => ({ ...ps, email: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type={checked ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="password"
                  value={formInput.password}
                  onChange={(e) =>
                    setFormInput((ps) => ({ ...ps, password: e.target.value }))
                  }
                />
              </div>
              <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Show Password
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-5 mb-5 w-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(formInput.email, formInput.password);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(formInput.email, formInput.password);
                  }}
                >
                  Login
                </button>
              </div>
              {/* <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                Not Registered?{" "}
                <a href="#" className="text-dark fw-bold">
                  {" "}
                  Create an Account
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
