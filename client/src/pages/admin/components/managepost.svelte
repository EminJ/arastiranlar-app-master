<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
      import List from './List.svelte';
    
      let postsInfo=[];
    onMount(async () => {
      const { data } = await axios.get('http://34.234.63.247:5678/api/show/post');
      postsInfo = data.blogposts;
    });
  </script>
  <List postsArray={postsInfo}/>