import React, { useState } from 'react';
import AuthService from '../../services/auth/AuthService';
import Form from 'react-bootstrap/Form';
import background from "../../assets/img/login-background.jpg";
import Spinner from 'react-bootstrap/Spinner';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginFailed(false);

    const response = await AuthService.login(email, password);

    if (!response.success) {
      setLoginFailed(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="background-div">
      <div className="left">
        <div className="content">
          <p className="text-start fs-2 fw-bold link">Vaccines register</p>
          <p className="text-start fs-5 fw-semibold text-secondary">
            Register and report for vaccinated employees
          </p>

          <Form onSubmit={handleSubmit} className={screenWidth <= 1024 ? "w-100 text-center" : "w-75 text-center"}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {
              !isLoading ? (
                <>
                  {loginFailed && (
                    <p className='mt-2 mb-2 text-danger'>Login failed. Try again</p>
                  )}
                  <button type="submit" className="mt-3 button">Login</button>
                  <a href="#" className="link">Forgot password</a>
                </>
              ) : (
                <Spinner animation="border" variant="info" className='mt-2' />
              )
            }
          </Form>
        </div>
      </div>
      <div
        className="right"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </div>
  );
};

export default Login;
