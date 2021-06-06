export default function getRefs(){
    return {
        searchForm: document.querySelector('.js-search-form'),
        articlesContainer: document.querySelector('.js-gallary-container'),
        loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    
    };
}