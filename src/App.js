import React from 'react';
import Modal from './Modal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false,
      value: "",
      breeds: [],
      selectBreed: "new cat",
      breedId: null,
      catImage: null
    }

    this.closeModal = this.closeModal.bind(this);
    this.changeBreed = this.changeBreed.bind(this);
    this.changeCatImage = this.changeCatImage.bind(this);
  };

  openModal = () => {
    this.setState({
      isModalOpen:true
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen:false
    });
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  changeBreed(newBreed) {
    this.setState({
      selectBreed: newBreed
    })

    console.log(this.state.selectBreed);
  }

  changeCatImage(){

    fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.selectBreed}`)
      .then((response) => response.json())
      .then((data) => this.setState({ breedId: data.id }))
    
    
    
    fetch(`https://api.thecatapi.com/images/search?breed_id=${this.state.breedId}`)
    .then((response) => response.json())
    .then((data) => this.setState({ catImage: data[0].url }));

  }
 

  componentDidMount() {
    let initialBreeds = [];
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data => {
        initialBreeds = data.map((x) => {
          return x.name
        });

        console.log(initialBreeds);
        this.setState({breeds: initialBreeds});

      })) 
    
    }

  render() {
    return(
      <div className="App">
        <Modal onChange={this.changeBreed} 
              show={this.state.isModalOpen} 
              handleClose={this.closeModal} 
              handleChange={this.handleChange} 
              selectValue={this.state.value} 
              choices={this.state.breeds}
        >
          <h1>Choose A Cat Breed</h1>
        </Modal>
        <button className="js-open-modal-button" onClick={this.openModal}>Open</button>
        <img 
            className= "cat-image" 
            alt="Cat"
            src={this.state.catImage}
        />
      </div>
      
    );
  }
}

export default App;
