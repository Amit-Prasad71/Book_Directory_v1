const searchForm = document.getElementById("searchForm");
const searchField = document.getElementById("searchField");

//search result divs
const bookFoundDiv = document.querySelector(".bookFoundDiv");
const bookNotFoundDiv = document.getElementById("bookNotFoundDiv");

//addBook
const addBookDiv = document.getElementById("add-book-div");
const addBookBtn = document.getElementById("add-book-btn");

//search result fields
let sName = document.getElementById("found-name");
let sAuthor = document.getElementById("found-author");
let sYear = document.getElementById("found-year");

// search result buttons
let searchDelete  = document.querySelector(".search-delete");
let searchModify  = document.querySelector(".search-modify");

//close buttons

const foundDivCross = document.getElementById("found-div-cross");
const notFoundDivCross = document.getElementById("not-found-div-cross");
const addBookDivCross = document.getElementById("add-book-div-cross");

//delete-btns
let deleteBtns = document.querySelectorAll(".delete-btns");

//modify-form
const modifyForm = document.getElementById("modifyForm");
const modifyFields = document.querySelectorAll("#modifyForm .input");

//modify-btns
let modifyBtns = document.querySelectorAll(".modify-btns");
let modifyDivCross = document.getElementById("modify-div-cross");
let modifyDiv = document.getElementById("modifyDiv");
let modifyBtnIndex = -1;


//navbar burger and navbar menu
let navBurger = document.querySelector(".navbar-burger");
let navMenu = document.querySelector(".navbar-menu");


function hide(x){
    x.classList.add("is-hidden");
}
function unhide(x){
    x.classList.remove("is-hidden");
}
function toggle(x){
    x.classList.toggle("is-hidden");
}

navBurger.addEventListener('click',function(){
    navBurger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
});

for(var i=0;i<deleteBtns.length;i++){
    deleteBtns[i].addEventListener('click',function(){
        let deleteBtn = this.id;
        let index = deleteBtn.substring(9);

        const url="/deleteBook";
        const params = {
            bookIndex:parseInt(index,10)
        };
        const options = {
            method:"post",
            body:JSON.stringify(params),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        };
        fetch(url,options);
        window.location.reload(); //relods the webpage
        
    });
}


foundDivCross.addEventListener('click',function(){
    hide(bookFoundDiv);
});
notFoundDivCross.addEventListener('click',function(){
    hide(bookNotFoundDiv);
});
addBookDivCross.addEventListener('click',function(){
    hide(addBookDiv);
});
addBookBtn.addEventListener('click',function(){
    toggle(addBookDiv);
});

searchForm.addEventListener('submit',function(event){
    event.preventDefault();

    const url="/findBook";
    const params = {
        query:searchField.value
    };
    const options = {
        method:"post",
        body:JSON.stringify(params),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    };
    fetch(url,options).then(res => res.json()).then(data => {
        if(data == null){
            unhide(bookNotFoundDiv);
            hide(bookFoundDiv);
        }else{
            sName.innerHTML = data.name;
            sAuthor.innerHTML = data.author;
            sYear.innerHTML = data.year;

            bookFoundDiv.id = "index" + data.index;
            unhide(bookFoundDiv);
            hide(bookNotFoundDiv);
        }
    });
});


modifyForm.addEventListener('submit',function(event){
    event.preventDefault();

    const url="/modifyBook";
    const params = {
        name:modifyFields[0].value,
        author:modifyFields[1].value,
        year:modifyFields[2].value,
        index:modifyBtnIndex
    };
    const options = {
        method:"post",
        body:JSON.stringify(params),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    };
    fetch(url,options);
    window.location.reload();
});

for(var i=0;i<modifyBtns.length;i++){
    modifyBtns[i].addEventListener('click',function(){
        modifyDiv.classList.add("is-active");
        modifyBtnIndex = parseInt(this.id.substring(9),10);
    })
};

modifyDivCross.addEventListener('click',function(){
    modifyDiv.classList.remove("is-active");
    modifyFields[0].value = "";
    modifyFields[1].value = "";
    modifyFields[2].value = "";
});

searchDelete.addEventListener('click',function(){
    let index = bookFoundDiv.id.substring(5);

    const url="/deleteBook";
    const params = {
        bookIndex:parseInt(index,10)
    };
    const options = {
        method:"post",
        body:JSON.stringify(params),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    };
    fetch(url,options);
    window.location.reload(); //relods the webpage
});

searchModify.addEventListener('click',function(){
    modifyDiv.classList.add("is-active");
    modifyBtnIndex = parseInt(bookFoundDiv.id.substring(5),10);
});

