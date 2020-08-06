import React from 'react';

import garmentData from '../../../helpers/data/garmentData';

import './AddGarmentDropdown.scss';

class AddGarmentDropdown extends React.Component {
  state = {
    userId: 1,
    newGarmentName: '',
    newGarmentDescription: '',
    errors: {
      name: '',
      description: '',
    },
  }

  openDropdown = (e) => {
    e.preventDefault();
    document.getElementById('new-garment-form').classList.toggle('show');
  }

  handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    const { errors } = this.state;

    switch (id) {
      case 'newGarmentName':
        errors.name = value.length > 50 || value.length === 0
          ? 'Name must be between 1 and 50 characters'
          : '';
        break;
      case 'newGarmentDescription':
        errors.description = value.length > 200
          ? 'Description limited to 200 characters'
          : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [id]: value });
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => {
        val.length > 0 && (valid = false);
      },
    );
    return valid;
  }

  addGarment = (e) => {
    e.preventDefault();
    const {
      errors, newGarmentName, newGarmentDescription, userId,
    } = this.state;
    if (this.validateForm(errors)) {
      const garmentToAdd = {
        name: newGarmentName,
        description: newGarmentDescription,
        userId,
      };
      garmentData.addGarment(garmentToAdd)
        .then((newGarment) => {
          this.props.getAllGarments();
          document.getElementById('new-garment-form').classList.toggle('show');
          this.nameInput.value = '';
          this.descriptionInput.value = '';
        })
        .catch((err) => console.error('error in addGarment', err));
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="AddGarmentDropdown dropdown">
          <button onClick={this.openDropdown} className="btn btn-success dropdown-toggle" type="button"
            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Make a New Garment!
          </button>
          <form className="dropdown-menu p-4" id="new-garment-form" aria-labelledby="dropdownMenuButton" noValidate>
            <div className="form-group">
              <label htmlFor="newGarmentName">Name your garment</label>
              <input type="text" className="form-control" id="newGarmentName" placeholder="Himation"
                onChange={this.handleChange} ref={(element) => { this.nameInput = element; }} />
              <span className="error">{errors.name.length > 0 && errors.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="newGarmentDescription">Tell about your garment</label>
              <textarea className="form-control" id="newGarmentDescription" rows="3"
                placeholder="Like a toga but Greek" onChange={this.handleChange}
                ref={(element) => { this.descriptionInput = element; }} />
              <span className="error">{errors.description.length > 0 && errors.description}</span>
            </div>
            <button onClick={this.addGarment} type="button" className="btn btn-primary">Add Garment</button>
          </form>
        </div>
    );
  }
}

export default AddGarmentDropdown;
