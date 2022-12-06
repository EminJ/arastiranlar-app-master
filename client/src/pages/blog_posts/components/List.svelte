<script>
  export let postsArray;
  let searchtext='';
</script>
<div class="searchbox">
  <span class="bx bx-search"></span>
  <input type="text" name="search" id="search" placeholder="Blog' da Ara" bind:value={searchtext}>
</div>
{#await postsArray}
  <div class="fullscreen">
    <img src="./images/logo.png" alt="logo-arastiranlar" style="width: 100px;" id="waitanimation">
    <h1>Loading..</h1>
  </div>
{:then postsArray} 
  {#each postsArray as post}
  {#if post.post_title.includes(searchtext)}
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
    {/if}
  {/each}
{/await}
<style>
  .outline{
    width:720px;
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
.searchbox span{
    font-size: 1.4rem;
    margin: 14px 4px;
  }
  .searchbox{
    width: 800px;
    padding-left: 10px;
    height: 45px;
    background-color: rgb(223, 223, 223);
    border-radius: 20px;
    border: 0;
    display: flex;
  }
  #search{
    width: 730px;
    background-color: rgb(223, 223, 223);
    height: 40px;
    border: 0;
  }
  #search:focus{
    outline: 0;
  }
</style>
