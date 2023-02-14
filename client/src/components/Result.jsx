import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Loading from './Loading';
import ReadMore from './ReadMore';

const Result = () => {

    const userDetail = JSON.parse(window.localStorage.getItem('userDetail'));
    const userId = userDetail._id;
    const bestScore = userDetail.bestScore;
    const overallScore = userDetail.overallScore;
    console.log('overallScore: ', overallScore);

    const history = useHistory();

    const [score, setScore] = useState([]);
    const [avgScore, setAvgScore] = useState(0);
    var { qResult: qRes, aResult: aRes, expAnswerIns: expAnswerRes } = history.location.state;
    // console.log('typeof(qRes): ', typeof (qRes));
    // console.log('typeof(aRes): ', typeof (aRes));
    // console.log('typeof(expAnswerRes): ', typeof (expAnswerRes));
    // const limitLen512 = (a) => {
    //     const ans = [];
    //     a.forEach((ele) => {
    //         ans.push(ele.slice(0, 512));
    //     })
    //     return ans;
    // }
    // qRes = limitLen512(qRes);
    // aRes = limitLen512(aRes);
    // expAnswerRes = limitLen512(expAnswerRes);
    const [qResult, setQresult] = useState(qRes);
    const [aResult, setAresult] = useState(aRes);
    const [aExpResult, setAEResult] = useState(expAnswerRes);
    // setQresult(qRes);
    // setAresult(aRes);
    // setAEResult(expAnswerRes);

    const computeResult = async () => {
        // e.preventDefault();
        if (qResult && aResult && aExpResult) {
            const res = await fetch('https://interview-score-api.vercel.app/computeScoreApi', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    qResult: aExpResult,
                    aResult: aResult
                })
            });
            console.log("result res: ", res);
            const { score: scoreRes, avgScore: avgScoreRes } = await res.json();
            setScore(scoreRes);
            setAvgScore(avgScoreRes);
            console.log('scoreRes: ', scoreRes);
            console.log('scoreRes-------> ', typeof (scoreRes));
            console.log('avgScoreRes: ', avgScoreRes);
            console.log('avgScoreRes-------> ', typeof (avgScoreRes));
            // console.log('avgScoreValEle: ', avgScoreValEle);
            // console.log('averageScoreValEle: ', averageScoreEle);
            console.log('score: ', score);
            console.log('avgScore: ', avgScore);

            // console.log(qResult, aResult, aExpResult);
            const resUpdateScore = await fetch('/result', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId, overallScore, bestScore, avgScore: avgScoreRes
                })
            });

            console.log(resUpdateScore);
        }
    }
    console.log('line no 39: ', qResult, aResult);
    useEffect(() => {
        // const averageScoreEle = document.getElementById('averageScore');
        const progressBar = document.querySelector('.scoreCircular-progress');
        const scoreValue = document.querySelector('.scoreValue');
        let progressValue = 0;
        let progressEndValue = avgScore;
        let speed = 20;

        if (avgScore === 0) {
            computeResult();
        } else if (avgScore && progressBar && scoreValue) {
            let progress = setInterval(() => {
                progressValue++;
                scoreValue.textContent = `${progressValue}%`;
                progressBar.style.background = `conic-gradient(green ${progressValue}%, white 0%)`;
                if (progressValue > progressEndValue) {
                    clearInterval(progress);
                }
            }, speed);
        }
    }, [avgScore]);

    // debugger
    return (avgScore === 0) ? (
        <>
            <Loading caption={`please wait your score is getting computed...`} />
        </>
    ) : (
        <>
            <div className='resultContainer'>
                <div className='resultHeading'>
                    <h1>The computed interview score</h1>
                </div>
                <div className='resultContainer2'>
                    <div className="scoreCircular-progress">
                        <div className="scoreValue">
                            0%
                        </div>
                        <div className='avgScoreCap'>
                            Average Score
                        </div>
                    </div>
                    <div className='scoreContainer' >
                        {
                            score && (score.map((curEle, ind) => {
                                return (
                                    <>
                                        <p>{ind + 1}.</p>
                                        <div className='qas' key={ind}>
                                            <p>Q:  {qResult[ind]}</p>
                                            <p>A:  {aResult[ind]}</p>
                                            <p>Score:  {curEle}%</p>
                                            <ReadMore>
                                                {`Expected Similar Ans -:- ${String(aExpResult[ind])}`}
                                            </ReadMore>
                                        </div>
                                    </>
                                )
                            }))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Result