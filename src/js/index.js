import '../sass/main.scss';
import galleryCards from '../templates/gallery-cards.hbs';
import GalleryApiService from './apiService.js';
import getRefs from './get-refs.js';
import LoadMoreBtn from './load-more-batton';

const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newGalleryApiService = new GalleryApiService();

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();
  newGalleryApiService.query = e.currentTarget.elements.query.value; 

  loadMoreBtn.show();
  newGalleryApiService.resetPage();  
  clearContainer();
  fetchArticles ();        
}

// function onLoadMore() {
//   fetchArticles (); 
// }

function fetchArticles () {
  loadMoreBtn.disable();   
  newGalleryApiService.apiService()
      .then(gallery => {        
        buildListMarkup(gallery); // тут пересмотреть         
        loadMoreBtn.enable();
      })
      .catch('error'); 
}

function buildListMarkup(gallery) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', galleryCards(gallery));
  scroll();
}

function scroll(){
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearContainer() {
  refs.articlesContainer.innerHTML = '';
}

