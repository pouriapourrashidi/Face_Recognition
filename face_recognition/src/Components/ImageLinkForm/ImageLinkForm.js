import React from "react";
import './ImageLinkForm.css'
 

function ImageLinkForm(){

    return(
        <div  className='Center'>
            <p className="f3">
                Enter Your Link to See How It Works!
            </p>
            <div className="">
                <input className='f4 pa2 ma2 Input' placeholder="Put Your Image Here!" type='text'/>
                <button className="link f3 black grow ph3 pv2 dib Button">Submit</button>
            </div>

        </div>
    );    
}

export default ImageLinkForm

