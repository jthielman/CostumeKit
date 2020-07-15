import React from 'react';

import './OutfitCard.scss';

class OutfitCard extends React.Component {
  render() {
    const { outfit } = this.props;
    return (
      <div className="card" key={outfit.id}>
        <div className="card-body">
          <h5 className="card-title">{outfit.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">[outfit setting goes here]</h6>
          <p className="card-text">{outfit.description}</p>
          {/* TODO: add links to this card to outfit page and...something else?
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a> */}
        </div>
      </div>
    );
  }
}

export default OutfitCard;
