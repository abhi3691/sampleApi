const GenerateAccessToken = require("./authServer");
const express = require("express");
const app = express();

require("crypto").randomBytes(64).toString("hex");

const jwt = require("jsonwebtoken");

var ACCESS_TOKEN_SECRET_GLOBAL;

app.use(express.json());
const port = 3000;
const post = [
    {
        username: "kyle",
        title: "post 1",
    },
    {
        username: "jim",
        title: "post 2",
    },
];
app.get("/posts", authenticateToken, (req, res) => {
    res.json(post.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    // const password = req.body.password;
    const user = { name: username };
    let ACCESS_TOKEN_SECRET = GenerateAccessToken();
    ACCESS_TOKEN_SECRET_GLOBAL = ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET_GLOBAL, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(port, console.log(`server is listening on port ${port}`));
