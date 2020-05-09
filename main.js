// Your web app's Firebase configuration
var firebaseConfig = {
 //Add firebase config
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function googleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function faceBookSignIn(){
  var faceProvider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(faceProvider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var textoVerificado = '';
      var providerData = user.providerData;

      if(emailVerified===false){
        textoVerificado = 'Email no verificado';
      }else{
        textoVerificado = 'Email verificado';
      }

      
      document.getElementById('login').innerHTML =
        `<p>Logueado `+ user.email+ textoVerificado+ `</p> 
        <button onclick="cerrar()"> Cerrar sesion </button>`;
        console.log(user);
    } else {
      // User is signed out.
      document.getElementById('login').innerHTML = 'No logueado';
    }
});

function enviar(){
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    // alert('email='+email+'pass='+pass);
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      })
      .then(function(){
        verificar();
      });
}

function verificar(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function(){
    //Email sent.
  }).catch(function(error){
    //An error happened.
  });
}

function acceso(){
  var emailA = document.getElementById('emailA').value;
  var passA = document.getElementById('passA').value;
  // alert('email='+email+'pass='+pass);
  firebase.auth().signInWithEmailAndPassword(emailA, passA).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
   });
}

function cerrar(){
  firebase.auth().signOut()
  .then(function (){
    console.log('salir');
  })
  .catch(function(error){
    console.log(error);
  })
}
