const container = document.getElementById('card-container')
const spinner = document.getElementById('spinner')

let page = 1;
const limit = 10

const fetchData = async () => {
    try{
        spinner.style.display = "block"

        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
        
        const data = await response.json()
    
        spinner.style.display='none'
    
        displayData(data)
    }catch(error){
        console.error('Error fetching data:', error)
        spinner.style.display='none'
    }
   
}

const displayData =(data) => {
    data.forEach(item => {
        const card = document.createElement('div')
        card.className = 'card'

        card.innerHTML = `<img src="${item.url}" alt="${item.title}">
    <div class="card-container">
        <h3>"${item.title}"</h3>
        <p>"${item.albumId}"</p>
    </div>`
        
        container.appendChild(card)
    });
}

const loadMoreData = () =>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight -5){
        page++

        fetchData()
    }
}
window.addEventListener('scroll', loadMoreData)
window.addEventListener('DOMContentLoaded', fetchData)
