import React, { useContext, useState } from 'react'

import { useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

import { UserContext } from '../App';
import Loading from './Loading';

import swal from 'sweetalert';

const Login = () => {

  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStarted, setLoginstarted] = useState(0);
  const [invalid, setInvalid] = useState(0);

  const loginUser = async (e) => {
    e.preventDefault();

    setLoginstarted(1);
    setInvalid(0);

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = res.json();

    if (!data || res.status === 400) {
      setInvalid(1);
      // window.alert("Invalid Credential");
      swal("     ",
        {
          title: "Invalid Credential",
          icon: "warning",
          buttons: false,
          timer: 1000
        });
    } else {
      dispatch({ type: "USER", payload: true })
      window.localStorage.setItem("isLoggedIn", true);
      console.log("state:", state);
      swal("     ",
        {
          title: "Logedin Successfully",
          icon: "success",
          buttons: false,
          timer: 1000
        });
      setLoginstarted(0);
      history.push("/about");
    }
  }

  return (loginStarted && !invalid) ? (
    <Loading caption={`Logging in...`} />
  ) : (
    <>
      <section className='section_login' style={{
        background: 'linear-gradient( 90deg, #51b9e2 0%, #0ecc74 100%)',
        // boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.7)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px', margin: '70px auto', borderRadius: '10px'
      }}>

        <div >

          <div className="title-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 className="title" style={{ color: 'white' }}>log in</h2>
          </div>

          <div className="login-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>

            <form method="POST" className="login-form" id="login-form">

              <div className="form-group">
                <label HtmlFor="email">
                  <MdEmail style={{ marginRight: '10px', color: 'white' }} />
                  <input type="email" name="email" id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group">
                <label HtmlFor="password">
                  <FaLock style={{ marginRight: '10px', color: 'white' }} />
                  <input type="password" name="password" id="password" autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group form-button" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input type="submit" name="login" id="login" className="form-submit" value="login" style={{
                  color: 'white', background: 'linear-gradient( 90deg, green 0%, green 100%)',
                  // boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.7)',
                  borderRadius: '10px', border: 'none', height: '33px', width: '90px'
                }}
                  onClick={loginUser}
                />
              </div>

            </form>
          </div >
          <p
            style={{ color: 'red', marginLeft: '20%', marginTop: '10%' }}
          >{invalid ? `Invalid Credential` : ``}</p>
        </div>
      </section >
    </>
  )
}

export default Login
