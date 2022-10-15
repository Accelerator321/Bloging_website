document.getElementById('otpbtn').addEventListener("click",(e)=>{
    if(!document.getElementById('newpass').value){
        document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Please Enter a Password</span>'
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


document.getElementById('send').addEventListener('click',(e)=>{
    if(document.getElementById('inputEmail4').value){
      
        url = `/resend?email=${document.getElementById('inputEmail4').value}`;
        
        fetch(url).then(res=>res.json()).then(data=>
            {
           
                if(data ==="no"){
                    document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Email not registered</span>'
                }
                else{
                    document.getElementById('resend').style.display = "initial";
            document.getElementById('otplabel').style.display = "initial";
                document.getElementById('otp').style.display = "initial";
            e.target.style.display = "none";
                }
            });
       
    }
    else{
        document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Please enter an email</span>'
    }
    

})


document.getElementById('resend').addEventListener('click',(e)=>{
    if(document.getElementById('inputEmail4')){
        
        url = `/resend?email=${document.getElementById('inputEmail4').value}`;
        
        fetch(url).then(res=>res.json()).then(data=>
            {
               
                if(data ==="no"){
                    document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Email not registered</span>'
                }
               
            });
      
    }
    else{
        document.getElementById('msg').innerHTML = '<span style="color:red;word-break:break-word">Please enter an email</span>'
    }
    

 
   
})


