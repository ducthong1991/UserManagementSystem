import React from 'react';
import './HomeView.scss';

class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.props.router.push('/dashboard');
    }
    render() {
        return (
            <div>
            </div>
        );
    }
};

export default HomeView;
