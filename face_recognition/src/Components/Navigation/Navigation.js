import React from "react";

function Navigation({isSignedIn, onRouteChange}){

    if(isSignedIn){
        return(
            <nav className="tr">
                <p onClick={()=>onRouteChange('signin')} className="ma3 pointer underline black dim link f3">Sign Out</p>
            </nav>
        );  
    }
    else{
        return(
            <nav className="tr dtc fr">
                <p onClick={()=>onRouteChange('signin')} className="ma3 pointer underline black dim link f3 dib">Sign In</p>
                <p onClick={()=>onRouteChange('register')} className="ma3 pointer underline black dim link f3 dib">Register</p>
            </nav>
        );

    }
      
}

export default Navigation