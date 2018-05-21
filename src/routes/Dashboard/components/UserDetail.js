import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

export const UserDetail = ({isOpenUpdateSection, onInputChange, userDetail, saveUser, closeUpdateSession, errorMessages}) => (
    <div className={classNames({'d-none': !isOpenUpdateSection})}>
        <div className="text-left">
            <h4>User</h4>
            <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                    className="form-control"
                    placeholder="Enter first name"
                    value={userDetail.firstName}
                    onChange={(e) => {
                        onInputChange(e.target.value, 'firstName')
                    }}
                />
                {errorMessages.firstName &&
                <div className="form-control-feedback text-danger">First name is required.</div>}
            </div>
            <div className="form-group">
                <label htmlFor="job">Last Name</label>
                <input
                    className="form-control"
                    placeholder="Enter last name"
                    value={userDetail.lastName}
                    onChange={(e) => {
                        onInputChange(e.target.value, 'lastName')
                    }}
                />
                {errorMessages.lastName &&
                <div className="form-control-feedback text-danger">Last name is required.</div>}
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={saveUser}>Save</button>
                <button type="button" className="btn btn-light margin-left-10" onClick={closeUpdateSession}>Cancel
                </button>
            </div>
        </div>
    </div>
);

UserDetail.propTypes = {
    isOpenUpdateSection: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    userDetail: PropTypes.object.isRequired,
    saveUser: PropTypes.func.isRequired,
    closeUpdateSession: PropTypes.func.isRequired,
    errorMessages: PropTypes.object.isRequired
};

export default UserDetail;
