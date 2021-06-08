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
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  

  loadMoreBtn.show();
  loadMoreBtn.disable(); 
    
  newGalleryApiService.query = e.currentTarget.elements.query.value;  
  newGalleryApiService.resetPage();
  newGalleryApiService.apiService()
      .then(gallery => {
        clearContainer(); 
        buildListMarkup(gallery); // тут пересмотреть
        
        
        loadMoreBtn.disable();
      })
      .catch('error');

       
}

function buildListMarkup(gallery) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', galleryCards(gallery))
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

function onLoadMore() {
  newGalleryApiService.apiService()
      .then(buildListMarkup)
      .catch('error');   
}







