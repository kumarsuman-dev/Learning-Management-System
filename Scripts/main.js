
let users = [
  {
    email: "admin@gmail.com",
    pass: "admin123",
    usertype: "admin"
  }
];
localStorage.setItem("users", JSON.stringify(users));

class user {
  constructor() {}

  login(useremail, userpass, us) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let isAuthenticated = false;
    
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === useremail &&
        users[i].pass === userpass &&
        users[i].usertype === us
      ) {
        isAuthenticated = true;
        
        localStorage.setItem("currentUser", JSON.stringify(useremail));
        localStorage.setItem("currentType", JSON.stringify(us));
        break;
      }
      else
        console.log(`${useremail} : ${userpass}- ${us}`);
    }

    if (isAuthenticated) {
      if (us === "student") {
        window.location = "user.html";
      } else if (us === "admin") {
        window.location = "admin.html";
      }
    } else {
      alert("Wrong Credentials");
    }
  }
}

function loginUser() {
  event.preventDefault();
  let useremail = document.getElementById("email").value.trim();
  let userpass = document.getElementById("password").value.trim();
  let us = document.getElementById("user").value.toLowerCase(); // Convert to lowercase

  let User = new user();
  User.login(useremail, userpass, us);
}
