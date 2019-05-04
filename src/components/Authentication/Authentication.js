import Axios from "axios";

class Authentication {
  login(username) {
    sessionStorage.setItem("username", username);
    Axios.get(`http://54.161.49.214:4000/api/users/username/${username}`).then(
      res => {
        sessionStorage.setItem("userId", res.data.data[0]._id);
      }
    );
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
  }

  isLoggedIn() {
    const user = sessionStorage.getItem("username");
    return user == null ? false : true;
  }

  getUsername() {
    const user = sessionStorage.getItem("username");
    return user == null ? "" : user;
  }

  getUserId() {
    const userId = sessionStorage.getItem("userId");
    return userId == null ? "" : userId;
  }
}

export default new Authentication();
