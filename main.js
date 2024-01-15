const ApiKey = "8c54fdb693cd4e28acfe309ac929ba83"
const url = "https://newsapi.org/v2/everything?q="
const searchBtn = document.getElementById('search-button')
const searchInput = document.getElementById('search-input')


// searchBtn.addEventListener('click',fetchNews(`${searchInput.value}`))

window.addEventListener('load', fetchNews('india'))


async function fetchNews(query) {
    const resp = await fetch(`${url}${query}&apiKey=${ApiKey}`)
    const data = await resp.json()
    console.log(data);
    //bindData(data.articles);
}
