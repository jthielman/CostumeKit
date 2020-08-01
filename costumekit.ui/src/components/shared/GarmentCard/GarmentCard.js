import React from 'react';
// import { Link } from 'react-router-dom';

import './GarmentCard.scss';

class GarmentCard extends React.Component {
  render() {
    const { garment } = this.props;
    return (
      <div className="card col-md-3" key={garment.id}>
        <div className="card-body">
          <h5 className="card-title">{garment.name}</h5>
          <p className="card-text">{garment.description}</p>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
          {/* TODO: decide if there needs to be a link here to a garment page
          <Link to={`./garment/${garment.id}`} className="card-link">Look at this garment</Link>
          <a href="#" className="card-link">Another link</a> */}
        </div>
      </div>
    );
  }
}

export default GarmentCard;
