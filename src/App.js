import React from 'react';
import Modal from "react-modal";

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false,
      breeds: [],
      selectedBreed: "",
      breedId: null,
      catImage: null,
      loading: false,
    }

    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  }

  async closeModal() {
    this.setState({
      isModalOpen: false,
      loading: true,
      catImage: null
    });

    await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.selectedBreed}`)
    .then((response) => response.json())
    .then((data) => this.setState({ breedId: data[0].id }));

    console.log(this.state.breedId)
    
    await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`)
    .then((response) => response.json())
    .then((data) => this.setState({ catImage: data[0].url}));

    console.log(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`);
    console.log(this.state.catImage);

    this.setState({ selectedBreed: "", loading: false });
  }

  handleChange = (e) => {
    this.setState({
      selectedBreed: e.target.value
    });

    console.log(this.state.selectedBreed);
  }

  componentDidMount() {
    let initialBreeds = [];
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data => {
        initialBreeds = data.map((x) => {
          return x.name
        });

        this.setState({breeds: initialBreeds});
    }));
  }

  render(){
    return(
      <div className="App">
        <button className="js-open-modal-button" onClick={ this.openModal }></button>
        <Modal isOpen = { this.state.isModalOpen }>
          <h1 className="js-modal-title">Choose Your Favorite Cat Breed</h1>
          <select className='js-select-cat-breed-menu' onChange={ this.handleChange } value = { this.state.selectedBreed }>
                <option>Choose One...</option>
                {this.state.breeds.map(breed => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                ))}
          </select>
          <div className="close-button-div">
            {this.state.selectedBreed && <button className="js-close-modal-button" onClick={ this.closeModal }>{ `Show me ${this.state.selectedBreed}`}</button>}
          </div>
        </Modal>
        <div className="cat-box">
          {this.state.loading && <img className="loading-symbol" alt="loading" src={"https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"}/>}
          {this.state.catImage && <img className="js-image-of-cat" src={this.state.catImage} alt="Cat" />}
        </div>
      </div>
    );
  }
}

export default App;