document.addEventListener("DOMContentLoaded", function(){

    fetch('http://localhost:3000/quotes?_embed=likes')

.then(res => res.json())
.then(data => {console.log(data)
    data.forEach(dataQuote=>{

       const quoteUl = document.getElementById("quote-list")
       const quoteLi = document.createElement('li')
       quoteLi.className = 'quote-card'
       quoteUl.append(quoteLi)

       const blockQuote = document.createElement('blockquote')
       blockQuote.className = "blockquote"
       quoteLi.append(blockQuote)

       const pTag = document.createElement('p')
       pTag.className = "mb-0"
       pTag.innerText = dataQuote.quote
       blockQuote.append(pTag)

       const footer = document.createElement('footer')
       footer.className = "blockquote-footer"
       footer.innerText = dataQuote.author
       blockQuote.append(footer)

       const br = document.createElement('br')
       footer.append(br)

       const button1 = document.createElement('button')
       button1.className = 'btn-success'
       button1.innerText = 'Likes:'
       const span = document.createElement('span')
       span.innerText = "0"
       button1.id = dataQuote.id
       button1.append(span)
       blockQuote.append(button1)

       const button2 = document.createElement('button')
       button2.className = 'btn-danger'
       button2.innerText = 'Delete'
       button2.id = dataQuote.id
       blockQuote.append(button2)


    })

    
    const form = document.getElementById('new-quote-form')

    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        // console.log('JAM!')

        const newQuote = document.getElementById('new-quote')
        const newAuthor = document.getElementById('author')
        fetch('http://localhost:3000/quotes',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                quote: newQuote.value,
                author:newAuthor.value
            })
        })
      
        .then(res => res.json())
        .then(data => {console.log(data)

            const quoteUl = document.getElementById("quote-list")
       const quoteLi = document.createElement('li')
       quoteLi.className = 'quote-card'
       quoteUl.append(quoteLi)
    //    console.log(quoteUl)

       const blockQuote = document.createElement('blockquote')
       blockQuote.className = "blockquote"
       quoteLi.append(blockQuote)
    //    console.log(blockQuote)
       
       const pTag = document.createElement('p')
       pTag.className = "mb-0"
       pTag.innerText = data.quote
       blockQuote.append(pTag)
    //    console.log(pTag)
       
       const footer = document.createElement('footer')
       footer.className = "blockquote-footer"
       footer.innerText = data.author
       blockQuote.append(footer)
// console.log(footer)
       const br = document.createElement('br')
       footer.append(br)

       const button1 = document.createElement('button')
       button1.className = 'btn-success'
       button1.innerText = 'Likes:'
       const span = document.createElement('span')
       span.innerText = "0"
       button1.id = data.id
       button1.append(span)
       blockQuote.append(button1)

       const button2 = document.createElement('button')
       button2.className = 'btn-danger'
       button2.innerText = 'Delete'
       button2.id = data.id
       blockQuote.append(button2)
      

       })
      
       })

       const deleteButtons = document.getElementsByClassName('btn-danger')
        // console.log(deleteButtons)
    for(let button of deleteButtons){
        button.addEventListener('click', (e)=>{

            
// console.log(e.target.parentElement.parentElement)
e.target.parentElement.parentElement.remove()
// console.log(e.target.id)
const id = e.target.id 
fetch(`http://localhost:3000/quotes/${id}`,{
    method:'DELETE',
    headers: {
        'Content-Type':'application/json'
    }
})
.then(res => res.json())
.then(data => console.log(data))

})    
}

const likeButtons = document.getElementsByClassName('btn-success')
for(let button of likeButtons){
    button.addEventListener('click', (e)=>{

fetch('http://localhost:3000/likes',{
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      Accept: "application/json"
    },
  body: JSON.stringify({
     quoteId: parseInt(e.target.id)
    
  })
     })
    .then(res => res.json())
    .then(newLike => {console.log(newLike)
    })
    

    })
}
})
})

    
