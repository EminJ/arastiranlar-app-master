import axios from "axios";
import {unescape} from 'html-escaper';

export async function get(params){
    const data = await axios.get('http://34.234.63.247:5678/api/show/post/');
    for (let i = 0; i < data.data.blogposts.length; i++) {
        const element = data.data.blogposts[i];
        if(element._id==params){
            document.getElementById('post_name').innerHTML=element.post_title;
            document.getElementById('likecount').innerHTML=element.post_up;
            document.getElementById('dislikecount').innerHTML=element.post_down;
            document.getElementById('main').innerHTML=unescape(element.post_text).split('</div>')[0].replace('<div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Blog Yazmaya başla..." style="user-select: auto;">','<div>').replace('<div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Blog Yazmaya başla...">','<div>').replaceAll('<img','<img style="max-width:100%"');
            axios.post('http://34.234.63.247:5678/api/test/post', {
                token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
                postid: params,
            })
            .then(function (response) {
                if(response.data.message==['0']){
                    document.getElementById('like').style.color='#389d77';
                }
                if(response.data.message==['1']){
                    document.getElementById('dislike').style.color='#b4241c';
                }
                if(response.data.message==['2']){
                    document.getElementById('comments').style.color='#389d77';
                }
                if(response.data.message==['02']){
                    document.getElementById('like').style.color='#389d77';
                    document.getElementById('comments').style.color='#389d77';
                }
                if(response.data.message==['12']){
                    document.getElementById('dislike').style.color='#b4241c';
                    document.getElementById('comments').style.color='#389d77';
                }
            });
            return;
        }
    }
    
}

export async function loadmessage(params) {
    const options = {
      method: "POST",
      url: "http://34.234.63.247:5678/api/show/post/comments",
      headers: { "Content-Type": "application/json" },
      data: {
        postid: params,
        token: decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
      },
    };
    const response = await axios.request(options);
    return response.data;
  }

export async function like(params){
    axios.post('http://34.234.63.247:5678/api/post/like', {
        token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
        postid: params,
    })
    .then(function (response) {
        if(response.data.message==0){
            document.getElementById('like').style.color='#000';
            document.getElementById('likecount').innerHTML=parseInt(document.getElementById('likecount').innerHTML)-1;
        }
        if(response.data.message==1){
            document.getElementById('like').style.color='#389d77';
            document.getElementById('likecount').innerHTML=parseInt(document.getElementById('likecount').innerHTML)+1;
        }
        if(response.data.message==3){
            document.getElementById('like').style.color='#389d77';
            document.getElementById('likecount').innerHTML=parseInt(document.getElementById('likecount').innerHTML)+1;
            document.getElementById('dislike').style.color='#000';
            document.getElementById('dislikecount').innerHTML=parseInt(document.getElementById('dislikecount').innerHTML)-1;
        }
    })
    .catch(function (error) {
        alert("Lütfen Giriş Yapınız...");
    });
}
export async function dislike(params){
    axios.post('http://34.234.63.247:5678/api/post/dislike', {
        token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
        postid: params,
    })
    .then(function (response) {
        if(response.data.message==0){
            document.getElementById('dislike').style.color='#000';
            document.getElementById('dislikecount').innerHTML=parseInt(document.getElementById('dislikecount').innerHTML)-1;
        }
        if(response.data.message==1)
        {
            document.getElementById('dislike').style.color='#b4241c';
            document.getElementById('dislikecount').innerHTML=parseInt(document.getElementById('dislikecount').innerHTML)+1;  
        }
        if(response.data.message==3){
            document.getElementById('like').style.color='#000';
            document.getElementById('likecount').innerHTML=parseInt(document.getElementById('likecount').innerHTML)-1;
            document.getElementById('dislike').style.color='#b4241c';
            document.getElementById('dislikecount').innerHTML=parseInt(document.getElementById('dislikecount').innerHTML)+1;
        }
    })
    .catch(function (error) {
        alert("Lütfen Giriş Yapınız...");
    });
}
export async function send_message(params){
    axios.post('http://34.234.63.247:5678/api/post/comments', {
        token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
        postid: params,
        message: document.getElementById("sendcomments").value
    })
    .then(function (response) {
        location.reload();
    })
    .catch(function (error) {
        alert("Lütfen Giriş Yapınız...");
    });
}
export async function postsave(params){
    axios.post('http://34.234.63.247:5678/api/post/save', {
        token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
        postid: params,
    })
    .then(function (response) {
       if(response.data.message==0)document.getElementById("comments").style.color='#389d77';
       if(response.data.message==1)document.getElementById("comments").style.color='#000';
    })
    .catch(function (error) {
        alert("Lütfen Giriş Yapınız...");
    });
}


export async function deletemessage(messageid,params){
    axios.post('http://34.234.63.247:5678/api/post/commentsdell', {
        token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
        messageid: messageid,
        tokenpost: params
    })
    .then(function (response) {
        document.getElementById('alertdel').style.display='block';
        document.getElementById(messageid).style.display='none';
    });
}
export async function editmessage(msgid){
    if(document.getElementById('text-area'+msgid).style.display!='none'){
        document.getElementById('text-area'+msgid).style.display='none';
        document.getElementById('edit-text'+msgid).style.display='block';
    }
    else{
        document.getElementById('text-area'+msgid).style.display='block';
        document.getElementById('edit-text'+msgid).style.display='none';
    }

}


export async function editmessage_submit(messageid,oldtext){
    if(document.getElementById('newtext_msg'+messageid).value=='' || oldtext==document.getElementById('newtext_msg'+messageid).value){
        document.getElementById('alertediterr1').style.display='block';
        return
    }
    axios.post('http://34.234.63.247:5678/api/post/commentsedit', {
        token:decodeURIComponent(document.cookie).split(';')[0].split('=')[1] || '',
        messageid: messageid,
        newtext: document.getElementById('newtext_msg'+messageid).innerHTML,
    })
    .then(function (response) {
        document.getElementById('alert').style.display='block';
        //document.getElementById(messageid).style.display='none'; text değişecek
    });
}