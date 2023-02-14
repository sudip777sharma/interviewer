import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App';
import Loading from './Loading';

const About = () => {

  const history = useHistory();

  const [userData, setUserData] = useState({});

  const [fetchingData, setFetchingData] = useState(0);

  const { state, dispatch } = useContext(UserContext);

  const callAboutPage = async () => {
    try {

      setFetchingData(1);
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      const data = await res.json();
      window.localStorage.setItem("userDetail", JSON.stringify(data));
      setUserData(data);
      console.log("---About.js------------------------------------");
      console.log(" data ==> ", data);
      console.log("------------------------------------About.js---");

      setFetchingData(0);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log("---About.js------------------------------------");
      console.log(" catch error ==> ", err);
      console.log("------------------------------------About.js---");
      history.push('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  return (fetchingData) ? (
    <Loading caption={`fetching data...`} />
  ) : (
    <section className='section_about' style={{ background: 'linear-gradient( 90deg, #51b9e2 0%, #0ecc74 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '70px auto', borderRadius: '10px' }}>
      <div style={{ paddingLeft: '10%' }}>
        <div style={{ border: '0px solid red', width: '47.89em', height: '60px', color: 'white', marginBottom: '15px', marginLeft: '-9.82rem', marginTop: '1.0rem', borderRadius: '10px 10px 0px 0px', textAlign: 'center' }}>
          <h1>profile</h1>
        </div>
        <div style={{ color: 'black', display: 'grid', marginTop: '-1rem' }}>
          <div className='aboutDiv_attribute' style={{ height: '50px', border: '0px solid red', display: "flex", flexDirection: 'row' }}>
            <h4 className='aboutUser_attribute' style={{ border: '0px solid blue', width: '35%' }}>
              Name:
            </h4>
            <h4 style={{ border: '0px solid blue', width: '50%', textAlign: 'left' }}>
              {userData.name}
            </h4>
          </div>

          <div className='aboutDiv_attribute' style={{ height: '50px', border: '0px solid red', display: "flex", flexDirection: 'row' }}>
            <h4 className='aboutUser_attribute' style={{ border: '0px solid blue', width: '35%' }}>
              UserId:
            </h4>
            <h4 style={{ border: '0px solid blue', width: '50%', textAlign: 'left' }}>
              {userData._id}
            </h4>
          </div>

          <div className='aboutDiv_attribute' style={{ height: '50px', border: '0px solid red', display: "flex", flexDirection: 'row' }}>
            <h4 className='aboutUser_attribute' style={{ border: '0px solid blue', width: '35%' }}>
              email:
            </h4>
            <h4 style={{ border: '0px solid blue', width: '50%', textAlign: 'left' }}>
              {userData.email}
            </h4>
          </div>

          <div className='aboutDiv_attribute' style={{ height: '50px', border: '0px solid red', display: "flex", flexDirection: 'row' }}>
            <h4 className='aboutUser_attribute' style={{ border: '0px solid blue', width: '35%' }}>
              Work:
            </h4>
            <h4 style={{ border: '0px solid blue', width: '50%', textAlign: 'left' }}>
              {userData.work}
            </h4>
          </div>

          <div className='aboutDiv_attribute' style={{ height: '50px', border: '0px solid red', display: "flex", flexDirection: 'row' }}>
            <h4 className='aboutUser_attribute' style={{ border: '0px solid blue', width: '35%' }}>
              OverAll Score:
            </h4>
            <h4 style={{ border: '0px solid blue', width: '50%', textAlign: 'left' }}>
              {userData.overallScore}%
            </h4>
          </div>

          <div className='aboutDiv_attribute' style={{ height: '50px', border: '0px solid red', display: "flex", flexDirection: 'row' }}>
            <h4 className='aboutUser_attribute' style={{ border: '0px solid blue', width: '35%' }}>
              Best Score:
            </h4>
            <h4 style={{ border: '0px solid blue', width: '50%', textAlign: 'left' }}>
              {userData.bestScore}%
            </h4>
          </div>
          {/* <h3>Name: {userData.name}</h3>
          {/* <h3>Name: {userData.name}</h3>
        <h3>User-Id: {userData._id}</h3>
        <h3>Username: {userData.email}</h3>
        <h3>work: {userData.work}</h3>
        <h3>Interview Score: 89%</h3> */}
        </div>
      </div>
    </section >
  )
}

export default About