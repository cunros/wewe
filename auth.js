// auth.js
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "game.html";
    })
    .catch(err => alert("Login failed: " + err.message));
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful! You can now log in.");
    })
    .catch(err => alert("Signup failed: " + err.message));
}
