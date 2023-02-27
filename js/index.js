/* start for control coding */


var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function(){
    modal.classList.add("active");
}
closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
    var i;
    for(i=0;i<allInput.length;i++){
        allInput[i].value = "";
    }
})

/* start all global variable */
var userData = [];
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var gsmEl = document.getElementById("gsm");
var prenomEl = document.querySelector("#prenom");
var l_nameEl = document.getElementById("l-name");
var emailEl = document.querySelector("#email");
var officeEl = document.querySelector("#entreprise");
var statutTitleEl = document.querySelector("#statut-title");
var adresseTitleEl = document.querySelector("#adresse-title");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var registerForm = document.querySelector("#register-form");
var imgUrl;
/* end all global variable */

/* start register coding */

registerBtn.onclick = function(e){
    e.preventDefault();
    regitrationData();
    getDataFromLocal();
    registerForm.reset('');
    closeBtn.click();
}
if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}


function regitrationData(){
    userData.push({
        gsm : gsmEl.value,
        prenom : prenomEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        officeCode : officeEl.value,
        statutTitle : statutTitleEl.value,
        adresseTitle : adresseTitleEl.value,
        profilePic : imgUrl == undefined ? "img/avtar.png" : imgUrl
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Bon travail !", "Enregistrement réussi !", "success");
}
var cardData = document.querySelector("#card-data");
// start returning data on page from localstorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML +=  `
        <tr index='${index}'>
            <td>${index+1}</td>
            <td><img src="${data.profilePic}" width="40"></td>
            <td>${data.gsm}</td>
            <td>${data.prenom}</td>
            <td>${data.l_name}</td>
            <td>${data.email}</td>
            <td>${data.officeCode}</td>
            <td>${data.statutTitle}</td>
            <td>${data.adresseTitle}</td>
            <td>
                <button class="edit-btn"><i class="fa fa-eye"></i></button>
                <button class="del-btn" style="background-color: #ff5722;"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        `;
    });

    /* start delete coding */
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
            title: "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER ?",
            text: "Une fois supprimé, vous ne pourrez plus récupérer ces données !",
            icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();
                  swal("SUPPRIMÉ !", {
                    icon: "success",
                  });
                } else {
                  swal("Les données sont en sécurité!");
                }
              });
        }
    }

    // start update coding
    var allEdit = document.querySelectorAll(".edit-btn");
    for(i=0;i<allEdit.length;i++){
        allEdit[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profilePic = imgTag[0].src;
            var gsm = td[2].innerHTML;
            var prenom = td[3].innerHTML;
            var l_name = td[4].innerHTML;
            var email = td[5].innerHTML;
            var officeCode = td[6].innerHTML;
            var statutTitle = td[7].innerHTML;
            var adresseTitle = td[8].innerHTML;

            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            gsmEl.value = gsm;
            prenomEl.value = prenom;
            l_nameEl.value = l_name;
            emailEl.value = email;
            officeEl.value = officeCode;
            statutTitleEl.value = statutTitle;
            adresseTitleEl.value = adresseTitle;
            profile_pic.src = profilePic;
            updateBtn.onclick = function(e){
                userData[index] = {
                    gsm : gsmEl.value,
                    prenom : prenomEl.value,
                    l_name : l_nameEl.value,
                    email : emailEl.value,
                    officeCode : officeEl.value,
                    statutTitle : statutTitleEl.value,
                    adresseTitle : adresseTitleEl.value,

                    profilePic : uploadPic.value == "" ? profile_pic.src : imgUrl
                }
                localStorage.setItem("userData",JSON.stringify(userData));
            }
        }
    }


}
getDataFromLocal();

// image procesing
uploadPic.onchange = function(){
    if(uploadPic.files[0].size < 1000000){

        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    }else{
        alert("File Size Is To Long");
    }
}

// start search coding

var searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
    searchFuc();
}

function searchFuc(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i;
    for(i=0;i<tr.length;i++){
        var gsm = tr[i].getElementsByTagName("TD")[2].innerHTML;
        var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
        var l_name = tr[i].getElementsByTagName("TD")[4].innerHTML;
        var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
        if(gsm.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(l_name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(name.toLowerCase().indexOf(filter) > -1){
                tr[i].style.display = "";
        }
        else if(email.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
}

// start clear all data

var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>{
    if(allDelBox.checked == true){
        swal({
            title: "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER ?",
            text: "Une fois supprimé, vous ne pourrez plus récupérer ces données !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location = location.href;
              swal("SUPPRIMÉ !", {
                icon: "success",
              });
            } else {
              swal("Les données sont en sécurité!");
            }
          });
    }
    else{
        swal("Cochez la case", "Veuillez cocher la case pour supprimer les données", "warning");
    }
})




  