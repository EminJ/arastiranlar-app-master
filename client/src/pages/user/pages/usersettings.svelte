<script>
  import {send} from "../Javascript/getinfo";
</script>
<div class="user-settings">
    <div class="col">
      <p>Kullanıcı Adını Değiştir</p>
      <input type="text" id="change_username">
    </div>
    <div class="col">
      <p>Adını Değiştir</p>
      <input type="text" id="change_name">
    </div>
    <div class="col">
      <p>Soy Adını Değiştir</p>
      <input type="text" id="change_surname">
    </div>
    <div class="col">
      <p>E-Postanı Değiştir</p>
      <input type="text" id="change_email">
    </div>
    <div class="col">
      <p>Şifreni Değiştir</p>
      <input type="password" id="change_password" placeholder="Şifre">
    </div>
    <div class="col" id="re_pass">
      <p>Şifreyi Tekrar Ediniz</p>
      <input type="password" id="change_password2" placeholder="Tekrar Şifre">
    </div>
    <div class="col" id="re_pass">
      <p>Kullanıcı Fotoğrafınızı Değiştirin</p>
      <input type="file" name="avatar" id="change_avatar" accept="image/*">
      <div id="fileDisplayArea"></div>
    </div>
    <div class="col">
      <p>Değişiklikleri Kaydet</p>
      <input type="password" id="sec_password" placeholder="Şifrenizi Giriniz..">
      <input type="button" on:click={() => send()} value="Kaydet" style="width: 120px; padding: 0; color:#333;height: 35px;">
      </div>
    <div>
      <p id="err_txt"></p>
    </div>
  </div>

  <style>
    .user-settings{
    border: 1px solid #389d77;
    padding: 20px;
    border-radius: 12px;
  }
  .col{
    display: inline-block;
    width: auto;
    height: 70px;
    border: 1px solid #389d77;
    border-radius: 15px;
    margin: 20px;
  }
  .col p{
    position: absolute;
    margin-top: -10px;
    margin-left: 15px;
    background-color: #eeeff0;
    color: #3c6c5a;
    padding: 0 5px;
    border-radius: 50%;
    font-weight: 400;
    z-index: 0;
  }
  .col input{
    width: 310px;
    background-color: #f7f8f9;
    height: 30px;
    margin: 20px;
    border: 0;
    border-radius: 8px;
    font-size: 0.92rem;
    border: 1px solid transparent;
    padding-left: 10px;
  }
  .col input:focus{
    border: 1px solid #389d77;
    background-color: #eeeff0;
    outline: none;
  }
  @media screen and (max-width: 1080px) {
    .col{
      width: 700px;
      margin: 20px auto;
    }
    .col input{
      width: 650px;
    }
    }
    @media screen and (max-width: 760px) {
    .col{
      width: 90%;
    }
    .col input{
      width: 70%;
    }
    }
  </style>