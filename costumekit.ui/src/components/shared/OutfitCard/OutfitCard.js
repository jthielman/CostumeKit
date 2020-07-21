import React from 'react';
import { Link } from 'react-router-dom';

import './OutfitCard.scss';

class OutfitCard extends React.Component {
  render() {
    const { outfit } = this.props;
    return (
      <div className="card col-3" key={outfit.id}>
        <div className="card-body">
          <h5 className="card-title">{outfit.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{outfit.settingName}</h6>
          <p className="card-text">{outfit.description}</p>
          <Link to={`./outfit/${outfit.id}`} className="card-link">Look at this outfit</Link>
          {/* TODO: decide if there needs to be another link here
          <a href="#" className="card-link">Another link</a> */}
        </div>
      </div>
    );
  }
}

export default OutfitCard;
