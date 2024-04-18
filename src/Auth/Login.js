import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        toast.error(data.error);
        return;
      }

      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');

      toast.success('Login successful');

    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameTouched(true);
    setFormValid(e.target.value.trim() && password.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
    setFormValid(username.trim() && e.target.value.trim());
  };

  return (
    <main>
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="./assets/images/logo.svg" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="yourUsername"
                      placeholder="Email"
                      value={username}
                      onChange={handleUsernameChange}
                      onBlur={() => setUsernameTouched(true)}
                      required
                    />
                    {usernameTouched && !username.trim() && <div className="text-danger">Email is required</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="yourPassword"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={() => setPasswordTouched(true)}
                      required
                    />
                    {passwordTouched && !password.trim() && <div className="text-danger">Password is required</div>}
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                      disabled={!formValid}
                    >
                      LOGIN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <Link to="#" className="auth-link text-black">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="ti-envelope mr-2" />
                      Connect using Gmail
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/signup" className="text-primary">Create</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Login;
