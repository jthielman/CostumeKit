import React from 'react';

import outfitData from '../../../helpers/data/outfitData';

import './OneOutfit.scss';

class OneOutfit extends React.Component {
  state = {
    outfit: {},
  }

  getOutfit = (outfitId) => {
    outfitData.getOneOutfit(outfitId)
      .then((response) => {
        this.setState({ outfit: response });
        console.log(this.state.outfit);
      })
      .catch((err) => console.error('error in get outfit', err));
  }

  componentDidMount() {
    const { outfitId } = this.props.match.params;
    this.getOutfit(outfitId);
  }

  render() {
    const { outfitId } = this.props.match.params;
    const { outfit } = this.state;
    return (
      <div className="OneOutfit container">
        <h1>Single Outfit {outfitId} {outfit ? outfit.name : ''}</h1>
      </div>
    );
  }
}

export default OneOutfit;
