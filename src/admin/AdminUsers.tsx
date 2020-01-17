import React from "react";
import { NavLink, Route } from "react-router-dom";
import { adminUsersData } from "./users-data";
import AdminUser from "./AdminUser";

const AdminUsers = () => {
  return (
    <div>
      <ul className="admin-sections">
        {adminUsersData.map(user => (
          <li>
            <NavLink to={`/admin/users/${user.id}`} activeClassName="admin-link-active">{user.name}</NavLink>
          </li>
        ))}
      </ul>
      <Route path="/admin/users/:id" component={AdminUser}/>
    </div>
  )
};
export default AdminUsers
