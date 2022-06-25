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