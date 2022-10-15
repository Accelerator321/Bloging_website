

fetch(`/user/blogs?username=${document.getElementById('viewedUser').innerHTML.split(':')[1].trim()}`).then(res=>res.json()).then(json=>{

    

    for(let item of json.blogs.reverse()){
        let val = document.querySelector('#blogsdiv').innerHTML

    document.querySelector('#blogsdiv').innerHTML = val+ `<div class="card mb-3 rcard" style="max-width:540px;">
    <div class="hcard krow no-gutters">
      <div class="col-md-4" style="max-height:190px">
      <a href="/getblogs?getid=${item.getid}">
        <img src="${item.image[0]}" class="card-img"alt="..."></a>
      </div>
      <div class="col-md-8">
        <div class="card-body" style="min-height: 192px; max-height:450px;">
          <h5 class="card-title">${item.title}</h5>
          <a href="/getblogs?getid=${item.getid}" style="color:white; text-decoration:none;">
          <p class="card-text">${item.text[0].slice(0, 150)}...<a href="/getblogs?getid=${item.getid}" style="color:#b38c80;">Read More</a></p></a>
          
        </div>
      </div>
    </div>
  </div>`
}
})

