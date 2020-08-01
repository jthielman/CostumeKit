import React from 'react';

import outfitData from '../../../helpers/data/outfitData';
import garmentData from '../../../helpers/data/garmentData';

import GarmentCard from '../../shared/GarmentCard/GarmentCard';

import './OneOutfit.scss';

class OneOutfit extends React.Component {
  state = {
    outfit: {},
    garments: [],
    nameEditMode: false,
    descriptionEditMode: false,
    settingEditMode: false,
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
    e.persist();
    console.log(e);
    const { id } = e.currentTarget;
    this.setState({ [id]: true });
  }

  handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    const { outfit } = this.state;
    this.setState({ outfit, [id]: value });
  }

  render() {
    // const { outfitId } = this.props.match.params;
    const {
      outfit,
      garments,
      nameEditMode,
      descriptionEditMode,
      settingEditMode,
    } = this.state;
    return (
      <div className="OneOutfit container">
        <div className="row d-flex justify-content-center align-items-baseline">
          <div className="col-4">
            {nameEditMode
              ? <div className="row input-group">
                  <input id="name" className="form-control form-control-lg" type="text" value={outfit.name} onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary"><i className="fas fa-check"></i></button>
                  </div>
                </div>
              : <div id="Name" className="row d-flex justify-content-between align-items-baseline">
                  <h2>{outfit ? outfit.name : ''}</h2>
                  <button type="button" className="btn text-muted" id="nameEditMode" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
                </div>
            }
            {settingEditMode
              ? <div className="row input-group">
                  <input id="setting" className="form-control" type="text" value={outfit.settingName} onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary"><i className="fas fa-check"></i></button>
                  </div>
                </div>
              : <div className="row d-flex justify-content-between align-items-baseline">
                  <h4 className="text-muted">{outfit.settingName}</h4>
                  <button type="button" className="btn text-muted" id="settingEditMode" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
                </div>
            }
          </div>
          {descriptionEditMode
            ? <div className="col-6 input-group">
                <textarea id="description" className="form-control" value={outfit.description} onChange={this.handleChange} />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary"><i className="fas fa-check"></i></button>
                </div>
              </div>
            : <div className="row d-flex justify-content-between align-items-baseline">
                <p className="outfit-description col">{outfit.description}</p>
                <button type="button" className="btn text-muted" id="descriptionEditMode" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
              </div>
          }
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
