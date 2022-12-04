<script>
    import { sendpost_finish, addcategory} from "../javascript/connect";
    import { onMount } from "svelte";
    let editor;
    
    	export let toolbarOptions = [
    		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    		["bold", "italic", "underline", "strike"],
    		[{ list: "ordered" }, { list: "ordered" }],
    		[{ align: [] }],
    		["clean"]
    	];
    
    onMount(async () => {
    		const { default: Quill } = await import("quill");
    
      let quill = new Quill(editor, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow",
        placeholder: "Blog Yazmaya başla..."
      });
    });
</script>
<ul>
    <li>
        <p>Gönderi Başlığı</p>
        <input type="text" name="send_title" id="send_title" placeholder="Gönderi Başlığı" class="txt">
    </li>
    <li>
        <p>Gönderi Açıklaması</p>
        <input type="text" name="send_explanation" id="send_explanation" placeholder="Gönderi Açıklaması" class="txt">
    </li>
    <li>
        <label for="send_image" class="custom-file-upload">
            Resim Seçiniz
        </label>
        <input type="file" name="send_image" id="send_image" onchange="encodeImageFileAsURL();" accept="image/*">
    </li>
    <li>
        <p>Gönderi İçeriği</p>
        <div class="editor-wrapper" >
            <div bind:this={editor} />
        </div>
    </li>
    <li>
        <p>Gönderi Katagorisi Ekle</p>
        <input type="text" style="width: 200px;" name="send_category" id="send_category" class="txt" placeholder="#bilim">
        <input type="button" id="send_category_btn" value="Ekle" class="addbtn" on:click={addcategory}>
        <p class="category" id="category"></p>
    </li>
    <li>
        <button id="send_database_post_btn" on:click={sendpost_finish(editor)}><i class="bx bx-send"></i> Gönder</button>
    </li>
<script type='text/javascript'>
  function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("send_image").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        console.log(srcData);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }
</script>
</ul>

<style>
    @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
    .editor-wrapper{
        width: 600px;
    }
    p{
        font-size: 18px;
        color: #252525;
        margin: 3px;
    }
    li{
        margin: 15px;
    }
    .category{
        font-size: 15px;
    }
    .txt{
        font-size: 18px;
        color: #252525;
        background-color: #fff;
        border-radius: 15px;
        border: 0;
        width: 292px;
        height: 30px;
        padding-left: 8px;
        font-size: 0.9rem;
    }
    .addbtn{
        padding: 5px 10px;
        border: 0;
        border-radius: 8px;
        background-color: #389D77;
        color: white;
        font-weight: bold;
        transition: 0.2s;
    }
    .addbtn:hover{
        padding: 5px 10px;
        border-radius: 0 8px 8px 0;
        background-color: #5daf8f;
    }
    input:focus,textarea:focus{
        outline: 0;
    }
    #send_database_post_btn{
        width: 130px;
        height: 42px;
        transition: 0.2s;
        border: 0;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        transition: 0.3s;
    }
    
    #send_database_post_btn i{
       transition: 0.2s;
    }
    #send_database_post_btn:hover i{
       color: #389D77;
    }
</style>
