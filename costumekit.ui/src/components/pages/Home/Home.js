import React from 'react';
import './Home.scss';

import outfitData from '../../../helpers/data/outfitData';

class Home extends React.Component {
  state = {
    outfits: [],
  }

  getOutfits = () => {
    outfitData.getUserOutfits(1)
      .then((outfits) => this.setState({ outfits }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getOutfits();
  }

  render() {
    return (
      <div className="Home container">
        <h2>Got your home page right here</h2>
        <div className="row">
          {this.state.outfits.map((outfit) => {
            return (
              <div className="card" key={outfit.id}>
                <div className="card-body">
                  <h5 className="card-title">{outfit.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p className="card-text">{outfit.description}</p>
                  {/* <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
