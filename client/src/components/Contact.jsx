import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md'
// import { RiMessage2Fill } from "react-icons/ri";
import { FaPhone } from 'react-icons/fa';
const Contact = () => {

  return (
    <>
      <div className='contact_container'>
        <div className='contact_heading'>
          <h1 className='contact_heading_h1'>Contact us</h1>
        </div>
        <div className='contactBody'>
          <div className='contactBodyItem'>
            <MdEmail />
            <label htmlFor="email">sudipXXXsharma@gmail.com</label>
          </div>
          <div className='contactBodyItem'>
            <FaPhone />
            <label htmlFor="email">+918280xxxx77</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact