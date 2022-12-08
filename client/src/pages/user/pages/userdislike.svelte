<script>
  import './styles.css';
  import axios from "axios";
  import { onMount } from "svelte";
  let token;
  onMount(async () => {
    token=decodeURIComponent(document.cookie).split(";")[0].split("=")[1];
    });
  let postsInfo;
  async function loadposts() {
    const { data } = await axios.get("http://34.234.63.247:5678/api/show/post");
    postsInfo = data.blogposts;
  
    const options = {
      method: "POST",
      url: "http://34.234.63.247:5678/api/user/show/likes",
      headers: { "Content-Type": "application/json" },
      data: {
        token: token,
      },
    };
    const response = await axios.request(options);
    let originpost=[];
    for (let i = 0; i < postsInfo.length; i++) {
      const element = postsInfo[i];
      for (let j = 0; j < response.data.dislike.length; j++) {
        const elementdislike = response.data.dislike[j];
        if(element._id==elementdislike){
          originpost.push(element);
        }
      }
    }
    return originpost;
  }
  </script>
  {#await loadposts()}
  <div class="fullscreen">
    <img src="./images/logo.png" alt="logo-arastiranlar" style="width: 100px;" id="waitanimation">
    <h1>Loading..</h1>
  </div>
{:then postsArray}
  {#await postsArray}
  <div class="fullscreen">
    <img src="./images/logo.png" alt="logo-arastiranlar" style="width: 100px;" id="waitanimation">
    <h1>Loading..</h1>
  </div>
{:then postsArray} 
  {#each postsArray as post}
    <div class="outline">
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
    </div>
  {/each}
{/await}
{/await}