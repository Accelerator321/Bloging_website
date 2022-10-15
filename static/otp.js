document.getElementById('otpbtn').addEventListener("click",(e)=>{

    fetch("/user/signup/validate",
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
                body: JSON.stringify({'otp':document.getElementById("otp").value})
                
            }
        ).then(res=>res.json()).then(result=>{
           
            if(result){
                document.getElementById('signupbtn').click()
            }
            if(!result){
                document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Invalid Otp</span>'
            }
        })
   
})


document.getElementById('resend').addEventListener('click',()=>{
    let url;
    if(document.getElementById('inputEmail4')){
        url = `/user/resend?email=${document.getElementById('inputEmail4').value}`;
    }
    else{
        url=`/user/resend?email=none`
    }
    fetch(url).then(res=>res.json());
})
document.getElementById('edit').addEventListener('click',()=>{
    
    document.getElementById('mydiv').innerHTML = `<label class="form-label" for="inputEmail4">Email</label>
    <input class="form-control" id="inputEmail4" type="email" style="color:black;" name="email" required=""/>
    <a class="btn btn-outline-primary" onclick="changeMail()"> Change</a>`
   
})

function changeMail(){
    document.getElementById('msg').innerHTML = 'please enter an email'
    if(document.getElementById("inputEmail4").value){
    fetch(`/user/changemail`,
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
                body: JSON.stringify({'email':document.getElementById("inputEmail4").value})
                
            

    }).then(res=>res.json()).then((data)=>{
        if(data){
        document.getElementById('msg').innerHTML = `An otp has been sent to- ${document.getElementById('inputEmail4').value}`
    }
        if(!data){
            document.getElementById('msg').innerHTML = `Email Already Reistered`
        }
    }
        )
}
else{
    document.getElementById('msg').innerHTML = 'please enter an email'
}
        
}