let firebaseConfig = {
    apiKey: "AIzaSyDWKb7UjKRtEMZCDNfNpxoLq0QtQoIGY38",
    authDomain: "cpelab-05.firebaseapp.com",
    projectId: "cpelab-05"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let subject = document.querySelector("#subject");
let massage = document.querySelector("#massage");
let name = document.querySelector("#name");
let gender = document.querySelectorAll(".gender");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let submit = document.querySelector("#submit");
let gender1 = gender[0];
let gender2 = gender[1];




submit.addEventListener("click",function(){

    if(subject.value != "" && massage.value != "" && name.value != "" && phonenumber(phone.value) && validate(email.value) && (gender1.checked || gender2.checked)){
        
    }else{
        alert("Wrong Input!!");
    }
});

function phonenumber(inputtxt) {
    let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneno)) {
      return true;
    }else {
      return false;
    }
  }

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
function validate(email) {
  
    if (validateEmail(email)) {
      return true;
    } else {
      return false;
    }
}


