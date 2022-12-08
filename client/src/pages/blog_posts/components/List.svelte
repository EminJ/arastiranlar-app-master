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
  {#if post.post_title.toLowerCase().includes(searchtext.toLowerCase())}
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
    height:auto;
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
    height: auto;
    display: flex;
    flex-wrap: nowrap;
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
    overflow-wrap: break-word;
    overflow: hidden;
  }
  .list1 .explanation{
    width: 100%;
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
  @media screen and (max-width: 1080px) {
    .searchbox{
      width: 700px;
    }
    #search{
      width: 630px;
    }
    .area1{
      width: 470px;
    }
    .area1 .list0{
      width: 460px;
    }
    .area1 .list1{
      width: 460px;
    }
    .outline{
      width: 630px;
    }
    }
	@media screen and (max-width: 960px) {
    .searchbox{
      width: 600px;
    }
    #search{
      width: 530px;
    }
    .area1{
      width: 370px;
    }
    .area1 .list0{
      width: 360px;
    }
    .area1 .list1{
      width: 360px;
    }
    .outline{
      width: 530px;
    }
    }
    @media screen and (max-width: 760px) {
    .searchbox{
      width: 500px;
    }
    #search{
      width: 430px;
    }
    .area1{
      width: 370px;
    }
    .area1 .list0{
      width: 360px;
    }
    .area1 .list1{
      width: 300px;
    }
    .outline{
      width: 530px;
    }
    }
    @media screen and (max-width: 660px) {
    .searchbox{
      width: 400px;
    }
    #search{
      width: 330px;
    }
    .outline{
      width: 315px;
      flex-direction: column;
    }
    .area0{
      width: 100%;
    }
    .area0 .img{
      height: 100px;
      width: 305px;
      margin: auto;
    }
    .area1{
      width: 100%;
    }
    .area1 .list0{
      width: 100%;
      margin: 0;
    }
    .list0 .title{
      overflow-wrap: break-word;
      width: 230px;
    }
    }
    @media screen and (max-width: 400px) {
    .searchbox{
      width: 260px;
    }
    #search{
      width: 200px;
    }
    .outline{
      width: 260px;
      flex-direction: column;
    }
    .area0{
      width: 100%;
    }
    .area0 .img{
      height: 100px;
      width: 250px;
      margin: auto;
    }
    .area1{
      width: 100%;
    }
    .area1 .list0{
      width: 100%;
      margin: 0;
    }
    .area1 .list1{
      width: 100%;
      margin: 0;
    }
    .list0 .title{
      overflow-wrap: break-word;
      width: 160px;
    }
    }
</style>
