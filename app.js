console.log("Let's get this party started!");


async function sendRequest(term){
    const options ={
        headers:{"Content-Type":"application/json"}
        }
    let url=`https://api.giphy.com/v1/gifs/search?api_key=lRu1FtI5Enxz3Lt5dPQdCjxIHlNRUva3&q=${term}&limit=&offset=0&rating=g&lang=en`
    let res = await axios.get(url, options);
    if(res.data.data.length === 0){
        alert(`No '${term}' gifs found`)
        

    }
    else{
        createGiph(res);
    }
}

function createGiph(res){
    const {data, pagination}=res.data;
    const results = document.querySelector('.results')
    if(pagination.count){
        const index = Math.floor(Math.random()*(pagination.count +1));
        const url = data[index].images.original.url;
        console.log(url)
        const giph= document.createElement('img');
        const container = document.createElement('div');
        container.append(giph);
        let btn =createDeleteBtn();
        container.append(btn);
        giph.classList.add('gif')
        giph.src = url;
        results.prepend(container);
        container.addEventListener('mouseleave',()=>{
            btn.style.display='none'

        })
        container.addEventListener('mouseover',()=>{
            btn.style.display='block'

        })
        
    }  
}
function checkForm(){
    const form =document.querySelector('form')
    const search = document.querySelector('#search')
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        sendRequest(search.value);
        search.value='';
    })
}
checkForm();


function createDeleteBtn(){
    const btn = document.createElement('btn');
    btn.classList.add('delete')
    btn.innerHTML= '<i class="fa fa-trash fa-3x" aria-hidden="true"></i>';
    btn.addEventListener('click',(e)=>{
        e.target.parentElement.parentElement.remove();
    })
    return btn
}