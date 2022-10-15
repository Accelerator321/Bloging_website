fetch(`/blogcontent?getid=${document.getElementById('get').innerHTML.replace("/", "")}`).then(res=>res.json()).then(data=>{

            var p =0;
            var h= 0;
            var im =0;
           
    for(let i=0; i<data.pattern.length;i++){

        if(data.pattern[i].includes("p")){
            

            for(let item of data.text[p].split('\n')){
               
                document.getElementById('myblog').innerHTML +=`<p class="card-text" style="font-family: 'Edu SA Beginner', cursive;font-size: 1.4rem;font-weight: 400;margin: 20px 1em;">${item}</p>`;
           
            }
            p++;

            
            
        }
        else if(data.pattern[i].includes('h')){
            var val =document.getElementById('myblog').innerHTML;
            document.getElementById('myblog').innerHTML = val+ `<h2 class="card-text" style="font-family: 'Edu SA Beginner', cursive; margin: 20px 1em;">${data.heading[h]}</h2>`;
            h++;
        }
        else if(data.pattern[i].includes('i')){
            var val =document.getElementById('myblog').innerHTML;
            document.getElementById('myblog').innerHTML = val+ `<img src="${data.image[im]}" alt="..." style="max-height:65vh; width:100%; object-fit:contain;"/>`
            im++;
        }

    }
}
)
