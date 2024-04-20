const API_KEY="16b83e89bd3940178375df658c399a90"
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("World")); ///when the page loads it will fetch the news of world

function reload() { //function to reload the page
    window.location.reload(); //when we click on the logo it will reload the page
}   

async function fetchNews(query) { //function to fetch the news
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);//fetching the news from the api
    const data = await res.json();//converting the fetched data into json
    bindData(data.articles); //binding the fetched data
}

function bindData(articles) { //function to bind the data
    const cardsContainer = document.getElementById("cards-container");//getting the cards container
    const newsCardTemplate = document.getElementById("template-news-card");//getting the template of the news card

    cardsContainer.innerHTML = "";//emptying the cards container

    articles.forEach((article) => { //iterating through the articles
        if (!article.urlToImage) return;//if there is no image then return
        const cardClone = newsCardTemplate.content.cloneNode(true);//cloning the template of the news card
        fillDataInCard(cardClone, article);//filling the data in the card
        cardsContainer.appendChild(cardClone);//appending the card to the cards container
    });
}

function fillDataInCard(cardClone, article) { //function to fill the data in the card
    const newsImg = cardClone.querySelector("#news-img");//getting the news image
    const newsTitle = cardClone.querySelector("#news-title");//getting the news title
    const newsSource = cardClone.querySelector("#news-source");//getting the news source
    const newsDesc = cardClone.querySelector("#news-desc");//getting the news description

    newsImg.src = article.urlToImage;//setting the image source
    newsTitle.innerHTML = article.title;//setting the title
    newsDesc.innerHTML = article.description;//setting the description

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",//setting the time zone
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;//setting the source and date

    cardClone.firstElementChild.addEventListener("click", () => { //adding an event listener to the card
        window.open(article.url, "_blank");//when we click on the card it will open the article in a new tab
    });
}


let curSelectedNav = null;//initializing the current selected nav to null
function onNavItemClick(id) { //function to handle the click event on the nav item 
    fetchNews(id);//fetching the news of the clicked nav item
    const navItem = document.getElementById(id);//getting the nav item
    curSelectedNav?.classList.remove("active");//removing the active class from the current selected nav item
    curSelectedNav = navItem;//setting the current selected nav item
    curSelectedNav.classList.add("active");// adding the active class to the current selected nav item
}
const searchButton = document.getElementById("search-button");//getting the search button
const searchText = document.getElementById("search-text");//getting the search text

searchButton.addEventListener("click", () => {//adding an event listener to the search button
    const query = searchText.value;//getting the value of the search text
    if (!query) return;//if the query is empty then return
    fetchNews(query);//fetching the news of the searched query
    curSelectedNav?.classList.remove("active");//removing the active class from the current selected nav item
    curSelectedNav = null;//setting the current selected nav item to null
});