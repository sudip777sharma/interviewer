import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { BsPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa'
import Loading from './Loading';
import swal from 'sweetalert';

const Signup = () => {

  const history = useHistory();

  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });

  const [registerationStarted, setRegistrartionStated] = useState(0);
  const [invalid, setInvalid] = useState(0);

  let key, value;
  const handleInput = (e) => {
    console.log("---Signup.js------------------------------------");
    console.log(e);
    console.log("------------------------------------Signup.js---");
    key = e.target.name;
    value = e.target.value;

    setUser({ ...user, [key]: value });
  }

  const postUserData = async (e) => {
    e.preventDefault();

    setRegistrartionStated(1);
    setInvalid(0);

    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })

    });

    const data = await res.json();
    console.log("---Signup.js------------------------------------");
    console.log(data)
    console.log("------------------------------------Signup.js---");

    if (res.status === 422 || !data) {
      // window.alert("Invalid Registeration.");
      swal("     ",
        {
          title: "Invalid Registeration",
          icon: "warning",
          buttons: false,
          timer: 1000
        });
      setInvalid(1);
      console.log("---Signup.js------------------------------------");
      console.log("Invalid Registeration.");
      console.log("------------------------------------Signup.js---");

    } else {
      // window.alert("Registeration succesfull.");
      swal("Registeration Succesfull.", {
        icon: "success",
        buttons: false,
        timer: 1000
      });
      console.log("---Signup.js------------------------------------");
      console.log("Registeration succesfull.");
      console.log("------------------------------------Signup.js---");

      setRegistrartionStated(0);
      history.push("/login");
    }

  }

  return (registerationStarted && !invalid) ? (
    <Loading caption={`Registering in...`} />
  ) : (
    <>
      <section className='section_signup' style={{
        background: 'linear-gradient( 90deg, #51b9e2 0%, #0ecc74 100%)',
        // boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.7)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', margin: '30px auto', borderRadius: '10px'
      }}>
        <div >

          <div className="title-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 className="title"
              style={{ color: 'white' }}
            >sign up</h2>
          </div>

          <div className="signup-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>

            <form method="POST" className="signup-form" id="signup-form">

              <div className="form-group" >
                <label htmlFor="name">
                  <BsPersonFill style={{ marginRight: '10px', color: 'white' }} />
                  <input type="text" name="name" id="name" autoComplete="off"
                    value={user.name}
                    onChange={handleInput}
                    placeholder="Your full name"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="email">
                  <MdEmail style={{ marginRight: '10px', color: 'white' }} />
                  <input type="email" name="email" id="email" autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Your email"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone style={{ marginRight: '10px', color: 'white' }} />
                  <input type="Integer" name="phone" id="phone" autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Your phone"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="work">
                  <MdWork style={{ marginRight: '10px', color: 'white' }} />
                  <input type="text" name="work" id="work" autoComplete="off"
                    value={user.work}
                    onChange={handleInput}
                    placeholder="Your work"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock style={{ marginRight: '10px', color: 'white' }} />
                  <input type="password" name="password" id="password" autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Your password"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="cpassword">
                  <FaKey style={{ marginRight: '10px', color: 'white' }} />
                  <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInput}
                    placeholder="Your confirm password"
                    style={{ background: 'linear-gradient( 90deg, white 0%, white 100%)', color: 'black', border: '1px solid white', borderRadius: '8px' }}
                  />
                </label>
              </div>
              <br />

              <div className="form-group form-button" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input type="submit" name="signup" id="signup" className="form-submit" value="Register"
                  onClick={postUserData}
                  style={{
                    color: 'white', background: 'linear-gradient( 90deg, green 0%, green 100%)', borderRadius: '10px', border: 'none',
                    // boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.7)',
                    height: '33px', width: '110px'
                  }} />
              </div>

            </form>

          </div >
          <p
            style={{ color: 'red', marginLeft: '0%', marginTop: '5%', textAlign: 'center' }}
          >{invalid ? `Invalid registration or user already exits` : ``}</p>
        </div>
      </section >
    </>
  )
}

export default Signup
