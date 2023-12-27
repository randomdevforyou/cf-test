const express = require("express");

const app = express();

app.get("/", (req, res) => {


    console.log("got the request");
    let etag = req.get("If-None-Match");
    console.log("etag " + etag);
    console.log("etag query "  + req.query.etag);
        if(req.query.test === "true"){
                console.log("sending test");
                return     res.status(304).send();
        }
    if(req.query.etag && etag){
        if(req.query.etag === etag){
            console.log("returning etag");
            res.status(304).send();
            return;
        }
    }
    res.set("Cache-Control", 'public, no-cache="Set-Cookie", max-age=0, s-maxage=120, stale-while-revalidate=120');
    res.set("ETag", "12345");
    res.send("Hello World!");
});

app.get("/status", (req, res) => {
    res.status(200).send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});