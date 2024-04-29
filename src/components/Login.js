import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
function LoginPage(props) {
  const { handleLogin } = useAuth();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  return (
    <div className="login-wrapper">
      <main className="form-signin w-100 m-auto">
        <div className="card login-card" >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(formInput.email, formInput.password);
            }}
          >
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={formInput.email}
                onChange={(e) =>
                  setFormInput((ps) => ({ ...ps, email: e.target.value }))
                }
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={formInput.password}
                onChange={(e) =>
                  setFormInput((ps) => ({ ...ps, password: e.target.value }))
                }
              />
              <label htmlFor="floatingPassword">Password</label>
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
                Remember me
              </label>
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(formInput.email, formInput.password);
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
