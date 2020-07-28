import React from 'react';
import garmentData from '../../../helpers/data/garmentData';

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
    return (
      <h1>Garments Page</h1>
    );
  }
}

export default Garments;
