import React from 'react';
import PropTypes from 'prop-types';
import './PageLayout.scss';
import {ToastContainer} from 'react-toastify';

export const PageLayout = ({children}) => (
    <div className='container text-center'>
        <h1 className="padding-top-10">User Management</h1>
        <div className='page-layout__viewport'>
            {children}
        </div>
        <ToastContainer
            position="bottom-right"
            type="default"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
        />
    </div>
);

PageLayout.propTypes = {
    children: PropTypes.node,
};

export default PageLayout;
