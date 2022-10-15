document.getElementById('otpbtn').addEventListener("click",(e)=>{

    if(!document.getElementById('otp').value){
        document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">please Enter the otp</span>';
        return;
    }

    if(!document.getElementById('newpass').value.trim()){
        document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">please Enter New Password</span>';
        return;
    }
    fetch("/validate",
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
                body: JSON.stringify({'otp':document.getElementById("otp").value,"pass":document.getElementById('newpass').value})
                
            }
        ).then(res=>res.json()).then(result=>{
            
         
            if(result){
                alert('Password changed successfully')
                window.location.href="/";
            }
            if(!result){
                document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Invalid Otp</span>'
            }
        })
   
})



document.getElementById('resend').addEventListener('click',()=>{
    
        url=`/resend`
 
    fetch(url).then(res=>res.json()).then(data=>data);
})

document.getElementById('send').addEventListener('click',(e)=>{
  
    document.getElementById('resend').style.display = 'initial';
    document.getElementById('otp').style.display = 'initial';
    document.getElementById('otpLabel').style.display = 'initial';
    document.getElementById('msgtop').innerHTML = 'An otp has beem sent to registered Email';
        e.target.style.display='none';
    
    url=`/resend`
 
    fetch(url).then(res=>res.json()).then(data=>data);

})
