import React from 'react';

import garmentData from '../../../helpers/data/garmentData';

import GarmentCard from '../../shared/GarmentCard/GarmentCard';

import './Garments.scss';
import AddGarmentDropdown from '../../shared/AddGarmentDropdown/AddGarmentDropdown';

class Garments extends React.Component {
  state = {
    garments: [],
  }

  getAllGarments = () => {
    garmentData.getAllGarments()
      .then((garments) => this.setState({ garments }))
      .catch((err) => console.error('error in getAllGarments', err));
  }

  componentDidMount() {
    this.getAllGarments();
  }

  render() {
    const { garments } = this.state;
    return (
      <div className="Garments container">
        <h2>All Garments:</h2>
        <div className="row">
          {garments.map((garment) => <GarmentCard garment={garment} key={garment.id} />)}
        </div>
        <AddGarmentDropdown getAllGarments={this.getAllGarments} />
      </div>
    );
  }
}

export default Garments;
