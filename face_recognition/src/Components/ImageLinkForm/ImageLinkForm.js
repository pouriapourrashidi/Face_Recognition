import React from "react";
import './ImageLinkForm.css'
 

function ImageLinkForm({onInputChange, onClick}){

    // console.log('in image link form');
    return(
        <div  className='Center'>
            <p className="f3">
                Enter Your Link to See How It Works!
            </p>
            <div className="">
                <input className='f4 pa2 ma2 Input' placeholder="Put Your Image Here!" type='text' onChange={onInputChange}/>
                <button className="link f3 black grow ph3 pv2 dib Button" onClick={onClick}>Submit</button>
            </div>

        </div>
    );    
}

export default ImageLinkForm

