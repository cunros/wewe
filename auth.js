const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "game.html";
    })
    .catch(err => alert("Login failed: " + err.message));
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Account created! You can now log in.");
    })
    .catch(err => alert("Signup failed: " + err.message));
}
