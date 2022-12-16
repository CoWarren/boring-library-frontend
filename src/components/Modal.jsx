

const Modal = (props) => {
    console.log("modal")
    return (
        <div className = 'modal'>
            <div className='img'>
                <img src={props.thumbnail}></img>
            </div >
            
            <div className='info'>
                <div className='author-title'>
                    <h2>Title: {props.title}</h2>
                    <div className="authorName">by {props.author}</div>
                </div>
                <div className='desc'>
                    <p>{props.desc}</p>
                </div>

            </div>   
        </div>
    )
}

export default Modal