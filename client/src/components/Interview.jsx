import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Webcam from 'react-webcam';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaUserTie } from "react-icons/fa";
import { GiAbstract069 } from "react-icons/gi";
import { BiReset } from 'react-icons/bi'
import { VscDebugStart } from 'react-icons/vsc'
import { MdOutlineDoneOutline } from 'react-icons/md'


import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import '../VoiceAnim.css'

const videoConstraints = {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  facingMode: "user"
};

// function sleep1(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// function sleep2(delay) {
//   var start = new Date().getTime();
//   while ((new Date().getTime()) < start + delay);
// }

const Interview = () => {

  const history = useHistory();
  let { questionIns, expAnswerIns } = history.location.state;
  // console.log('questionIns: ', questionIns);
  // console.log('expAnswerIns: ', expAnswerIns);
  const [questions, setQuestions] = useState(questionIns);

  const webcamRef = React.useRef(null);

  const [qResult, setQresult] = useState([]);
  const [aResult, setAresult] = useState([]);

  const [currQuestion, setCurrQuestion] = useState('');

  const [started, setStarted] = useState(false);

  const [Qno, setQno] = useState(0);

  const alreadyStartedInterview = () => {
    console.log('already started the interview');
    console.log('started: ', started);
  }

  const commands = [
    {
      command: ['that\'s it', 'done', 'skip'],
      callback: (command, spokenPhrase, similarityRatio) => (similarityRatio * 100) > 60 ? (SpeechRecognition.stopListening()) : '',
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['that\'s it', 'done', 'skip'],
      callback: () => SpeechRecognition.stopListening(),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
  ]


  let circle = document.getElementById('circle');
  let circle1 = document.getElementById('circle1');
  let bar1 = document.getElementById('bar1');
  let bar2 = document.getElementById('bar2');
  let bar3 = document.getElementById('bar3');

  const startVoiceAnim = () => {
    if (circle) {
      bar1.classList.add('bar1');
      bar2.classList.add('bar2');
      bar3.classList.add('bar3');
      circle.classList.remove('animateCircle');
      circle1.classList.remove('animateCircle1');
    }
  }

  const stopVoiceAnim = () => {
    if (circle) {
      bar1.classList.remove('bar1');
      bar2.classList.remove('bar2');
      bar3.classList.remove('bar3');
      circle.classList.add('animateCircle');
      circle1.classList.add('animateCircle1');
    }
  }


  const setNextQuestion = () => {
    if (questions) {
      setQresult(current => [...current, questions[0]]);
      const newQuestion = questions.filter(item => item !== questions[0]);
      setQuestions(newQuestion);
      resetTranscript();
    }
  }

  const onEnd = () => {
    try {
      stopVoiceAnim();
    } catch (err) {
      console.log(err);
    }
    SpeechRecognition.startListening({ continuous: true });
    console.log('listening: ', listening);
    setNextQuestion();
    setCurrQuestion(questions[0]);
  }

  const speakNextQeustion = () => {
    // wait(3000);
    if (questions) {
      if (started) {
        if (Qno < 5)
          setQno(() => (Qno + 1));
        setAresult(current => [...current, transcript]);
      }
      SpeechRecognition.stopListening();
      speak({ text: questions[0] })
      // setStarted(true);
      try {
        startVoiceAnim();
      } catch (err) {
        console.log(err);
      }
    }
  }

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({ onEnd });


  useEffect(() => {
    if (questions.length !== 0 && !listening && !speaking) {
      console.log(questions);
      speakNextQeustion();
    } else if (questions.length === 0) {
      SpeechRecognition.abortListening();
      // aResult.shift();
      qResult.pop();
      history.push('/result', { qResult, aResult, expAnswerIns });
      const newQuestion = questions.filter(item => item !== questions[0]);
      setQuestions(newQuestion);
      console.log(aResult);
    }
  }, [questions, listening, speaking]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // debugger;

  return (
    <>
      <div className='interview_container'>
        <div className='interview_ivu'>

          <div className='interviewer'>
            <h1 className='interviewer_h1' ><GiAbstract069 /> interviewer</h1>
            <p className='interviewer_content'>{speaking ? 'fetching Question data...' : ((currQuestion && started) ? currQuestion : 'Question asked by the interviwer will appear here!')}</p>
          </div>

          <div className='interview_video_container'>
            {
              (window.screen.width <= 600) ? (
                <Webcam
                  className='interview_video'
                  audio={false}
                  height={180}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  videoConstraints={videoConstraints}
                />

              ) : (<Webcam
                className='interview_video'
                audio={false}
                height={271}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                videoConstraints={videoConstraints}
              />
              )
            }
          </div>

          <div className='user'>
            <h1 className='user_h1' ><FaUserTie /> user</h1>
            <p className='user_content'>{transcript ? transcript : 'your answer will appear here while you speak...'} </p>
          </div>

        </div>

        <div className='tools'>

          <div className='status'>
            Status
            <p className='question_no'>Question No: {Qno}</p>
          </div>

          <div className='interviwer_voice'>
            {/* <VoiceAnim /> */}
            <div id="voiceAnim">
              <div id="myCircle">
                <div id="mainCircle">
                  <div id="circle" className="circle"></div>
                  <div id="circle1" className="circle1"></div>
                  <div id="mainContent">
                    <ul className="bars">
                      <li className="bar" id="bar1"></li>
                      <li className="bar" id="bar2"></li>
                      <li className="bar" id="bar3"></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='user_tools_container'>
            <p className='interviewer_listen_status'>Interviewer: {listening ? 'listening...' : 'Not listening'}</p>
            <div className='user_tools_container_inner'>

              <p className='tools_item' onClick={resetTranscript}>
                <BiReset />
                <br />
                Reset
              </p>

              <p className='tools_item' onClick={started ? alreadyStartedInterview : () => { setStarted(true); speakNextQeustion(); }}>
                <VscDebugStart />
                <br />
                Start
              </p>

              <p className='tools_item' onClick={() => SpeechRecognition.stopListening()}>
                <MdOutlineDoneOutline />
                <br />
                Done
              </p>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Interview
