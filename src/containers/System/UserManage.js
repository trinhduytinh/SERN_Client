import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import "../../services/userService";
import ModalUser from "./ModalUser";
import { getAllUsers, createNewUserService } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
      // console.log('check state user', this.state.arrUser);//[]
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }

  createNewUser = async (data) => {
    
    try {
      let response =await createNewUserService(data);
      if(response && response.errCode !== 0) {
        alert(response.errMessage)
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Life cycle
  // Run component
  // 1. Run constructor -> init state
  // 2. Did mount (set state): born; unmount
  // 3. Render(re-render)
  render() {
    console.log("this is state", this.state);
    let arrUsers = this.state.arrUsers;
    //properties, nested
    return (
      <div className="users-container">
        <ModalUser 
        isOpen={this.state.isOpenModalUser}
        toggleUserModal={this.toggleUserModal}
        createNewUser = {this.createNewUser}
        />
          
        
        <div className="title text-center"> Manage users with Tinh</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}>
            <i class="fas fa-plus"></i>Add new users
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                console.log("eric check map", item, index);
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i class="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
