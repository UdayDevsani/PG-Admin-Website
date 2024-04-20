import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      toast.success('Signup successful');

      // Clear form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmailTouched(false);
      setPasswordTouched(false);
      setConfirmPasswordTouched(false);

    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailTouched(true);
    setFormValid(e.target.value.trim() && password.trim() && confirmPassword.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
    setFormValid(email.trim() && e.target.value.trim() && confirmPassword.trim());
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
    setFormValid(email.trim() && password.trim() && e.target.value.trim());
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
                <h4>Welcome! Create an account</h4>
                <form className="pt-3" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="yourEmail"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => setEmailTouched(true)}
                      required
                    />
                    {emailTouched && !email.trim() && <div className="text-danger">Email is required</div>}
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
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      onBlur={() => setConfirmPasswordTouched(true)}
                      required
                    />
                    {confirmPasswordTouched && !confirmPassword.trim() && <div className="text-danger">Please confirm password</div>}
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                      disabled={!formValid}
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
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

export default Signup;
