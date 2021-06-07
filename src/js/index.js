import '../sass/main.scss';
import galleryCards from '../templates/gallery-cards.hbs';
import GalleryApiService from './apiService.js';
import getRefs from './get-refs.js';

const refs = getRefs();
const newGalleryApiService = new GalleryApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearContainer();
    
  newGalleryApiService.query = e.currentTarget.elements.query.value;  
  newGalleryApiService.resetPage();
  newGalleryApiService.apiService()
      .then(buildListMarkup)
      .catch('error');
}

function buildListMarkup(gallery) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', galleryCards(gallery))
}

function clearContainer() {
  refs.articlesContainer.innerHTML = '';
}

function onLoadMore() {
  newGalleryApiService.apiService()
      .then(buildListMarkup)
      .catch('error');  
}






