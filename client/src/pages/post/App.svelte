<script>
  export let params;
  import { onMount } from "svelte";
  import {
    get,
    like,
    dislike,
    send_message,
    postsave,
    deletemessage,
    editmessage,
    editmessage_submit,
    loadmessage,
  } from "./components/script";
  onMount(async () => {
    get(params);
  });
</script>

<div class="outline">
  <div class="menu">
    <b id="post_name" />
    <div class="menualt">
      <span class="light" id="likecount" />
      <a href="/" on:click={like(params)} onclick="return false"
        ><i class="bx bx-like" id="like" /></a
      >
      <span class="light" id="dislikecount" />
      <a href="/" on:click={dislike(params)} onclick="return false"
        ><i class="bx bx-dislike" id="dislike" /></a
      >
      <a href="/" on:click={postsave(params)} onclick="return false"
        ><i class="bx bx-bookmark" id="comments" /></a
      >
    </div>
  </div>

    <div class="main" id="main"></div>

  <div class="alert" id="alertdel">
    <span class="closebtn" onclick="this.parentElement.style.display='';"
      >&times;</span
    >Yorumunuz Silinmiştir.
  </div>
  <div class="alert" id="alertedit" style="background-color:#cd8e12">
    <span class="closebtn" onclick="this.parentElement.style.display='';"
      >&times;</span
    >Yorumunuz Değiştirilmiştir.
  </div>
  <div class="alert" id="alertediterr1" style="background-color:#cd8e12">
    <span class="closebtn" onclick="this.parentElement.style.display='';"
      >&times;</span
    >Yorumunuz Değiştirilmedi. Bir değişiklik Yapılmadı!
  </div>

  <div class="comments">
    <input
      type="text"
      class="commentstext"
      id="sendcomments"
      placeholder="Yorum Yaz.."
    />

    <button class="commentsbtn" on:click={send_message(params)}>Gönder</button>
    <div id="show_comments">
      {#await loadmessage(params)}
        <span />
      {:then originpost}
        {#each originpost.msg as msgp}
          {#if originpost.token == msgp.userid || originpost.roles == "635eb25438b20b702d8adfc9" || originpost.roles == "635eb25438b20b702d8adfc8"}
            <div class="message_outline" id={msgp.messageid}>
              <p class="message_textline">
                <span>
                  {msgp.user}
                  <span style="font-size: 0.8rem;">#{msgp.messageid}</span>
                </span>
                <span>
                  <a
                    href="/"
                    on:click={deletemessage(msgp.messageid, params)}
                    onclick="return false"
                    class="msgdel">x</a
                  >
                  {msgp.datetime}</span
                >
              </p>
              <p
                style="margin: 6px;word-wrap: break-word;"
                id="text-area{msgp.messageid}"
              >
                {msgp.message}
              </p>
              <p id="edit-text{msgp.messageid}" style="display: none;">
                <input
                  type="text"
                  style="margin: 6px;word-wrap: break-word; border: 0; font-size:1rem;color: #a0a0a0;"
                  id="newtext_msg{msgp.messageid}"
                  value={msgp.message}
                />
                <a
                  href="/"
                  on:click={editmessage_submit(msgp.messageid, msgp.message)}
                  onclick="return false"
                  style="background-color: #389d77; font-size: 0.9rem;padding: 2px 8px; color:#f9f9f9;border-radius:8px"
                  >Kaydet</a
                >
              </p>
            </div>
          {:else}
            <div class="message_outline">
              <p class="message_textline">
                <span>
                  {msgp.user}
                  <span style="font-size: 0.8rem;">#{msgp.messageid}</span>
                </span>
                <span>{msgp.datetime}</span>
              </p>
              <p style="margin: 6px;word-wrap: break-word;">{msgp.message}</p>
            </div>
          {/if}
        {/each}
      {:catch error}
      <script>
        window.open('/errorpage','_self'
    );
    </script>
      {/await}
    </div>
  </div>
</div>
<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

  .alert {
    margin-top: 20px;
    padding: 20px;
    background-color: #f44336;
    color: white;
    display: none;
  }

  .closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .closebtn:hover {
    color: black;
  }
  .outline {
    width: 960px;
    margin: auto;
    padding: 0 30px;
  }
  .menu {
    height: 40px;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
  }
  .menualt {
    font-size: 1.5rem;
  }
  .main {
    font-size: 1.28rem;
    word-break: break-word;
  }
  .menu a {
    margin: 0 8px;
  }
  .comments {
    width: 100%;
    height: 500px;
    margin-top: 30px;
  }
  .light {
    font-size: 1rem;
    color: #a5a5a5;
  }
  .commentstext {
    width: 375px;
    padding-left: 5px;
    height: 25px;
    margin-left: 0;
    border: 1px solid #389d77;
    background-color: transparent;
    border-radius: 5px;
  }
  .commentsbtn {
    padding: 5px 10px;
    background-color: transparent;
    border: 1px solid #389d77;
    border-radius: 5px;
    transition: 0.25s;
  }
  .commentsbtn:hover {
    background-color: #389d77;
    color: #f9f9f9;
  }
  .bx-like:hover {
    color: #389d77;
    font-weight: bold;
  }
  .bx-dislike:hover {
    color: #b4241c;
    font-weight: bold;
  }
  .bx-bookmark:hover {
    color: #389d77;
    font-weight: bold;
  }
  .message_outline {
    margin: 20px 0;
    width: 600px;
    height: auto;
    padding: 10px;
    border: 1px solid #389d77;
    border-radius: 6px;
  }
  .message_textline {
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;
    border-bottom: 1px solid #a5a5a5;
  }
  .msgdel {
    padding: 0 8px;
    color: #f9f9f9;
    border-radius: 5px;
    background-color: #b4241c;
    margin: 0 5px;
  }
  .msgedit {
    padding: 0 8px;
    color: #f9f9f9;
    border-radius: 5px;
    background-color: #cd8e12;
    margin: 0 5px;
  }
</style>
