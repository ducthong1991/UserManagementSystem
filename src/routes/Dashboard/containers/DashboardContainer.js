import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getListUsers, deleteUser, saveUser} from '../modules/dashboard';
import {toast} from 'react-toastify';
import UserDetail from '../components/UserDetail';
import UserManagement from '../components/UserManagement';

class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenUpdateSection: false,
            userDetail: {
                id: 0,
                firstName: '',
                lastName: ''
            },
            criteria: {
                currentPage: 1
            },
            errorMessages: {}
        };
    }

    componentWillMount() {
        const {criteria} = this.state;
        this.props.getListUsers(criteria.currentPage);
    };

    paging = (page) => {
        let criteria = this.state.criteria;
        criteria.currentPage = page;
        this.setState({criteria: criteria});
        this.props.getListUsers(criteria.currentPage);
    };

    onInputChange = (value, name) => {
        let userDetail = this.state.userDetail;
        userDetail[name] = value;
        this.setState({userDetail: userDetail});
    };

    deleteUser = (userId) => {
        const {total} = this.props.dashboard.users;
        if (total === 1) {
            toast.error('System must have at least 1 user. Cannot delete all of them');
            return;
        }
        if (confirm('Are you sure you want to delete this user?')) {
            this.props.deleteUser(userId, () => {
                this.paging(1);
                toast.success('Delete user successfully');
            });
        }
    };

    addUser = () => {
        let userDetail = {
            id: 0,
            firstName: '',
            lastName: ''
        };
        this.setState({userDetail: userDetail, isOpenUpdateSection: true, errorMessages: {}});
    };

    editUser = (user) => {
        let userDetail = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name
        };
        this.setState({userDetail: userDetail, isOpenUpdateSection: true, errorMessages: {}});
    };

    validate = () => {
        let {userDetail, errorMessages} = this.state;
        let isValid = true;
        let verify = ['firstName', 'lastName'];
        for (let property of verify) {
            if (!userDetail[property]) {
                errorMessages[property] = true;
                isValid = false;
            } else {
                errorMessages[property] = false;
            }
        }
        this.setState({errorMessages: errorMessages});
        return isValid;
    }

    saveUser = () => {
        let {userDetail} = this.state;
        if(!this.validate()) {
            return;
        }

        let successfullyMessage = userDetail.id ? 'Edit user successfully' : 'Add user successfully';
        this.props.saveUser(userDetail, () => {
            if (userDetail.id) {
                this.paging(this.state);
            } else {
                this.paging(1);
            }
            toast.success(successfullyMessage);
            this.setState({isOpenUpdateSection: false});
        });
    };

    closeUpdateSession = () => {
        this.setState({isOpenUpdateSection: false});
    };

    render() {
        const {users} = this.props.dashboard;
        const {userDetail, isOpenUpdateSection, errorMessages} = this.state;
        const deleteUser = this.deleteUser;
        const editUser = this.editUser;
        return (
            <div>
                <UserManagement
                    users={users}
                    editUser={editUser}
                    deleteUser={deleteUser}
                    isOpenUpdateSection={isOpenUpdateSection}
                    addUser={this.addUser}
                    paging={this.paging}
                />
                <UserDetail
                    isOpenUpdateSection={isOpenUpdateSection}
                    onInputChange={this.onInputChange}
                    userDetail={userDetail}
                    saveUser={this.saveUser}
                    closeUpdateSession={this.closeUpdateSession}
                    errorMessages={errorMessages}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListUsers: bindActionCreators(getListUsers, dispatch),
        deleteUser: bindActionCreators(deleteUser, dispatch),
        saveUser: bindActionCreators(saveUser, dispatch)
    };
}

const mapStateToProps = (state) => ({
    dashboard: state.dashboard
});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
