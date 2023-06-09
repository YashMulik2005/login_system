const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyPerser = require('body-parser')


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);
app.use(bodyPerser.json())
app.use(cookieParser())
app.use(express.json());
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized: false,
  cookie:{
    secure:false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

const con = mysql.createConnection({
  host: "localhost",
  database: "login_system",
  user: "root",
  password: "1234",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

app.listen(3000, () => {
  console.log("server is running.");
});

app.get("/",(req,res)=>{
  console.log(req.session.username);
  if(req.session.username){
    return res.status(200).json({
      data:{  sucess: true,
              username: req.session.username
      }
    })
  }
  else{
    return res.status(200).json({
      data:{ sucess:false }
    })
  }
})

app.post("/login", (req, res) => {
  const { data } = req.body;
  console.log(data);
  con.query(
    "select * from user where username= ?",
    data.username,
    (err, result) => {
      if (err) {
        return res.status(400).json({
          data: { error: err },
        });
      }
      if (result && result.length == 0) {
        return res.status(200).json({
          data: { sucess: false },
        });
      } else {
        if (data.password == result[0].password) {
          req.session.username = result[0].username;
          console.log(req.session.username);
          return res.status(200).json({
            data: { sucess: true },
          });
        } else {
          return res.status(200).json({
            data: { sucess: false },
          });
        }
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const { data } = req.body;
  con.query(
    "select * from user where username = ? ",
    data.username,
    (err, result) => {
      if (result && result.length > 0) {
        return res.status(200).json({
          data: { sucess: false },
        });
      } else {
        console.log(data.username);
        con.query(
          "insert into user (username, email, password ,name , m_no) values(?,?,?,?,?)",
          [data.username, data.email, data.password, data.name, data.m_no],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                data: { error: err },
              });
            } else {
              return res.status(200).json({
                data: { sucess: true },
              });
            }
          }
        );
      }
    }
  );
});
