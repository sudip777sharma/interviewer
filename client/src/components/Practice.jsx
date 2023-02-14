import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import Loading from './Loading';

const Practice = () => {

    const history = useHistory();

    const [topics, setTopics] = useState([]);
    const [companies, setCompanies] = useState([]);

    const qaSource = 'dataBase';
    const getData = async () => {
        const res = await fetch("/practice", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                qaSource: qaSource
            })
        });
        const data = await res.json();
        console.log('data: ', data);
        if (qaSource === 'webScrape') {
            const { topics: topicsRes, companies: companiesRes } = data;
            setTopics(topicsRes);
            setCompanies(companiesRes);
        } else if (qaSource === 'dataBase') {
            const { topics: topicsRes } = data;
            topicsRes.sort((a, b) => {
                return (a.topicName).localeCompare(b.topicName);
            })
            setTopics(topicsRes);
        }
    }

    const { state, dispatch } = useContext(UserContext);

    const onClickTopic = (topic) => {
        const isLoggedIn = window.localStorage.getItem('isLoggedIn');
        if (state || isLoggedIn) {
            // history.push(`/${topic.topic}`);
            history.push('/instruction', `${topic.topicName}`);
        } else {
            history.push('/login')
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (topics.length === 0) ? (
        <Loading caption={`fetching data...`} />
    ) : (
        <>
            <div className='practice_container'>
                <div className='practice_heading_container'>
                    <h1 className='practice_heading'>practice Interview now</h1>
                </div>
                <div className='topic_container'>
                    {
                        topics.map((curEle, ind) => (
                            <div key={ind} className='topic_item' onClick={() => onClickTopic(curEle)}>
                                <div>
                                    <h1 className='topic_item_h1'>{(curEle.topicName)}</h1>
                                    {/* <p className='topic_item_p'>{curEle.topicAbout}</p> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Practice