const express = require('express');
const ejs = require('ejs');

const app = express();
const books =   [   {name:"Leaders eat last",author:"Simon Sinek",year:2013},
                    {name:"Alice's Adventures in Wonderland",author:"Lewis Caroll",year:1865},
                    {name:"A Brief History of Time",author:"Stephen Hawking",year:1988}
                ];
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('home',{bookList:books});
});

app.get('/about',function(req,res){
    res.render('about');
});

app.get('/allBooks',function(req,res){
    res.render('allBooks',{bookList:books});
});

app.post('/findBook',function(req,res){
    let searchRes = null;
    let bookName = req.body.query.toLowerCase();
    for(var i=0;i<books.length;i++){
        if(bookName === books[i].name.toLowerCase()){
            searchRes = books[i];
            searchRes.index = i;
            break;
        }
    };

    res.send(JSON.stringify(searchRes));
});

app.post('/addBook',function(req,res){
    books.push(req.body);
    res.redirect('/');
});

app.post('/deleteBook',function(req,res){
    books.splice(req.body.bookIndex,1);  //starting at bookIndex remove 1 element
    res.redirect('/');
});

app.post('/modifyBook',function(req,res){
    if(req.body.name !== ""){
        books[req.body.index].name = req.body.name;        
    }
    if(req.body.author !== ""){
        books[req.body.index].author = req.body.author;
    }
    if(req.body.year !== ""){
        books[req.body.index].year = req.body.year;
    }
});

app.listen(process.env.PORT,function(){
    console.log("Server running");
});