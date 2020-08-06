import React from 'react';

import outfitData from '../../../helpers/data/outfitData';

import OutfitCard from '../../shared/OutfitCard/OutfitCard';
import AddOutfitDropdown from '../../shared/AddOutfitDropdown/AddOutfitDropdown';

import './Home.scss';

class Home extends React.Component {
  state = {
    outfits: [],
    userId: 1,
  }

  getOutfits = () => {
    const { userId } = this.state;
    outfitData.getUserOutfits(userId)
      .then((outfits) => this.setState({ outfits }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getOutfits();
  }

  render() {
    const { outfits } = this.state;
    return (
      <div className="Home container">
        <h2>Your Outfits:</h2>
        <div className="row">
          {outfits.map((outfit) => <OutfitCard outfit={outfit} key={outfit.id}/>)}
        </div>
        <AddOutfitDropdown history={this.props.history} />
      </div>
    );
  }
}

export default Home;
