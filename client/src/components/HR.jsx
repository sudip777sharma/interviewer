import React from 'react'
import { useHistory } from 'react-router-dom';

const HR = () => {

  const history = useHistory();

  const startHrInterview = () => {
    history.push('/instruction');
  }
  return (
    <>
      <h1>this is technical section</h1>
      <button onClick={startHrInterview}>start HR Interview</button>
    </>
  )
}

export default HR