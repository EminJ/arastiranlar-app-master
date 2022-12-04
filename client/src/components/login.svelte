<script>
    import { close_login_panel,open_register_panel,close_register_panel,login,register } from "./javascript/navbar";
</script>
<div class="login-body" id="login-body">
    <div class="right-login-panel">
        <div class="top-panel">
            <a href="/" on:click={close_login_panel} onclick="return false;"><i class="bx bx-x"></i></a>
            <span id="messagepanel">Araştıranlar' a Giriş Yap</span>
        </div>
        <div class="main-panel-log">
            <div class="login-panel" id="login-panel" style="display: flex;">
                <div class="text">
                    <i class='bx bx-envelope' style='color:#4b9e85'></i>
                    <input type="text" name="log_email" id="log_email" placeholder="E-Mail"/>
                </div>
                <div class="text">
                    <i class='bx bx-lock-alt' style='color:#4b9e85'></i>
                    <input type="password" name="log_password" id="log_password" placeholder="Password"/>
                </div>
                <span class="submitpanel">
                    <span><input type="checkbox" name="rememberme" id="rememberme"> Beni Hatırla</span>
                    <input class="btn" type="submit" on:click={login} onclick="return false;" value="Giriş Yap"/>
                </span>
                <p style='font-size:0.9rem'>
                    <span>Hesabın yok mu? </span><a href="/" on:click={open_register_panel} onclick="return false;" style='color:#4b9e85'>Kayıt Ol</a><span>.</span>
                </p>
            </div>
            <div class="register-panel" id="register-panel" style="display: none;">
                <div class="text">
                    <i class='bx bx-user-circle' style='color:#4b9e85' ></i>
                    <input type="text" name="username" id="reg_username" placeholder="Kullanıcı Adı"/>
                </div>
                <div class="text">
                    <i class='bx bx-user' style='color:#4b9e85' ></i>
                    <input type="text" name="name" id="reg_name" placeholder="İsim"/>
                </div>
                <div class="text">
                    <i class='bx bx-user' style='color:#4b9e85' ></i>
                    <input type="text" name="surname" id="reg_surname" placeholder="Soyisim"/>
                </div>
                <div class="text">
                    <i class='bx bx-envelope' style='color:#4b9e85'></i>
                    <input type="text" name="email" id="reg_email" placeholder="E-Posta"/>
                </div>
                <div class="text">
                    <i class='bx bx-lock-alt' style='color:#4b9e85'></i>
                    <input type="password" name="password" id="reg_password" placeholder="Şifre"/>
                </div>
                <span class="submitpanel">
                    <input class="btn" type="submit" on:click={register} value="Kayıt Ol"/>
                </span>
                <p style='font-size:0.9rem'>
                    <span>Hesabın var mı? </span><a href="/" on:click={close_register_panel} onclick="return false;" style='color:#4b9e85'>Giriş Yap</a><span>.</span>
                </p>
            </div>
        </div>
        <div class="bottom-panel">
            <center><p id="login_end" style="margin-top: 20px;"></p></center>
        </div>
    </div>
</div>