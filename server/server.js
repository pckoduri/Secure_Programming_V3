const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
const Group = require("./group");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
const fs = require("fs");
const File = require("./file_mapper");

//----------------------------------------- END OF IMPORTS---------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const token = req.body.groupId;
    Group.findOne({ _id: new ObjectId(token) }).then((auth) => {
      if (auth) {
        const uid = auth._id;
        const dest = "uploads/" + uid;
        req.uid = uid;
        fs.access(dest, function (error) {
          if (error) {
            console.log("Directory does not exist.");
            return fs.mkdir(dest, (error) => cb(error, dest));
          } else {
            console.log("Directory exists.");
            return cb(null, dest);
          }
        });
      } else {
        cb("Failed to upload", null);
      }
    });
  },
  filename: function (req, file, cb) {
    req.filename = file.originalname;
    console.log(file);
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

mongoose.connect(
  "mongodb+srv://praveen:yH2fP4B5OxYrAuvH@cluster0.qarknl9.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
  },
  (error) => {
    console.log(error);
    if (!error) {
      const adminEmail = "admin";
      const password = "password";
      User.findOne({ username: adminEmail }).then((user) => {
        if (!user) {
          bcrypt.hash(password, 10).then((hashedPassword) => {
            const admin = User({
              username: adminEmail,
              email: "admin@gmail.com",
              password: hashedPassword,
              role: "admin",
            });
            admin
              .save()
              .then(
                console.log(
                  "Admin created",
                  "Email: " + adminEmail,
                  "Password: " + password
                )
              );
          });
        } else {
          console.log(user);
        }
      });
    }

    console.log("Mongoose Is Connected");
  }
);

function authenticate(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://54.249.182.31:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.use((req, res, next) => {
  console.log(req.url + ": ");
  console.log(req.body);
  next();
});

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.status(404);
      res.send("No User Exists");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ username: user.username });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  console.log("new user");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.status(400);
      res.send("User Already Exists");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        role: "User",
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.post("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

app.get("/user", (req, res) => {
  if (req.user)
    User.findOne({ username: req.user.username }, function (err, user) {
      res.send({
        user: { username: user.username, email: user.email, role: user.role },
      });
    });
  else res.send({});
});

//----------------------------------------- END OF Auth---------------------------------------------------//

app.get("/users", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else
    User.find({}).then((usersList) => {
      let users = [];
      usersList.forEach((user) => {
        users.push({ email: user.email, username: user.username });
      });
      res.send(users);
    });
});

app.get("/groups", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    Group.find({}, function (err, groups) {
      const groupsFiltered = groups.filter((group) => {
        return (
          group.members.includes(req.user.username) ||
          group.admin == req.user.username
        );
      });
      res.send(groupsFiltered);
    });
  }
});

app.get("/group/:search", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    const id = req.params.search;
    console.log(id);
    Group.findOne({ _id: new ObjectId(id) }, function (err, group) {
      console.log(group);
      if (
        group &&
        (group.members.includes(req.user.username) ||
          group.admin == req.user.username)
      ) {
        res.send(group);
      } else {
        res.status(400);
        res.send("Authentication error");
      }
    });
  }
});

app.post("/upload", upload.single("documentFile"), (req, res) => {
  const fileUrl = "file/" + req.file.filename;
  const localPath = "uploads/" + req.uid + "/" + req.file.filename;
  const file = new File({
    filename: req.file.filename,
    path: localPath,
    groupId: req.uid,
    owner: req.user.username,
  });
  file.save().then((result) => {
    Group.findOne({ _id: new ObjectId(req.body.groupId) }).then((group) => {
      const document = {
        filename: req.file.filename,
        download: fileUrl,
        description: req.body.description,
        type: req.file.filename.split(".").pop(),
        title: req.body.title,
        owner: req.user.username,
        date: Date.now(),
      };
      group.documents.push(document);
      group.save().then(() => {
        res.send("Success");
      });
    });
  });
});

app.post("/create_group", (req, res) => {
  console.log(req.user);
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    const group = new Group({
      admin: req.user.username,
      title: req.body.title,
      description: req.body.description,
      document: [],
      members: req.body.members,
    });

    console.log(group);
    group
      .save()
      .then((obj) => {
        res.send("Created");
      })
      .catch((error) => {
        res.status(400);
        console.log(error);
        res.send(error);
      });
  }
});

// to download a file from user's folder
app.get("/file/:file", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    const filename = req.params.file;
    File.findOne({ filename: filename }).then((fileDetails) => {
      if (!fileDetails) {
        res.status(404);
        res.send("file not found");
      } else {
        Group.findOne({ _id: new ObjectId(fileDetails.groupId) }).then(
          (group) => {
            console.log(group);
            if (
              group &&
              (group.members.includes(req.user.username) ||
                group.admin == req.user.username)
            ) {
              console.log(fileDetails.path);
              res.download(fileDetails.path);
            } else {
              res.status(400);
              res.send("Authentication failed");
            }
          }
        );
      }
    });
  }
});

// to download a file from user's folder
app.post("/delete", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  }
  const filename = req.body.filename;
  File.findOne({ filename: filename }).then((fileDetails) => {
    if (!fileDetails) {
      res.status(404);
      res.send("file not found");
    } else {
      Group.findOne({ _id: new ObjectId(fileDetails.groupId) }).then(
        (group) => {
          console.log(group);
          if (
            group &&
            (group.admin == req.user.username ||
              fileDetails.owner == req.user.username)
          ) {
            const filtered = group.documents.filter(
              (document) => document.filename !== filename
            );
            group.documents = filtered;
            group.save().then((result) => res.send("Success"));
          } else {
            res.status(400);
            res.send("Authentication failed");
          }
        }
      );
    }
  });
});

app.post("/delete_member", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    Group.findOne({ _id: new ObjectId(req.body.group) }).then((group) => {
      console.log(group);
      if (
        group &&
        (group.admin == req.user.username ||
          req.user.role == "admin" ||
          req.user.username === req.body.member)
      ) {
        const filtered = group.members.filter(
          (member) => member !== req.body.member
        );
        group.members = filtered;
        group.save().then((result) => res.send("Success"));
      } else {
        res.status(400);
        res.send("Authentication failed");
      }
    });
  }
});

app.post("/add_member", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    Group.findOne({ _id: new ObjectId(req.body.group) }).then((group) => {
      console.log(group);
      if (
        group &&
        (group.admin == req.user.username || req.user.role == "admin")
      ) {
        group.members.push(req.body.member);
        group.save().then((result) => res.send("Success"));
      } else {
        res.status(400);
        res.send("Authentication failed");
      }
    });
  }
});

app.post("/delete_group", (req, res) => {
  if (!req.user) {
    res.status(400);
    res.send("Authentication failed");
  } else {
    Group.findOne({ _id: new ObjectId(req.body.group) }).then((group) => {
      console.log(group);
      if (
        group &&
        (group.admin == req.user.username || req.user.role == "admin")
      ) {
        Group.deleteOne({ _id: new ObjectId(req.body.group) }).then(
          (result) => {
            console.log(result);
            res.send("Group Deleted");
          }
        );
      } else {
        res.status(400);
        res.send("Authentication failed");
      }
    });
  }
});

//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
