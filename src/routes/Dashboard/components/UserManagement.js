import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import ReactPaginate from 'react-paginate';

export const UserManagement = ({users, editUser, deleteUser, isOpenUpdateSection, addUser, paging}) => (
    <div>
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col" className="text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.data && users.data.map(function (user, index) {
                return <tr key={index}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td className="text-right">
                        <button type="button" className="btn btn-primary" onClick={() => {editUser(user)}}>Edit</button>
                        <button type="button" className="btn btn-light margin-left-10" onClick={() => {deleteUser(user.id)}}>Delete</button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
        <div className="div-navigate">
            <nav aria-label="Page navigation">
                <div className="float-right">
                    <ReactPaginate previousLabel={"Previous"}
                                   nextLabel={"Next"}
                                   breakLabel={<a href="javascript:void(0)">...</a>}
                                   pageCount={users.total_pages}
                                   forcePage={users.page - 1}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   initialSelected={1}
                                   onPageChange={(data) => {
                                       paging(data.selected + 1)
                                   }}
                                   containerClassName={"pagination"}
                                   pageClassName={"page-item"}
                                   previousClassName={"page-item"}
                                   nextClassName={"page-item"}
                                   pageLinkClassName={"page-link"}
                                   previousLinkClassName={"page-link"}
                                   nextLinkClassName={"page-link"}
                                   disabledClassName={"disabled"}
                                   breakClassName={"page-link"}
                                   activeClassName={"pagination-active"}/>
                </div>
            </nav>
        </div>
        <div className="text-left">
            <button type="button" className={classNames('btn btn-primary', {'d-none': isOpenUpdateSection})} onClick={addUser}>Add User</button>
        </div>
    </div>
);

UserManagement.propTypes = {
    users: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    isOpenUpdateSection: PropTypes.bool.isRequired,
    addUser: PropTypes.func.isRequired,
    paging: PropTypes.func.isRequired
};

export default UserManagement;
