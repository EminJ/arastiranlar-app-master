const db = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = db.user;
const Post = db.post;

exports.addpost = (req, res, next) => {
  const token = req.body.author;
  if (!token || token == '') {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }

    User.findOne({ _id: decoded.id }, function (err, info) {
      var author = info.username;
      const post = new Post({
        post_author: author,
        post_title: req.body.title,
        post_explanation: req.body.explanation,
        post_text: req.body.text,
        post_up: 0,
        post_down: 0,
        post_comment: [],
        post_category: req.body.category,
        post_date: Date()
      });

      if (req.body.title == "" || req.body.explanation == "" || req.body.text == "") {
        return res.status(404).send({ message: "Eksik Veri Girişi Sağlandı!" });
      }

      post.save((err, post) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        res.status(200).send('👍');
      });
    });
  });
};

exports.showpost = async (req, res) => {
  blogposts = [];
  const posts = await Post.find({});
  posts.forEach((post) => {
    blogposts.push(post);
  });
  blogposts = blogposts.reverse();
  res.status(200).json({
    blogposts
  });
};

exports.control = (req, res) => {
  const post = req.body.postid;
  const token = req.body.token;
  if (!token) {
    return res.status(200).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }


    let out = [];
    User.findOne({ _id: decoded.id }, function (err, info) {
      for (let i = 0; i < info.postlike.length; i++) {
        const like = info.postlike[i];
        if (like == post) {
          out += '0';
        }
      }
      for (let i = 0; i < info.postdislike.length; i++) {
        const dislike = info.postdislike[i];
        if (dislike == post) {
          out += '1';
        }
      }
      for (let i = 0; i < info.postsave.length; i++) {
        const postsave = info.postsave[i];
        if (postsave == post) {
          out += '2';
        }
      }
      return res.status(200).send({ message: out });
    });
  });

}

exports.postlike = (req, res) => {
  const post = req.body.postid;
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }

    User.findOne({ _id: decoded.id }, function (err, info) {
      for (let i = 0; i < info.postdislike.length; i++) {
        const element = info.postdislike[i];
        if (element == post) {
          info.postdislike.pull(post)
          info.postlike.push(post)
          info.save()
          Post.findOne({ _id: post }, function (err, info) {

            Post.findByIdAndUpdate(post,
              {
                post_up: info.post_up + 1,
                post_down: info.post_down - 1,
              },
              function (err, docs) {
                if (docs) res.status(200).send({ message: 3 });
              });
          });
          return
        }
      }
      for (let i = 0; i < info.postlike.length; i++) {
        const element = info.postlike[i];
        if (element == post) {
          info.postlike.pull(post)
          info.save()
          Post.findOne({ _id: post }, function (err, info) {

            Post.findByIdAndUpdate(post,
              {
                post_up: info.post_up - 1,
              },
              function (err, docs) {
                if (docs) res.status(200).send({ message: 0 });
              });
          });
          return
        }
      }
      info.postlike.push(post)
      info.save()
      Post.findOne({ _id: post }, function (err, info) {

        Post.findByIdAndUpdate(post,
          {
            post_up: info.post_up + 1,
          },
          function (err, docs) {
            if (docs) res.status(200).send({ message: 1 });
          });
      });
    });
    return
  });

}

exports.postdislike = (req, res) => {
  const post = req.body.postid;
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }

    User.findOne({ _id: decoded.id }, function (err, info) {
      for (let i = 0; i < info.postlike.length; i++) {
        const element = info.postlike[i];
        if (element == post) {
          info.postlike.pull(post)
          info.postdislike.push(post)
          info.save()
          Post.findOne({ _id: post }, function (err, info) {

            Post.findByIdAndUpdate(post,
              {
                post_up: info.post_up - 1,
                post_down: info.post_down + 1,
              },
              function (err, docs) {
                if (docs) res.status(200).send({ message: 3 });
              });
          });
          return
        }
      }
      User.findOne({ _id: decoded.id }, function (err, info) {
        for (let i = 0; i < info.postdislike.length; i++) {
          const element = info.postdislike[i];
          if (element == post) {
            info.postdislike.pull(post)
            info.save()
            Post.findOne({ _id: post }, function (err, info) {
              Post.findByIdAndUpdate(post,
                {
                  post_down: info.post_down - 1,
                },
                function (err, docs) {
                  if (docs) res.status(200).send({ message: 0 });
                });
            });
            return
          }
        }
        info.postdislike.push(post)
        info.save()
        Post.findOne({ _id: post }, function (err, info) {

          Post.findByIdAndUpdate(post,
            {
              post_down: info.post_down + 1,
            },
            function (err, docs) {
              if (docs) res.status(200).send({ message: 1 });
            });
        });
      });
      return
    });
  })
}

