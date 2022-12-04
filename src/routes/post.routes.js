const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
  app.post("/api/admin/post",
    controller.addpost
  );
  app.get("/api/show/post",
    controller.showpost
  );
  app.post("/api/post/like",
    controller.postlike
  );
  app.post("/api/post/dislike",
    controller.postdislike
  );
  app.post("/api/post/comments",
    controller.send_message
  );
  app.post("/api/post/commentsedit",
    controller.edit_message
  );
  app.post("/api/post/commentsdell",
    controller.comments_dell
  );
  app.post("/api/post/postdelete",
    controller.postdell
  );
  app.post("/api/show/post/comments",
    controller.show_message
  );
  app.post("/api/show/user/post",
    controller.show_message_user
  );
  app.post("/api/test/post",
    controller.control  
  ); 
  app.post("/api/post/save",
    controller.postsave
  ); 
  app.post("/api/admin/post/del",
    controller.postdell
  ); 
};

