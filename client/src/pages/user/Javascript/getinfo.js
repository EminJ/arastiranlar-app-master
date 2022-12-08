import axios from 'axios';

export function setup() {
  let decodedCookie = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
  if(decodedCookie==null || decodedCookie==''){
    return 0;
}
return 1;
}

export function gets() {
  document.getElementById('usersettings').style.display="block";
  let decodedCookie = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
  const change_username = document.getElementById('change_username');
  const change_name = document.getElementById('change_name');
  const change_surname = document.getElementById('change_surname');
  const change_email = document.getElementById('change_email');
  const options = {
    method: 'POST',
    url: 'http://34.234.63.247:5678/api/test/user',
    headers: {'Content-Type': 'application/json'},
    data: {token: decodedCookie}
  };
  axios.request(options).then(function (response) {
    if(!response.data.info)logout();
    change_username.placeholder=response.data.info.username;
    change_name.placeholder=response.data.info.name;
    change_surname.placeholder=response.data.info.surname;
    change_email.placeholder=response.data.info.email;
    return response.data.info;
  });
}
//backend yapılacak
export function update() {
  let decodedCookie = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
  const change_username = document.getElementById('change_username');
  const change_name = document.getElementById('change_name');
  const change_surname = document.getElementById('change_surname');
  const change_email = document.getElementById('change_email');
  const options = {
    method: 'POST',
    url: 'http://34.234.63.247:5678/api/test/user',
    headers: {'Content-Type': 'application/json'},
    data: {token: decodedCookie}
  };
  
  axios.request(options).then(function (response) {
    change_username.placeholder=response.data.info.username;
    change_name.placeholder=response.data.info.name;
    change_surname.placeholder=response.data.info.surname;
    change_email.placeholder=response.data.info.email;
  }).catch(function (error) {
    console.log(error);
  });
}

export function send() {
  let imgData='/'
  const err_txt = document.getElementById('err_txt');
  let decodedCookie = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
  const change_username = document.getElementById('change_username');
  const sec_password = document.getElementById('sec_password');
  const change_name = document.getElementById('change_name');
  const change_surname = document.getElementById('change_surname');
  const change_password = document.getElementById('change_password');
  const change_password2 = document.getElementById('change_password2');
  const change_email = document.getElementById('change_email');
  const options = {
    method: 'POST',
    url: 'http://34.234.63.247:5678/api/change/userinfo',
    headers: {'Content-Type': 'application/json'},
    data: {
      token: decodedCookie,
      sec_password:sec_password.value,
      c_username:change_username.value,
      c_name:change_name.value,
      c_surname:change_surname.value,
      c_email:change_email.value,
      c_password:change_password.value,
      c_password2:change_password2.value,
      change_avatar:imgData
    }
  };
  
  axios.request(options).then(function (response) {
    err_txt.style.color="green";
    err_txt.innerHTML=response.data.message
  }).catch(function (error) {
    err_txt.style.color="red";
    err_txt.innerHTML=error.response.data.message
  });
}

export function logout() {
  try {
    document.cookie=`${"session_security"}=${""}`
} catch (error) {
  console.log(error);
  }
  window.open('./','_self');
}


export function usersettings() {
  document.getElementById('usersettings').style.display='block';
  document.getElementById('userliked').style.display='none';
  document.getElementById('userdisliked').style.display='none';
  document.getElementById('usersaved').style.display='none';
  document.getElementById('usermessage').style.display='none';
}
export function userliked() {
  document.getElementById('usersettings').style.display='none';
  document.getElementById('userliked').style.display='block';
  document.getElementById('userdisliked').style.display='none';
  document.getElementById('usermessage').style.display='none';
  document.getElementById('usersaved').style.display='none';
}
export function userdisliked() {
  document.getElementById('usersettings').style.display='none';
  document.getElementById('userliked').style.display='none';
  document.getElementById('userdisliked').style.display='block';
  document.getElementById('usermessage').style.display='none';
  document.getElementById('usersaved').style.display='none';
}
export function usersaved() {
  document.getElementById('usersettings').style.display='none';
  document.getElementById('userliked').style.display='none';
  document.getElementById('userdisliked').style.display='none';
  document.getElementById('usersaved').style.display='block';
  document.getElementById('usermessage').style.display='none';
}
export function usermessage() {
  document.getElementById('usersettings').style.display='none';
  document.getElementById('userliked').style.display='none';
  document.getElementById('userdisliked').style.display='none';
  document.getElementById('usersaved').style.display='none';
  document.getElementById('usermessage').style.display='block';
}
