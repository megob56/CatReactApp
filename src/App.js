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
      isModalOpen: false
    });

    await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.selectedBreed}`)
    .then((response) => response.json())
    .then((data) => this.setState({ breedId: data[0].id }));

    console.log(this.state.breedId)
    
    await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.state.breedId}`)
    .then((response) => response.json())
    .then((data) => this.setState({ catImage: data[0].url }));

    console.log(this.state.catImage)
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

        // console.log(initialBreeds);
        this.setState({breeds: initialBreeds});
    }));
  }

  render(){
    return(
      <div>
        <Modal isOpen = { this.state.isModalOpen }>
          <button className="js-close-modal-button" onClick={ this.closeModal }>Close</button>
          <h1 className="js-modal-title">Choose Your Favorite Cat Breed</h1>
          <select className='js-select-cat-breed-menu' onChange={ this.handleChange } value = { this.state.selectedBreed }>
                {this.state.breeds.map(breed => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                ))}
          </select>
        </Modal>
        <button className="js-open-modal-button" onClick={ this.openModal }>Open</button>
        <img className="js-image-of-cat" src={this.state.catImage} alt="Cat" />
      </div>
    );
  }
}

export default App;