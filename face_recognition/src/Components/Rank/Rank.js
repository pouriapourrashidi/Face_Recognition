import React from "react";
 

function Rank({name, entries}){

    return(
        <div>
            <div  className='f3 black'>
               {name.charAt(0).toUpperCase()+name.slice(1)} Your Rank Is 
            </div>
            <div  className='f3 black'>
                {entries}
            </div>    
        </div>
    );    
}

export default Rank

