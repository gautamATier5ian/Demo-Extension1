import React from 'react'
class Eye extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timer  : false,
      timeInMinutes : 0,
      timeInSeconds : 0,
      final : 0,
      start : false,
      intervalId : false
    
    }
  }

  format = (time) => {   
      // Hours, minutes and seconds
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
  }
  onSubmit =() => {
    
        this.setState({
      timer         : true,
      start : true,
      timeInMinutes : this.state.timeInMinutes,
      timeInSeconds : this.state.timeInMinutes * 60
      

    })
  }

  componentDidMount(){
    let intervalId = setInterval(this.timer,1000)
    this.setState({
      intervalId : intervalId
    })
  }


  componentWillUpdate(){
    if(this.state.start){
      let intervalId = setInterval(this.timer,1000)
      this.setState({
        intervalId : intervalId
      })
    }
  }
timer = () => {
  // let _this = this
  // const interval = setInterval(function(){
  //  if("0:00" == _this.state.final.toString()){
  //       alert("Its Time To take care of your eye")
  //      return clearInterval(interval)
  //     }
  //   let x = _this.state.timeInSeconds - 1
  //   _this.setState({
  //     timeInSeconds    : x,
  //     final            : _this.format(x)
  //   })
  //  },1000)

   if(this.state.start > 0) {
    console.log("state",this.state)

    if("0:00" == this.state.final.toString()){
      alert("Its Time To take care of your eye")
      this.setState({
        start :false
      })

      return clearInterval(this.state.intervalId)      
    }

  let x = this.state.timeInSeconds - 1
  this.setState({
    timeInSeconds    : x,
    final            : this.format(x)
  })
   }
  }

  changeSlider = (e) => {
    console.log("eee",e.target.value)
    this.setState({
      timeInMinutes : e.target.value
    })
  }


  render() {
    return (
      <div>
      <div class="slidecontainer">
        <input type="range" min="1" max="10" onChange={(e)=>this.changeSlider(e)} value={this.state.timeInMinutes} class="slider" id="myRange"/>
        Set Timer : {this.state.timeInMinutes} minutes
      </div>
        <button onClick = {this.onSubmit }>Submit</button>
        {this.state.timer? this.timer && <span style={{"color" : "red"}}>Time Left :    {this.state.final} <br/></span>:' '}
      </div>
    )
  }
}
export default Eye