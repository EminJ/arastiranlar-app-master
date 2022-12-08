<script>
  export let postsArray;
  import { onMount } from "svelte";
  import axios from "axios";
  let token;
  onMount(async () => {
      token=decodeURIComponent(document.cookie).split(";")[0].split("=")[1];
  });
  async function deletepost(postid) {
    const options = {
      method: "POST",
      url: "http://34.234.63.247:5678/api/admin/post/del",
      headers: { "Content-Type": "application/json" },
      data: {
        token: token,
        postid: postid,
      },
    };
    const response = await axios.request(options);
    document.getElementById(postid).style.display='none';
  }
</script>

{#each postsArray as post}
<div class="outline" id="{post._id}">
  <div class="area0">
    <div class="img">
      
    </div>
    <b>{post.post_author}</b>
  </div>
  <div class="area1">
    <div class="list0">
      <div class="title">
        <a href="/post?id={post._id}">
          <b>{post.post_title}</b>
        </a>
      </div>
      <div class="category">
        <b>{post.post_category}</b>
      </div>
    </div>
    <div class="list1">
      <div class="explanation">
        <b>{post.post_explanation}</b>
      </div>
    </div>
    <div class="list2">
      <b>{post.post_date.split('T')[0]}</b>
    </div>
  </div>
  <div class="area2">
    <a href="/" class="deletehref" on:click={deletepost(post._id)} onclick="return false"><div class="delete">SİL</div></a>
  </div>
</div>
{/each}

<style>
  .deletehref:hover .delete{
    background-color: rgb(127, 14, 14);
  }
  .delete{
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-left: 25px;
    color: aliceblue;
    background-color: rgb(169, 17, 17);
    line-height: 40px;
    font-weight: bold;
    font-size: 0.88rem;
  }
  .outline{
    width:800px;
    height:180px;
    padding: 5px;
    border-radius: 15px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    background-color: rgb(255 255 255);
    margin: 10px;
    border: 2px solid rgb(56 157 119);
  }
  .area0{
    width: 160px;
  }
  .area0 .img{
    height: 155px;
    width: 145px;
    margin-bottom: 5px;
    background-color: rgb(227, 226, 226);
    border-radius: 15px;
  }
  .area1{
    width: 560px;
  }
  .area1 .list0{
    width: 550px;
    margin: 0 5px;
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 3px;
    border-bottom: 1px solid rgb(63, 134, 107);
  }
  .area1 .list1{
    width: 550px;
    height: 120px;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
  }
  .area1 .list2{
    float: right;
    margin-right: 5px;
  }
</style>
