
const ApiKey = "8c54fdb693cd4e28acfe309ac929ba83"
const url = "https://newsapi.org/v2/everything?q="
const searchBtn= document.getElementById('search-button')
const searchInput=document.getElementById('search-input')


// searchBtn.addEventListener('click',fetchNews(`${searchInput.value}`))

window.addEventListener('load', fetchNews('india'))


async function fetchNews(query) {
    const resp = await fetch(`${url}${query}&apiKey=${ApiKey}`)
    const data = await resp.json()
    console.log(data);
    bindData(data.articles);
}
function bindData(articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    // Check if articles is defined and is an array
    if (Array.isArray(articles)) {
        articles.forEach((article) => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataCard(cardClone, article);
            cardContainer.appendChild(cardClone);
        });
    } else {
        console.error('Invalid or undefined articles data.');
    }
}

function fillDataCard(cardClone, article) {
    const cardImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDescription = cardClone.querySelector('#news-description')
    cardImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
window.open(article.url,"_blank")
    })
}
let CurSelectedNav= null;


function clickFun(id){
    fetchNews(id)
    const navItem=document.getElementById(id)
    CurSelectedNav?.classList.remove('active')
    CurSelectedNav=navItem;
    CurSelectedNav.classList.add('active')
}
searchBtn.addEventListener('click',()=>{
    const query =searchInput.value;
    if(!query) return;
    fetchNews(query)
    console.log(query);
    CurSelectedNav?.classList.remove('active')
    CurSelectedNav= null;
    
})
 

function reload(){
    window.location.reload()
}
