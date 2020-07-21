import React from 'react';
// import { Link } from 'react-router-dom';

import './GarmentCard.scss';

class GarmentCard extends React.Component {
  render() {
    const { garment } = this.props;
    return (
      <div className="card col-3" key={garment.id}>
        <div className="card-body">
          <h5 className="card-title">{garment.name}</h5>
          <p className="card-text">{garment.description}</p>
          {/* TODO: decide if there needs to be a link here to a garment page
          <Link to={`./garment/${garment.id}`} className="card-link">Look at this garment</Link>
          <a href="#" className="card-link">Another link</a> */}
        </div>
      </div>
    );
  }
}

export default GarmentCard;
