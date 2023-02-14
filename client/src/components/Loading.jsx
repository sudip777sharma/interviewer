import React from 'react'
import '../loading.css'

const Loading = ({caption}) => {
    return (
        <>
            <div className="container">
                <div className="wraper">
                    <div className='loader'>
                        <div className='element'></div>
                    </div>
                    <div className='loader'>
                        <div className='element'></div>
                    </div>
                    <div className='loader'>
                        <div className='element'></div>
                    </div>
                    <div className='loader'>
                        <div className='element'></div>
                    </div>
                    <div className='loader'>
                        <div className='element'></div>
                    </div>
                    <div className='loader'>
                        <div className='element'></div>
                    </div>
                </div>
                <div className="title">{caption}</div>
            </div>
        </>

    )
}

export default Loading