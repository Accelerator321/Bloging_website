var pattern = document.getElementById('pattern');
var patt = 'tip'
pattern.value =patt;
var i =2;
var p =2;
var h=1;

document.getElementById(('imgbtn')).addEventListener('click', () => {
  let img = document.createElement("div");
    img.innerHTML += `<div class="col-md-12">
    <label class="form-label">Add Image</label>
    <button type="button" id="closeBtn"class="close" onclick="erase(event)"data-dismiss="alert" aria-label="Close">&times
  </button>
    <input class="form-control" id="i-${i}" type="file" required="" name="image"/>
  </div>`
    
    patt += `i-${i}`;
    i += 1
    document.getElementById('pattern').value = patt;
    document.getElementById('newblogdiv').appendChild(img);

})
document.getElementById(('headbtn')).addEventListener('click', () => {

  let head = document.createElement("div");
  head.innerHTML = `<div class="col-md-12">
  <label class="form-label">Enter Heading</label>
  <button type="button" id="closeBtn"class="close" onclick="erase(event)"data-dismiss="alert" aria-label="Close">&times
  </button>
  <input class="form-control" type="text" id="h-${h}" onchange="Filevalidation(event)" name="heading" required=""/>
</div>`;
document.getElementById('newblogdiv').appendChild(head);
    
    patt += `h-${h}`;
    h += 1;
    document.getElementById('pattern').value = patt;

})
document.getElementById(('parabtn')).addEventListener('click', () => {
  let text = document.createElement("div");
    text.innerHTML = `<div class="col-md-12">
    <label class="form-label">Enter Text</label>
    <button type="button" id="closeBtn"class="close" onclick="erase(event)"data-dismiss="alert" aria-label="Close">&times
  </button>
    <textarea class="form-control" rows="10" id="p-${p}" required="" name="text"></textarea>
  </div>`;
  document.getElementById('newblogdiv').appendChild(text);
    patt += `p-${p}`;
    p += 1;
    document.getElementById('pattern').value = patt;

})

function erase(event){
  
 
    var element = event.target.parentElement;
  
   
    element.remove();
   
    document.getElementById('pattern').value = patt.replace(`${event.target.nextElementSibling.id}`,'')
   

}


document.getElementById("creatbtn").addEventListener('click',(e)=>{
  

  var conf = confirm("Creat this Blog");


  if(conf){
  dispatchEvent(e);
}

  else{
    e.preventDefault();
  }



})

function fileValidation(event){

  const fi = event.target;
 
  if (fi.files.length > 0) {
      for (let i = 0; i <= fi.files.length - 1; i++) {

          const fsize = fi.files.item(i).size;
          const file = Math.round((fsize / 1024));
   
          if (file >= 2048) {
              alert(
                "File too Big, please select a file less than 4mb");
                event.target.value='';
          }  else {
                document.getElementById('size').innerHTML = '<b>'
                + file + '</b> KB';
            }
        }
    }
}






