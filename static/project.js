

let userSection=document.getElementById('usersection');
var username;
var data = fetch('/user').then(res=>res.json()).then(data=>{
  
 
    if(data){
        userSection.innerHTML = `<a class="text-light mx-1 text-decoration-none" id="username" href="/user/signin">${data.username}</a><img id="profilepic" src="${data.avatar}" alt="..." style="height:40px; width:40px; border-radius:50%;"/>`
        let welcome = document.getElementsByClassName('welcome');
        
        
    }
    let logBtn=document.getElementById('logbtn');
    let profile=document.getElementById('profile');
    if(!data){
        logBtn.style.display = 'none'
        profile.style.display = 'none'
    }

  let signBtn=document.getElementById('signbtn');

    if(data){
       signBtn.style.display = 'none'
    }

    if(data){
        document.getElementById("menu").style.display = 'initial';
    }
})




function check() {
    

    var user = document.getElementById('checkuser');
    var username = document.getElementById('inputUserName').value;

    if(username ===""){
        user.innerHTML = ``
        return
    }


    if (username.search(/ +/) !== -1){
        user.innerHTML = `<span style="color:red">Please Remove space from username</span>`
        document.getElementById("signupbtn").disabled = true;
    }

    else{
    params = {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
            body: JSON.stringify({'username':username})
            // JSON.stringify(user) 
        }


        if (username ===""){
            user.innerHTML=''
        }
        


const validity = fetch('/usercheck', params).then(response=>response.json()).then(json=>{

    if (json ===true) {

        user.innerHTML = `<span style="color:red">Username Not Available</span>`;
        document.getElementById("signupbtn").disabled = true;
    }
    
    
    else if(json===false){
    
        user.innerHTML = `<span style="color:green">Available</span>`
        document.getElementById("signupbtn").disabled = false;
    }
})

    }

}

function hide(){
    document.getElementById('searchlist').style.display ='none';
}

hide()
function show(){
    document.getElementById('searchlist').style.display ='initial';
}
async function searchitem(e){
    let searchlist = document.getElementById('searchlist');
    searchlist.innerHTML = '';

    searchlist.style.display ='initial';

    if(e.target.value.trim() ===""){
        searchlist.innerHTML = '';
        return
    }

    dummy = document.createElement('div')
    dummy.innerHTML = `<div class="my-3">Showing results for- ${e.target.value}</div>`
    
    

    data = await fetch(`/search?search=${e.target.value}&searchbar=true`).then(res=>res.json());
    searchlist.appendChild(dummy);


    for(let i =0; i<data.length;i++){
        div = document.createElement('div')
       
        div.innerHTML = `<a href="/getblogs?getid=${data[i].getid}" style="text-decoration:none;"><span><img src="${data[i].image[0]}"></span>${data[i].title} <div  style="margin-top:3px;font-size:0.8rem; color:pink;">Posted By-${data[i].username}</div></a><hr/>`;
        searchlist.appendChild(div);
    }
    div = document.createElement('div');
    div.style.textAlign ='center';
    div.style.paddingBottom='10px';
    div.innerHTML = `<a href="/results?search=${e.target.value}">See all results</a>`;
    searchlist.appendChild(div);
}


document.getElementById('logbtn').addEventListener('click',(e)=>{

    let conf = confirm("Are you sure u want to log out");

    if(!conf){
        e.preventDefault()
    }
})

function changepass(e){
    if(!confirm("Are u sure u want to reset password")){
        e.preventDefault();
    }
}





