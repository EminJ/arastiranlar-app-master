<script>
    import SendPost from "./sendpost.svelte";
    import ManagePost from "./managepost.svelte";
    import ShowUsers from "./showusers.svelte";
    import "./style.css";
    import axios from "axios";
    import {
        getveriable,
        sendpost,
        managepost,
        showusers,
    } from "../javascript/connect";
    export let querylogin;
    async function loadinfo(querylogin) {
        const options = {
            method: "POST",
            url: "http://34.234.63.247:5678/api/test/user",
            headers: { "Content-Type": "application/json" },
            data: {
                token: querylogin,
            },
        };
        axios
            .request(options)
            .then(function (response) {
                return response.info;
            })
            .catch(function (error) {
                console.log(error);
            });
        const response = await axios.request(options);
        return response;
    }
</script>

{#await loadinfo(querylogin)}
    <div class="fullscreen">
        <img
            src="./images/logo.png"
            alt="logo-arastiranlar"
            style="width: 100px;"
            id="waitanimation"
        />
        <h1>Loading..</h1>
    </div>
{:then loadinfo}
    {#if loadinfo.data.info.roles == "Admin" || loadinfo.data.info.roles == "Moderator" || loadinfo.data.info.roles == "Yazar"}
        <div class="title">
            <p><a href="/">Araştıranlar</a></p>
            <span>ADMIN</span>
        </div>
        <div class="cont">
            <div class="listselect">
                <ul>
                    <li>
                        <a
                            href="/"
                            style="font-weight: bold;"
                            id="sendpostselect"
                            on:click={sendpost}
                            onclick="return false">Gönderi Oluştur</a
                        >
                    </li>
                    <li>
                        <a
                            href="/"
                            id="managepostselect"
                            on:click={managepost}
                            onclick="return false">Gönderileri Yönet</a
                        >
                    </li>
                    <li>
                        <a
                            href="/"
                            id="showusersselect"
                            on:click={showusers}
                            onclick="return false">Kullanıcıları Yönet</a
                        >
                    </li>
                    {#await getveriable() then getveriable}
                        <li>
                            <a href="/" onclick="return false"
                                ><span id="countpost" />{getveriable.post} Tane Gönderi
                                Var</a
                            >
                        </li>
                        <li>
                            <a href="/" onclick="return false"
                                >Kayıtlı <span
                                    id="countuser"
                                />{getveriable.user} Hesap Var</a
                            >
                        </li>
                    {/await}
                </ul>
            </div>
            <div class="showarea">
                <div id="managepost">
                    <center><ManagePost client:idle /></center>
                </div>
                <div id="sendpost">
                    <center><SendPost client:idle /></center>
                </div>
                <div id="showusers">
                    <center><ShowUsers client:idle /></center>
                </div>
            </div>
        </div>
    {:else}
        <script>
            window.open("/errorpage", "_self");
        </script>
    {/if}
{/await}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
    #managepost {
        display: none;
    }
    #showusers {
        display: none;
    }
    .title {
        width: 100%;
        height: 3%;
        margin-bottom: 0.5%;
        margin-top: 0.5%;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        padding: 0 20px;
    }
    .title p {
        font-size: 1.2rem;
    }
    .title span {
        color: #389d77;
        font-size: 0.9rem;
        font-weight: 600;
    }
    .cont {
        width: 100%;
        height: 96%;
        display: flex;
    }
    .showarea {
        width: 80%;
        height: auto;
        margin: 0 1%;
        background-color: #dedede;
        border-radius: 25px;
    }
    .listselect {
        width: 15%;
        height: auto;
        text-align: center;
    }
    .listselect li {
        margin: 20px;
        color: #aeaeae;
    }
    @media screen and (max-width: 1080px) {
        .cont {
            flex-direction: column;
        }
        .listselect ul {
            display: flex;
            justify-content: space-evenly;
        }
        .listselect {
            width: 100%;
            height: 100px;
        }
        .showarea {
            width: 98%;
            margin: 0 1%;
        }
    }
    @media screen and (max-width: 660px) {
        .listselect ul {
            display: flex;
            justify-content: space-evenly;
        }
        .listselect {
            width: 100%;
            height: 100px;
        }
        .listselect ul li {
            margin: 8px;
        }
    }
</style>
