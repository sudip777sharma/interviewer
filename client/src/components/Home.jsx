import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Home = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const startPracticeHandle = () => {
        const isLoggedIn = window.localStorage.getItem('isLoggedIn');
        if (state || isLoggedIn) {
            history.push('/practice');
        } else {
            history.push('/login');
        }
    }

    const RenderHome = () => {
        return (
            <>
                <div className='home_container'>
                    <div>
                        <h1 className='home_about'>Interviewing: the most </h1>
                        <h1 className='home_about'> profitable skills you learn</h1>
                        <h1 className='home_about'>Don't miss out on a great job opportunity</h1>
                        <h1 className='home_about'>Practice live interviews with AI</h1>
                    </div>
                    <div>
                        <button className='start_practice_button' onClick={startPracticeHandle}>start practicing for free</button>
                        <p>My Interviewer is safe and your data is secure</p>
                    </div>
                </div>
            </>
        )
    }
    return (
        <RenderHome />
    )
}

export default Home