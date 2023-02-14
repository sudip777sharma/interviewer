import React, { useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../App';
import Loading from './Loading';

const Instruction = () => {

    const { state, dispatch } = useContext(UserContext);

    const ins_point = [
        'You must use a functioning webcam and microphone',
        'No cell phones or other secondary devices in the room or test area',
        'Your desk/table must be clear or any materials except your test-taking device',
        'No one else can be in the room with you',
        'No talking ',
        'The testing room must be well-lit and you must be clearly visible',
        'No dual screens/monitors',
        'Do not leave the camera ',
        'No use of additional applications or internet',
        'You must use a good headphone/hearphone'
    ]

    const location = useLocation();
    const topic = location.state;
    const history = useHistory();

    const [setupStarted, setSetupStarted] = useState(false);

    const Interview = async (e) => {
        e.preventDefault();

        setSetupStarted(true);

        const res = await fetch("/instruction", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                qaType: topic
            })
        });

        let data = await res.json();
        console.log('typeof(data): ', typeof (data));
        data = data.qa.qaData;
        let qa = [];
        for (const key in data) {
            qa.push(data[key]);
        }
        let numQa = 4;
        let qaShuffled = qa.sort(() => 0.5 - Math.random());
        qaShuffled = qaShuffled.slice(0, numQa);
        // console.log(qaShuffled);
        const getGreetings = () => {
            var d = new Date();
            var time = d.getHours();
            console.log("time: ", time)
            if (time <= 12) {
                return `Good morning`;
            } else if (time <= 17) {
                return `Good afternoon`;
            } else if (time <= 23) {
                return `Good evening`;
            }
        }
        console.log("getGreetings: ", getGreetings());
        let userDetail = JSON.parse(window.localStorage.getItem("userDetail"));
        console.log('userName: ', userDetail);
        let userName = String(userDetail.name);
        userName = userName.split(' ');
        userName = userName[0];

        let questionIns = [`${getGreetings()} ${userName}, tell me about yourself ?`];
        let expAnswerIns = [`${getGreetings()} mam, my self ${userName}`];
        for (let i = 0; i < numQa; i++) {
            questionIns.push(qaShuffled[i].question);
            expAnswerIns.push(qaShuffled[i].answer);
        }
        questionIns.push(`your interview score is getting computed`);
        console.log(questionIns);
        console.log(expAnswerIns);

        setSetupStarted(false);

        history.push('/interview', { questionIns, expAnswerIns });
    }

    return (setupStarted) ? (
        <Loading caption={`setting up for interview...`} />
    ) : (
        <>
            <div className='ins_container'>
                <div className='ins_heading'>
                    <h1>Instruction for {topic} Interview</h1 >
                </div >
                <div className='ins_point_container'>
                    <ul>
                        {
                            ins_point.map((curEle, ind) =>
                                <li key={ind}>{curEle}</li>
                            )
                        }
                    </ul>
                </div>
                <button className='start_interview_btn' onClick={Interview} >Start Interview</button>
            </div >
        </>

    )
}

export default Instruction