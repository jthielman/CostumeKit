import React from 'react';

import outfitData from '../../../helpers/data/outfitData';
import garmentData from '../../../helpers/data/garmentData';

import './OneOutfit.scss';

class OneOutfit extends React.Component {
  state = {
    outfit: {},
    garments: [],
  }

  getOutfit = (outfitId) => {
    outfitData.getOneOutfit(outfitId)
      .then((response) => this.setState({ outfit: response }))
      .catch((err) => console.error('error in get outfit', err));
  }

  getGarments = (outfitId) => {
    garmentData.getGarmentsByOutfitId(outfitId)
      .then((response) => this.setState({ garments: response }))
      .catch((err) => console.error('error in get garments', err));
  }

  componentDidMount() {
    const { outfitId } = this.props.match.params;
    this.getOutfit(outfitId);
  }

  render() {
    // const { outfitId } = this.props.match.params;
    const { outfit } = this.state;
    return (
      <div className="OneOutfit container">
        <div className="row d-flex justify-content-center align-items-baseline">
          <h2 className="col-4">{outfit ? outfit.name : ''}</h2>
          <p className="outfit-description col">{outfit.description}</p>
        </div>
        <h3>Garments:</h3>
      </div>
    );
  }
}

export default OneOutfit;
