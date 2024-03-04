
fetch('/user/blogs').then(res=>res.json()).then(json=>{
    


    for(let item of json.blogs.reverse()){
        let val = document.querySelector('#blogsdiv tbody').innerHTML

    document.querySelector('#blogsdiv tbody').innerHTML = val+ `<tr>
        <td>
    <a><img src="${item.image[0]}" style="height:50px;width:50px;border-radius: 50%;"></a>
    <a href='/getblogs?getid=${item.getid}' style="word-break:break-all;">${item.title}</a></td>
    <td >${item.view} Views</td>
    <td><a class="btn btn-outline-danger" onclick="deletePost('${item.getid}','${item.title}')"  style="cursor:pointer;min-width:30px;" class='delete'>Delete</a>
    <td/>
    </tr>`}
})

const deletePost = (getid,title)=>{
    var conf = confirm(`Delete this Blog- ${title}`);


  if(!conf){
    return
}
    else{
   
    params = { 
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
            body: JSON.stringify({getid})
        }
    fetch('/user/deleteblog',params).then().then(()=>{location.reload()})}
}



    
  
