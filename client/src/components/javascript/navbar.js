import "../login.svelte";
import axios from 'axios';

export function setup() {
  const lhbtn=document.getElementById('l_h_btn');
  const lhbtn2=document.getElementById('l_h_btn2');
  let decodedCookie = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
  if(decodedCookie){
    lhbtn.innerHTML="Hesabım";
    lhbtn2.innerHTML="Hesabım";
  }else{
    lhbtn.innerHTML="Giriş Yap";
    lhbtn2.innerHTML="Giriş Yap";
  }
  document.getElementById('nav').style.opacity=100;
}

export function l_h_btn(){
  const lhbtn=document.getElementById('l_h_btn');
  if(lhbtn.innerHTML=="Hesabım"){
    window.open('./user',"_self");
  }else{
    open_login_panel();
  }
}

export const clearform_login = async (e) => {
  document.getElementById('log_email').value="";
  document.getElementById('log_password').value="";
};

export const open_login_panel = async (e) => {
    document.querySelector("#login-body").style.display="block";
  };
export const close_login_panel = async (e) => {
    document.querySelector("#login-body").style.display="none";
  };
export const open_register_panel = async (e) => {
  const reg_panel = document.getElementById("register-panel");
  const log_panel = document.getElementById("login-panel");
  const login_end=document.getElementById('login_end');
  reg_panel.style.display="flex";
  log_panel.style.display="none";
  login_end.innerHTML='';
};
export const close_register_panel = async (e) => {
  const reg_panel = document.getElementById("register-panel");
  const log_panel = document.getElementById("login-panel");
  const login_end=document.getElementById('login_end');
  reg_panel.style.display="none";
  log_panel.style.display="flex";
  login_end.innerHTML='';
};

export function login() {
  const log_email=document.getElementById('log_email');
  const log_password=document.getElementById('log_password'); 
  const login_end=document.getElementById('login_end');
  const options = {
    method: 'POST',
    url: 'http://34.234.63.247:5678/api/auth/signin',
    headers: {'Content-Type': 'application/json'},
    data: {email: log_email.value, password: log_password.value}
  };
  
  axios.request(options).then(function (response) {
    document.cookie = `${"session_security"}=${response.data}`;
    location.reload();
  }).catch(function (error) {
    login_end.style.color='red';
    login_end.innerHTML=error.response.data.message;
  });
}

export function register() {
  const reg_email=document.getElementById('reg_email');
  const reg_password=document.getElementById('reg_password'); 
  const reg_username=document.getElementById('reg_username');
  const reg_name=document.getElementById('reg_name');
  const reg_surname=document.getElementById('reg_surname');
  axios.post('http://34.234.63.247:5678/api/auth/signup', {
    username: reg_username.value,
    name: reg_name.value,
    surname: reg_surname.value,
    email: reg_email.value,
    password: reg_password.value
  })
  .then(function (response) {
    document.cookie = `${"session_security"}=${response.data}`;
    location.reload();
  })
  .catch(function (error) {
    login_end.style.color='red';
    login_end.innerHTML=error.response.data.message;
  });  
}
