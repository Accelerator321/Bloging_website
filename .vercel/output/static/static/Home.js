var i = 10;
var page = 1;



var tpage;

function checkpage(){
if(page ==1){
    document.getElementById('prev').style.display ='none';
}
else{
    document.getElementById('prev').style.display ='initial';
}
if(tpage){

    if(page==tpage){
        document.getElementById('next').style.display = 'none';
    }
    else{
        document.getElementById('next').style.display = 'initial';
    }
}

}

fetch('/totalpage').then(res=>res.json()).then(pages=>{
    tpage = parseInt(pages);
  
    checkpage();
})




document.getElementById('next').addEventListener('click',()=>{
    page +=1;
    showblog();
    checkpage();
   
    
    
})
document.getElementById('prev').addEventListener('click',()=>{
    page -=1;
    showblog();
    checkpage();

    
})


const showblog = async()=>{
    var data = await fetch(`/recentblogs?page=${page}`).then(res => res.json())
    document.querySelector('#cardbox').innerHTML = ' ';
        let end =10;
        if (data.length <10){
            end = data.length;
        }

        for (let i = 0; i < end; i++) {
            div = document.createElement('div');
            div.setAttribute('class', 'card mb-3 rcard')
            div.style.maxWidth = '540px';
            div.innerHTML =`
            <div class="hcard krow no-gutters">
              <div class="col-md-4" style="max-height:190px">
                <a href="/getblogs?getid=${data[i].getid}">
                <img src="${data[i].image[0]}" class="card-img"alt="..."></a>
              </div>
              <div class="col-md-8">
                <div class="card-body" style="min-height: 192px; max-height:450px;">
                  <h5 class="card-title">${data[i].title}</h5>
                  <a href="/getblogs?getid=${data[i].getid}" style="color:white;">
                  <p class="card-text">${data[i].text[0].slice(0, 150)}...<a href="/getblogs?getid=${data[i].getid}" style="color:#b38c80;">Read More</a></p></a>
                  
                </div>
              </div>
            </div>`
            
            document.querySelector('#cardbox').appendChild(div);
        }
}

showblog();
