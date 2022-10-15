const showblog = async()=>{

    var data = await fetch(`/search?search=${document.getElementById("query").innerHTML}`).then(res => res.json())
    document.querySelector('#cardbox').innerHTML = ' ';

        for (let i = 0; i < data.length; i++) {
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

