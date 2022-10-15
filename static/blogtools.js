var pattern = 'tip'
var i =2;
var p =2;
var h=1;
document.getElementById('imgbtn').addEventListener('click', ()=>{
    let blogValue = document.getElementById('blogcontent').innerHTML

    document.getElementById('blogcontent').innerHTML = blogValue + `<div class="col-md-12"><label class="form-label" >Add Image</label><input class="form-control"  type="file"/></div>`
    pattern += `i-${i}`;
    i +=1;
})


document.getElementById('textbtn').addEventListener('click', ()=>{
    let blogValue = document.getElementById('blogcontent').innerHTML

    document.getElementById('blogcontent').innerHTML = blogValue + `<div class="col-md-12"><label class="form-label" >Enter Text</label><textarea class="form-control" rows="10"></textarea></div>`;
    pattern += `p-${p}`;
    p+=1;
})
document.getElementById('headbtn').addEventListener('click', ()=>{
    let blogValue = document.getElementById('blogcontent').innerHTML

    document.getElementById('blogcontent').innerHTML = blogValue + `<div class="col-md-12"><label class="form-label" >Enter Heading</label><input class="form-control"  type="text"></input></div>`;
    pattern += `h-${h}`;
    h +=1
})
