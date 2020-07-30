import React from 'react';

import outfitData from '../../../helpers/data/outfitData';
import garmentData from '../../../helpers/data/garmentData';

import GarmentCard from '../../shared/GarmentCard/GarmentCard';

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
    this.getGarments(outfitId);
  }

  editButtonClick = (e) => {
    e.preventDefault();
    // const detailToEdit = e.target.id.slice(4);
    console.log(e);
    // document.getElementById(detailToEdit).classList.toggle('hide');
  }

  render() {
    // const { outfitId } = this.props.match.params;
    const { outfit, garments } = this.state;
    return (
      <div className="OneOutfit container">
        <div className="row d-flex justify-content-center align-items-baseline">
          <div className="col-4">
            <div id="Name" className="row d-flex justify-content-between align-items-baseline">
              <h2>{outfit ? outfit.name : ''}</h2>
              <button type="button" className="btn text-muted" id="editName" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
            </div>
            <div className="row input-group">
              <input className="form-control form-control-lg" type="text" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary"><i className="fas fa-check"></i></button>
              </div>
            </div>
            <div className="row d-flex justify-content-between align-items-baseline">
              <h4 className="text-muted">{outfit.settingName}</h4>
              <button type="button" className="btn text-muted" id="editSetting" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
            </div>
            <div className="row input-group">
              <input className="form-control" type="text" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary"><i className="fas fa-check"></i></button>
              </div>
            </div>
          </div>
          <p className="outfit-description col">{outfit.description}</p>
        </div>
        <h3>Garments:</h3>
        <div className="row">
          {garments ? garments.map((garment) => <GarmentCard garment={garment} key={garment.id} />)
            : <p>Looks like there are no garments yet.  Care to add some?</p>}
        </div>
      </div>
    );
  }
}

export default OneOutfit;
