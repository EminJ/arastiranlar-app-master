<script>
    import LoginPage from "./login.svelte";
    import { l_h_btn, setup } from "./javascript/navbar";
</script>

<LoginPage />
<div class="nav" on:load={setup()} id="nav">
    <div class="navlist">
        <a href="/" class="logo">
            <p><i class="bx bx-atom" />Araştıranlar</p>
        </a>
        <div id="menuToggle">
            <input type="checkbox" />
            <span />
            <span />
            <span />
            <ul id="menu">
                <li><a href="/">Ana Sayfa</a></li>
                <li><a href="/">Kategoriler</a></li>
                <li><a href="/">Akış</a></li>
                <li>
                    <a
                        href="/"
                        on:click={l_h_btn}
                        onclick="return false;"
                        id="l_h_btn">Giriş Yap</a
                    >
                </li>
            </ul>
        </div>
        <ul class="list">
            <li><a href="/">Ana Sayfa</a></li>
            <li><a href="/">Kategoriler</a></li>
            <li><a href="/">Akış</a></li>
            <li>
                <a
                    href="/"
                    on:click={l_h_btn}
                    onclick="return false;"
                    id="l_h_btn2">Giriş Yap</a
                >
            </li>
        </ul>
    </div>
</div>

<style>
    #menuToggle {
        width: 50px;
        height: 50px;
        display: none;
        flex-direction: column;
        position: relative;
        top: 25px;
        left: 25px;
        z-index: 1;
        -webkit-user-select: none;
        user-select: none;
    }

    #menuToggle input {
        display: flex;
        width: 40px;
        height: 32px;
        position: absolute;
        cursor: pointer;
        opacity: 0;
        z-index: 2;
        margin: -10px -5px;
    }

    #menuToggle span {
        display: flex;
        width: 29px;
        height: 2px;
        margin-bottom: 5px;
        position: relative;
        background: #000;
        border-radius: 3px;
        z-index: 1;
        transform-origin: 5px 0px;
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
            background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }

    #menuToggle span:first-child {
        transform-origin: 0% 0%;
    }

    #menuToggle span:nth-last-child(2) {
        transform-origin: 0% 100%;
    }

    #menuToggle input:checked ~ span {
        opacity: 1;
        transform: rotate(45deg) translate(-3px, -1px);
        background: #36383f;
    }
    #menuToggle input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
    }

    #menuToggle input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(0, -1px);
    }
    #menuToggle input:checked ~ #menu {
        display: block;
    }

    #menu {
        display: none;
        margin-top: 20px;
        margin-right: 50px;
        position: absolute;
        width: auto;
        height: auto;
        box-shadow: 0 0 10px #85888c;
        background-color: #f5f6fa;
        -webkit-font-smoothing: antialiased;
        transform-origin: 0% 0%;
        transform: translate(-100%, 0);
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    }

    #menu li {
        padding: 10px 0;
        transition-delay: 2s;
    }
    .nav {
        width: 100%;
    }
    @media screen and (max-width: 1380px) {
        .navlist {
            width: 70%;
        }
    }
    @media screen and (max-width: 1180px) {
        .navlist {
            width: 80%;
        }
    }
    @media screen and (max-width: 960px) {
        .navlist {
            width: 90%;
        }
    }
    @media screen and (max-width: 768px) {
        .list {
            display: none;
        }
        #menuToggle {
            display: flex;
        }
    }
</style>
