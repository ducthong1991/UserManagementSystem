import axiosClient from '../../../utils/axiosClient';

export const GET_LIST_USERS = 'GET_LIST_USERS';

export function getListUsers(page) {
    return (dispatch) => {
        axiosClient.get(`/users?page=${page}`).then(response => {
            return dispatch({
                type: GET_LIST_USERS,
                data: response.data
            })
        })
    };
}

export function saveUser(user, callback) {
    let detail = {
        name: `${user.firstName} ${user.lastName}`,
        job: 'Office Worker'
    };
    return (dispatch) => {
        let func = user.id ? axiosClient.put(`/user/${user.id}`, detail) : axiosClient.post(`/user`, detail);
        func.then(response => {
            callback();
        })
    }
}

export function deleteUser(userId, callback) {
    return (dispatch) => {
        axiosClient.delete(`/user/${userId}`).then(response => {
            callback();
        })
    }
}

const actionsMap = {
    [GET_LIST_USERS]: (state, action) => {
        return {
            ...state,
            users: action.data
        }
    }
};


const initialState = {
    users: {}
};

export default function dashboardReducer(state = initialState, action) {
    const handler = actionsMap[action.type];
    return handler ? handler(state, action) : state;
}