exports.comments_dell = (req, res) => {
  const postmsgid = req.body.messageid;
  const token = req.body.token;
  const tokenpost = req.body.tokenpost;
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }
    User.findOne({ _id: decoded.id }, function (err, info) {
      Post.findOne({ _id: tokenpost }, function (err, post) {
        for (let i = 0; i < post.post_comment.length; i++) {
          const element = post.post_comment[i];
          if (element.messageid == postmsgid) {
            let onetoken=element.userid;
          
      
      if(info._id!=onetoken && info.roles=='635eb25438b20b702d8adfc9' || info.roles=='635eb25438b20b702d8adfc8'){
        Post.findOne({ _id: tokenpost }, function (err, post) {
          for (let i = 0; i < post.post_comment.length; i++) {
            const element = post.post_comment[i];
            if (element.messageid == postmsgid) {
              post.post_comment.pull(post.post_comment[i])
              post.save()
              User.findOne({ _id: element.userid }, function (err, info) {
                for (let i = 0; i < info.postcomments.length; i++) {
                  const element = info.postcomments[i];
                  if (element.messageid == postmsgid) {
                    Post.findOne({ _id: info.postcomments[i].post }, function (err, post) {
                      for (let i = 0; i < post.post_comment.length; i++) {
                        const element = post.post_comment[i];
                        if (element.messageid == postmsgid) {
                          post.post_comment.pull(post.post_comment[i])
                          post.save()
                        }
                      }
                    });
                    info.postcomments.pull(info.postcomments[i])
                    info.save()
                  }
                }
              });
            }
          }
        });
      }
      else{
      for (let i = 0; i < info.postcomments.length; i++) {
        const element = info.postcomments[i];
        if (element.messageid == postmsgid) {
          Post.findOne({ _id: info.postcomments[i].post }, function (err, post) {
            for (let i = 0; i < post.post_comment.length; i++) {
              const element = post.post_comment[i];
              if (element.messageid == postmsgid) {
                post.post_comment.pull(post.post_comment[i])
                post.save()
              }
            }
          });
          info.postcomments.pull(info.postcomments[i])
          info.save()
        }
      }
    }
    }
  }
}
    );
    });
    return res.status(200).send({ message: "ok" })
  });
}

exports.send_message = (req, res) => {
  const post = req.body.postid;
  const token = req.body.token;
  const message = req.body.message;
  const date = new Date();
  var datetime = date.getDate() + "/"
    + (date.getMonth() + 1) + "/"
    + date.getFullYear();
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }
    let messageid = Math.floor(Math.random() * 10000000) + 1000000;

    User.findOne({ _id: decoded.id }, function (err, info) {
      let user = info.username
      let userid = info._id
      info.postcomments.push({ post, userid, messageid, message, datetime })
      info.save()
      Post.findOne({ _id: post }, function (err, post) {
        post.post_comment.push({ user, userid, messageid, message, datetime })
        post.save()
      });
    });
    return res.status(200).send({ message: 1 })
  });
}

exports.edit_message = (req, res) => {
  const messageids = req.body.messageid;
  const token = req.body.token;
  const newtext = req.body.newtext;
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }
    
    ///// GERİ DÖNÜLECEK.......................

    User.findOne({ _id: decoded.id }, function (err, info) {
      for (let i = 0; i < info.postcomments.length; i++) {
        if(info.postcomments[i].messageid==messageids){
        
          
//----------------------------------------------------------------------------------

      }
    }
      return res.status(401);
    });
  });
}

exports.show_message_user = (req, res) => {
  blogmessage = [];
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }
      User.findOne({ _id: decoded.id }, function (err, user) {
        user.postcomments.forEach((message) => {
          blogmessage.push(message.post);
        });
        blogmessage = blogmessage.reverse();
        return res.status(200).send({ post: blogmessage});
      });
    });
}

exports.show_message = (req, res) => {
  blogmessage = [];
  const post = req.body.postid;
  const token = req.body.token;
  if (!token ||token=='') {
    Post.findOne({ _id: decoded.id }, function (err, post) {
      post.post_comment.forEach((message) => {
        blogmessage.push(message);
      });
      blogmessage = blogmessage.reverse();
      return res.status(200).send({ msg: blogmessage, token: '' });
      });
  }
  else{
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Geçersiz Token!" });
      }
      User.findOne({ _id: decoded.id }, function (err, user) {
        Post.findOne({ _id: post }, function (err, post) {
          post.post_comment.forEach((message) => {
            blogmessage.push(message);
          });
          blogmessage = blogmessage.reverse();
          return res.status(200).send({ msg: blogmessage, token: user._id, roles: user.roles});
        });
      });
      });
  }
}

exports.postsave = (req, res) => {
  const post = req.body.postid;
  const token = req.body.token;
  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }

    User.findOne({ _id: decoded.id }, function (err, info) {
      for (let i = 0; i < info.postsave.length; i++) {
        const element = info.postsave[i];
        if (element == post) {
          info.postsave.pull(post)
          info.save()
          return res.status(200).send({ message: 1 });
        }
      }
      info.postsave.push(post)
      info.save()
      return res.status(200).send({ message: 0 });
    });
  });

}

exports.postdell = (req, res) => {
  const postid = req.body.postid;
  const token = req.body.token;

  if (!token) {
    return res.status(403).send({ message: "Token Bulunmamaktadır!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Geçersiz Token!" });
    }
    
    User.findOne({ _id: decoded.id }, function (err, info) {
      if(info.roles!='635eb25438b20b702d8adfc9' && info.roles!='635eb25438b20b702d8adfc8'){
        return res.status(401).send({ message: "Yetkisiz Token!"+info.roles });
      }
      Post.find({ _id:postid }).remove().exec();
      return res.status(200).send({ message: "ars" })
  });
});
}
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.postimg = upload.single("myImage"),(req, res) => {
  const obj = {
    img: {
        data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
        contentType: "image/png"
    }
}
const newImage = new Post({
  post_image: obj.img
});

newImage.save((err) => {
    err ? console.log(err) : res.redirect("/");
});
}