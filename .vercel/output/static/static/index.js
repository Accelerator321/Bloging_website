function myFunction(){

    var doc1 = document.getElementsByClassName("navitem")

    for(var i =0; i<doc1.length; i++){

        if(doc1[i] == document.getElementById("ig")){
           
            continue;
        }

        if (doc1[i].style.display != "none"){

            doc1[i].style.display = "none"
        }
        else{
            doc1[i].style.display = "inline"
        }
    }
    
}

