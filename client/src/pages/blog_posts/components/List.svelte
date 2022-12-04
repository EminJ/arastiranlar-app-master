<script>
  export let postsArray;
</script>

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
</style>
