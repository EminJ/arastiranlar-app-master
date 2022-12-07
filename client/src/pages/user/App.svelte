<script>
  import { gets, logout,usersettings,userliked,userdisliked,setup,usersaved,usermessage } from "./Javascript/getinfo";
  import UserSetting from "./pages/usersettings.svelte";
  import UserLiked from "./pages/userlikes.svelte";
  import UserMessage from "./pages/usermessage.svelte";
  import UserDisLiked from "./pages/userdislike.svelte";
  import UserSaved from "./pages/usersaves.svelte";
  import { onMount } from "svelte";

  let login;
  onMount(async () => {
    login=gets();
  });
</script>
{#await login}
<div class="fullscreen">
  <img src="./images/logo.png" alt="logo-arastiranlar" style="width: 100px;" id="waitanimation">
  <h1>Loading..</h1>
</div>
{:then login}
<div class="main-panel" on:load={login}>
  <div class="usercont">
    <div class="leftpanel">
      <ul> 
        <li><a href="/" on:click={usersettings} onclick="return false">Kullanıcı Ayarı</a></li>
        <li><a href="/" on:click={usersaved} onclick="return false">Kaydettiğim Bloglar</a></li>
        <li><a href="/" on:click={userliked} onclick="return false">Beğenilerim Bloglar</a></li>
        <li><a href="/" on:click={userdisliked} onclick="return false">Beğenmediğim Bloglar</a></li>
        <li><a href="/" on:click={usermessage} onclick="return false">Yorum Yaptığım Bloglar</a></li>
        <li><a href="/" on:click={() => logout()} onclick="return false;">Çıkış Yap</a></li>
      </ul>
    </div>
    <div class="right-mainpanel">
      <div id="usersettings">
        <UserSetting />
      </div>
      <div id="userliked">
        <UserLiked />
      </div>
      <div id="userdisliked">
        <UserDisLiked />
      </div>
      <div id="usersaved">
        <UserSaved />
      </div>
      <div id="usermessage">
        <UserMessage />
      </div>
    </div>
  </div>
</div>
{/await}
<style>
  #usersettings {
    display: none;
  }
  #userliked {
    display: none;
  }
  #userdisliked {
    display: none;
  }
  #usersaved {
    display: none;
  }
  #usermessage {
    display: none;
  }
  .usercont {
    width: 100%;
    height: 860px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .leftpanel {
    width: 320px;
    height: 100%;
    text-align: center;
  }
  .leftpanel li {
    margin: 30px;
    font-weight: 600;
  }
  .leftpanel li a {
    display: inline-block;
  }
  .leftpanel li a:after {
    display: block;
    content: "";
    border-bottom: solid 3px #389d77;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  .leftpanel li a:hover:after {
    transform: scaleX(1);
  }
  .leftpanel li a:after {
    transform-origin: 0% 100%;
  }

  .right-mainpanel {
    width: 920px;
    height: 100%;
    margin: 0 20px;
  }
  .fullscreen{
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.fullscreen h1{
    color: rgb(45, 45, 45);
}
#waitanimation {
    width: 100px;
    border-radius: 100%;
    animation-name: spinner .7s linear infinite;
    -webkit-animation: spinner .7s linear  infinite;
    -moz-animation: spinner .7s linear  infinite;
}
#waitanimation:after{
    position: absolute;
    content:'';
    width: 100px;
    border-radius: 100%;
    border-top:3px solid tomato;
    border-bottom:3px solid tomato;
    border-left:3px solid tomato;
    border-right:3px solid transparent;
    top: -3px;
    left: -3px;
}
@keyframes spinner{
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
}
 
@-webkit-keyframes spinner{
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
}
 
@-moz-keyframes spinner{
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
}
@media screen and (max-width: 1280px) {
  .leftpanel{
      width: 190px;
    }
    .leftpanel ul li{
      margin: 30px 0;
    }
    .main-panel{
      width: 1080px;
    }
    }
    @media screen and (max-width: 1080px) {
      .usercont{
        flex-direction: column;
      }
    .leftpanel{
      width: 760px;
      display: flex;
    }
    .leftpanel ul{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      font-size: 1.2rem;
      flex-wrap: wrap;
    }
    .leftpanel ul li{
      margin: 20px;
    }
    .main-panel{
      width: 760px;
    }
    .right-mainpanel{
      width: 760px;
    }
    }
    @media screen and (max-width: 760px) {
    .leftpanel{
      width: 100%;
      display: flex;
    }
    .leftpanel ul{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      font-size: 1.2rem;
      flex-wrap: wrap;
    }
    .leftpanel ul li{
      margin: 20px;
    }
    .main-panel{
      width: 100%;
    }
    .right-mainpanel{
      width: 90%;
      margin: 0 5%;
    }
    }
</style>
