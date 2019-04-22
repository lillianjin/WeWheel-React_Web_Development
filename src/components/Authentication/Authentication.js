class Authentication {
  login(username) {
    sessionStorage.setItem("username", username);
  }

  logout() {
    sessionStorage.removeItem("username");
  }

  isLoggedIn() {
    let user = sessionStorage.getItem("username");
    return user == null ? false : true;
  }

  getUsername() {
    let user = sessionStorage.getItem("username");
    return user == null ? "" : user;
  }
}

export default new Authentication();
