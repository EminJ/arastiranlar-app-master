<script>
  import axios from 'axios';
  import {perm,deleteuser} from '../javascript/connect'
  export let postsArray;
  async function loadinfo(postsArray) {
      const options = {
        method: "POST",
        url: "http://34.234.63.247:5678/api/admin/list/user",
        headers: { "Content-Type": "application/json" },
        data: {
          token: postsArray,
        },
      };
      axios.request(options).then(function (response) {
        return response.info
      }).catch(function (error) {});
      const response = await axios.request(options);
      return response.data.users;
    }
</script>
{#await loadinfo(postsArray)}
...
{:then loadinfo} 
  {#each loadinfo as user}
    <div class="outwindow" id="{user._id}">
      <div class="forid">{user._id}</div>
      <div class="forinfo">
        <div class="photo"></div>
        <div class="info">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.name} {user.surname}</p>
        </div>
        <div class="fordelete">
          <a href="/" on:click={deleteuser(user._id)} onclick="return false" class="del">SİL</a>
        </div>
        <div class="forperm">
          <a href="/" on:click={perm(user._id,1)} onclick="return false">
            <p style="background-color: lightblue;" id="permbtn1{user._id}">Admin Yap</p>
          </a>
          <a href="/" on:click={perm(user._id,2)} onclick="return false">
            <p style="background-color: lightcyan;" id="permbtn2{user._id}">Moderator Yap</p>
          </a>
          <a href="/" on:click={perm(user._id,3)} onclick="return false">
            <p style="background-color: lightyellow;" id="permbtn3{user._id}">Yazar Yap</p>
          </a>
          <a href="/" on:click={perm(user._id,4)} onclick="return false">
            <p style="background-color: lightgray;" id="permbtn4{user._id}">Okur Yap</p>
          </a>
        </div>
      </div>
    </div>
  {/each}
{/await}
<style>
  .outwindow{
    width: 600px;
    height: 160px;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
  }
  .forid{
    display: inline-block;
    width: auto;
    height: 20px;
    border-radius: 10px 0 0 0;
    background-color: rgb(201, 201, 201);
    font-size: 0.7rem;
    padding: 0 5px;
  }
  .forinfo{
    border-radius: 10px 0 10px 10px;
    width: 600px;
    height: 140px;
    background-color: #fff;
    display: flex;
  }
  .forinfo .photo{
    width: 100px;
    height: 100px;
    background-color: rgb(201, 201, 201);
    border-radius: 50px;
    margin: 20px;
  }
  .forinfo .info{
    width: 260px;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
  .info p{
    margin: 6px 0;
    font-weight: bold;
    font-size: 0.9rem;
  }
  .fordelete{
    width: 70px;
    height: auto;
  }
  .fordelete .del{
    padding: 5px 10px;
    background-color: rgb(230, 90, 90);
    color: white;
    font-size: 0.85rem;
    margin: 10px;
    display: inline-block;
    border-radius: 10px;
  }
  .forperm{
    width: 130px;
    height: auto;
  }
  .forperm p{
    width: auto;
    height: 20px;
    background-color: bisque;
    margin: 10px 5px;
  }
</style>