import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Clarifai from 'clarifai'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Component, useCallback } from "react";
import {BackgroundParticl} from './particle';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

// import {BackgroundParticl, particlesInit, particlesLoaded} from './particle';



const InitialState={
  data:'',
  Imageurl:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state=InitialState;
  }
loadUser =(data)=>{
    console.log("In loaduser");
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    }})
    console.log(this.state.user);

  }  


onClick=()=>{
    this.setState({Imageurl:this.state.data});
    console.log("click");
    fetch('http://localhost:3002/imageurl', {method:'post', headers:{'content-type':'application/json'},body:JSON.stringify({
          input:this.state.Imageurl
      })}).then(response=> response.json())
    .then(response => {
      if (response){
        console.log(this.state.user.id);
        fetch('http://localhost:3002/image', {method:'put', headers:{'content-type':'application/json'},body:JSON.stringify({
          id:this.state.user.id
      })}).then(response => response.json()).then(data=>{
        this.setState(Object.assign(this.state.user, {entries:data}))
      })
      }
      console.log(this.state.user.entries);
      this.displayFaceBox(this.FaceLocation(response))
    }). catch(err => console.log(err));
}

  particlesInit = async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
  
    await loadFull(engine);
  };
  
  particlesLoaded = async (container) => {
    await console.log(container);
  };

  FaceLocation = (data) => {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width= Number(image.width);
    const height=Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=>{
    console.log(box);
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({data:event.target.value});
  }


  onRouteChange = (route)=>{
    if (route==='home'){
      this.setState({isSignedIn:true})
    }
    else{
      this.setState(InitialState);
    }
    this.setState({route:route})
    console.log('Helooo')
  }

  
  render(){
    
    return (
      <div className="App">
        <Particles className='particles'
              id="tsparticles"
              init={this.particlesInit}
              loaded={this.particlesLoaded}
              options={BackgroundParticl}
          />
        <div className=''><Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/></div>
        {this.state.route==='signin' ? <div className='ma6'><SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/></div>
         :( this.state.route === 'home'
         ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onClick={this.onClick}/>
          <FaceRecognition box={this.state.box} Imageurl={this.state.Imageurl}/> </div> : <div  className='ma6'><Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/></div>)}
      </div>
    );}
}

export default App;
