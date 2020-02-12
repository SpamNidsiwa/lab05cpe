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
let reset = document.querySelector("#reset");
let per_male = document.querySelector("#percen_male");
let per_female = document.querySelector("#percen_female");
let per_other = document.querySelector("#percen_other");
let user_info_table = document.querySelector("#user_info_table");

let gender1 = gender[0];
let gender2 = gender[1];
let gender3 = gender[2];

re_create_set();

function percen_create(){
  let num_male = 0;
  let num_female = 0;
  let num_other = 0;

  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        // console.log(doc.data().gender);
        if(doc.data().gender == "male"){
          num_male++;
        }else if(doc.data().gender == "female"){
          num_female++;
        }else{
          num_other++;
        }
    });
    // console.log(num_male + " " + num_female + " " + num_other);
    if(num_male + num_female + num_other != 0){
      // per_male.appendChild(document.createTextNode((num_male/(num_female+num_male+num_other)*100).toFixed(2).toString() + "%"));
      // per_female.appendChild(document.createTextNode((num_female/(num_female+num_male+num_other)*100).toFixed(2).toString() + "%"));
      // per_other.appendChild(document.createTextNode((num_other/(num_female+num_male+num_other)*100).toFixed(2).toString() + "%"));
      per_male.innerHTML = ((num_male/(num_female+num_male+num_other)*100).toFixed(2).toString() + "%");
      per_female.innerHTML = ((num_female/(num_female+num_male+num_other)*100).toFixed(2).toString() + "%");
      per_other.innerHTML = ((num_other/(num_female+num_male+num_other)*100).toFixed(2).toString() + "%");
    }else{
      // per_other.appendChild(document.createTextNode("-"));
      // per_male.appendChild(document.createTextNode("-"));
      // per_female.appendChild(document.createTextNode("-"));
      per_other.innerHTML = "-";
      per_male.innerHTML = "-";
      per_female.innerHTML = "-";
    }
});
}



function re_create_set(){
  percen_create();
  user_info_create();
}

function user_info_create(){
  user_info_table.innerHTML = "";
  let user_info_name;
  let user_info_email;
  let user_info_gender;
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      user_info_name = doc.data().name;
      user_info_email = doc.data().email;
      user_info_gender = doc.data().gender;
      for(let i = 1 ; i < user_info_email.length ; i++){
        if(user_info_email[i] == '@' || user_info_email[i] == '.'){

        }else{
          let temp = user_info_email.replaceAt(i,'X');
          user_info_email = temp;
        }
      }
      let row = user_info_table.insertRow(0);
      row.style.height = "55px";
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(0);
      let cell3 = row.insertCell(0);

      let img = document.createElement('img');
      img.src = './img/cancel.png';
      img.addEventListener("click",function(){
        db.collection("users").doc(doc.id).delete();
        re_create_set();
      });

      cell3.innerHTML = user_info_name;
      cell2.innerHTML = user_info_gender;
      cell1.innerHTML = user_info_email;
      cell0.appendChild(img);
      
    });
  });
}

reset.addEventListener("click",function(){
  reset_input();
});

function reset_input(){
  subject.value = "";
  massage.value = "";
  name.value = "";
  phone.value = "";
  email.value = "";
  gender.forEach(g => g.checked = false);
}

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

submit.addEventListener("click",function(){
    event.preventDefault();
    if(subject.value != "" && massage.value != "" && name.value != "" && phonenumber(phone.value) && validate(email.value) && (gender1.checked || gender2.checked || gender3.checked)){
        let gen;
        if(gender1.checked){
          gen = "male";
        }else if(gender2.checked){
          gen = "female";
        }else{
          gen = "other";
        }
        db.collection("users").add({
          subject : subject.value,
          massage : massage.value,
          name : name.value,
          phone : phone.value,
          email : email.value,
          gender : gen
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
        reset_input();
        re_create_set();
    }else{
        alert("Wrong Input");
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


