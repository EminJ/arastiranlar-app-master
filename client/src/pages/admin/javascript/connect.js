import axios from 'axios';
import {escape, unescape} from 'html-escaper';

function sendpostfunc() {
    const sendbtn = document.getElementById('send_database_post_btn');
    sendbtn.innerHTML='<i class="bx bx-check" style="color:#389D77"></i>';
    sendbtn.style.width='50px';
    sendbtn.style.height='50px';
    sendbtn.style.fontSize='2rem';
    sendbtn.style.border='2px solid #389D77';
    sendbtn.style.backgroundColor='transparent';
}
function sendpostfunc_err() {
    const sendbtn = document.getElementById('send_database_post_btn');
    sendbtn.innerHTML='<i class="bx bx-x" style="color:#A22727"></i>';
    sendbtn.style.width='50px';
    sendbtn.style.height='50px';
    sendbtn.style.fontSize='2.1rem';
    sendbtn.style.border='2px solid #A22727';
    sendbtn.style.backgroundColor='transparent';
}

export function addcategory() {
    let category = [] 
    const textcat = document.getElementById('send_category');
    const sendcat = document.getElementById('category');
    if(textcat.value=='' || textcat.value[0]!='#') return;
    category.push(textcat.value);
    category.forEach(element => {
        sendcat.innerHTML+=element+' ';
        textcat.value='';
    });
}

export function sendpost_finish(text) {
    let decodedCookie = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
    const title = document.getElementById('send_title').value;
    const explanation = document.getElementById('send_explanation').value;
    const image = document.getElementById('send_image');
    const category = document.getElementById('category');
    let arr=category.innerHTML.split(' ');
    let catarray=[];
    for (let i = 0; i < arr.length-1; i++) {
        const element = arr[i];
        catarray.push(element);  
    }
    axios.post('http://34.234.63.247:5678/api/admin/post', {
        author:decodedCookie,
        title: title,
        explanation: explanation,
        text: escape(text.innerHTML),
        category: catarray
    })
    .then(function (response) {
        sendpostfunc();
    })
    .catch(function (error) {
        console.log(error);
        sendpostfunc_err();
    });
}

export async function getveriable() {
    const { data } = await axios.get('http://34.234.63.247:5678/api/veriable/count');
    //document.getElementById('countuser').innerHTML=data.user;
    //document.getElementById('countpost').innerHTML=data.post;
    return data;
}

export async function getinfo(tkn) {
    const options = {
        method: 'POST',
        url: 'http://34.234.63.247:5678/api/test/user',
        headers: {'Content-Type': 'application/json'},
        data: {
          token: tkn,
        }
      };
      
      axios.request(options).then(function (response) {
        return response.info
      }).catch(function (error) {
        console.error(error);
      });
}

export async function sendpost() {
    document.getElementById('sendpostselect').style.fontWeight='bold';
    document.getElementById('managepostselect').style.fontWeight='normal';
    document.getElementById('showusersselect').style.fontWeight='normal';
    document.getElementById('sendpost').style.display='block';
    document.getElementById('managepost').style.display='none';
    document.getElementById('showusers').style.display='none';
}
export async function managepost() {
    document.getElementById('sendpostselect').style.fontWeight='normal';
    document.getElementById('managepostselect').style.fontWeight='bold';
    document.getElementById('showusersselect').style.fontWeight='normal';
    document.getElementById('sendpost').style.display='none';
    document.getElementById('managepost').style.display='block';
    document.getElementById('showusers').style.display='none';
}
export async function showusers() {
    document.getElementById('sendpostselect').style.fontWeight='normal';
    document.getElementById('managepostselect').style.fontWeight='normal';
    document.getElementById('showusersselect').style.fontWeight='bold';
    document.getElementById('sendpost').style.display='none';
    document.getElementById('managepost').style.display='none';
    document.getElementById('showusers').style.display='block';
}

export async function deleteuser(tkn) {
  const options = {
    method: 'POST',
    url: 'http://34.234.63.247:5678/api/admin/delete/user',
    headers: {'Content-Type': 'application/json'},
    data: {
      tokenadmin: decodeURIComponent(document.cookie).split(';')[0].split('=')[1],
      token:tkn,
    }
  };

  axios.request(options).then(function (response) {
    document.getElementById(tkn).style.display='none';
  }).catch(function (error) {
    console.log(error);
  });
}
export async function perm(tkn,slct) {

    const options = {
      method: 'POST',
      url: 'http://34.234.63.247:5678/api/admin/perm/user',
      headers: {'Content-Type': 'application/json'},
      data: {
        tokenadmin: decodeURIComponent(document.cookie).split(';')[0].split('=')[1],
        token:tkn,
        select:slct
      }
    };

    axios.request(options).then(function (response) {
      document.getElementById('permbtn'+slct+tkn).style.backgroundColor='green';
    }).catch(function (error) {
      document.getElementById('permbtn'+slct+tkn).style.cobackgroundColorlor='red';
    });
}

//---------------------------HERE
export async function post_dell() {

    const options = {
      method: 'POST',
      url: 'http://34.234.63.247:5678/api/admin/perm/user',
      headers: {'Content-Type': 'application/json'},
      data: {
        tokenadmin: decodeURIComponent(document.cookie).split(';')[0].split('=')[1],
        token:tkn,
        select:slct
      }
    };

    axios.request(options).then(function (response) {
      document.getElementById('permbtn'+slct+tkn).style.backgroundColor='green';
    }).catch(function (error) {
      document.getElementById('permbtn'+slct+tkn).style.cobackgroundColorlor='red';
    });
}