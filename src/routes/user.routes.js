const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/test/user", controller.userBoard);
  app.post("/api/admin/list/user", controller.userBoardAdmin);
  app.post("/api/change/userinfo", controller.changeuser);
  app.post("/api/user/show/likes", controller.userlike);
  app.post("/api/admin/perm/user", controller.updateuser);
  app.post("/api/admin/delete/user", controller.deleteuser);
  app.get("/api/veriable/count", controller.veriablecount);
  
};
