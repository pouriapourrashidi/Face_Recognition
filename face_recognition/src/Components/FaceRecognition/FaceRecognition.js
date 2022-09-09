import React from "react";
import './FaceRecognition.css'

function FaceRecognition({Imageurl, box}){

    return(
        <div className="center pa2">
            <div className="absolute">
                <img id="inputimage" src={Imageurl} alt="" height='auto' width='500px' />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, left:box.leftCol, bottom: box.bottomRow}}></div>
            </div>
        </div>
    );    
}

export default FaceRecognition;