import React from 'react'

const Modal = (props) => {
    return (
        <div className = 'modal'>
            <div className='img'>
                <img src={props.thumbnail}></img>
            </div >
            <div className='info'>
                <div className='author-title'>
                    <h2>{props.title}</h2>
                    <div className="authorName"> by {props.author}</div>
                </div>
                <div className='desc'>
                    <p>{props.desc}</p>
                </div>
            </div>   
        </div>
    )
}

export default Modal