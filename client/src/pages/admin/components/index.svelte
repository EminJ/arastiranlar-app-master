<script>
    import AdminPage from './adminpage.svelte';
    import './style.css'
    import { onMount } from 'svelte';
    let token;
    onMount(()=>{
        token = decodeURIComponent(document.cookie).split(';')[0].split('=')[1];
    })
    
</script>
{#await token}
    <div class="fullscreen">
        <img src="./images/logo.png" alt="logo-arastiranlar" style="width: 100px;" id="waitanimation">
        <h1>Loading..</h1>
    </div>
{:then token} 
    <AdminPage querylogin={token}/>
{/await}
