<script>
    import LoginPage from "./login.svelte";
    import { l_h_btn,setup } from "./javascript/navbar";
</script>
<LoginPage/>
<div class="nav" on:load={setup()} id="nav">
    <div class="navlist">
        <a href="/" class="logo">
            <p><i class='bx bx-atom'></i>Araştıranlar</p>
        </a>
        <ul class="list">
            <li><a href="/">Ana Sayfa</a></li>
            <li><a href="/">Kategoriler</a></li>
            <li><a href="/">Akış</a></li>
            <li><a href="/" on:click={l_h_btn} onclick="return false;" id="l_h_btn">Giriş Yap</a></li>
        </ul>
    </div>
</div>