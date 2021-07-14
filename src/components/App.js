import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockChainData();
  }
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('No Ethereum Provider detected!')
    }
  }

  async loadBlockChainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    //alert(accounts)
    this.setState({ account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const NetworkData = Decentragram.networks[networkId]
    if (NetworkData){
      const decentragram = web3.eth.Contract(Decentragram.abi, NetworkData.address)
      this.setState({decentragram: decentragram})
      this.setState({imagesCount})
      const imagesCount = await decentragram.methods.imageCount().call()
      this.setState({loading:false})
    }else{
      window.alert('Decentragram Contract Not Deployed!')
    }
    
  }

    captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [],
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            // Code...
            captureFile = {this.captureFile}
            />
          }
        }
      </div>
    );
  }
}

export default App;