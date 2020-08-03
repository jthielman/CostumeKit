import React from 'react';
// import { Link } from 'react-router-dom';

import outfitData from '../../../helpers/data/outfitData';

import './GarmentCard.scss';

class GarmentCard extends React.Component {
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

  openDropdown = (e) => {
    e.preventDefault();
    const { garment } = this.props;
    document.getElementById(`add-garment-dropdown${garment.id}`).classList.toggle('show');
  }

  render() {
    const { garment } = this.props;
    const { outfits } = this.state;
    return (
      <div className="card col-md-3" key={garment.id}>
        <div className="card-body">
          <h5 className="card-title">{garment.name}</h5>
          <p className="card-text">{garment.description}</p>
          <div className="dropdown show">
            <button onClick={this.openDropdown} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Add to outfit
            </button>
            <div id={`add-garment-dropdown${garment.id}`} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {outfits.map((outfit) => <button className="dropdown-item" type="button" key={outfit.id}>{outfit.name}</button>)}
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
