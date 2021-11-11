class BookList {
    constructor() {
      const thisBookList = this;
  
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.favoriteBook = 'favorite';
      thisBookList.filters = [];
    }
  
    initData() {
      this.data = dataSource.books;
    }
  
    getElements() {
      const thisBookList = this;
  
      thisBookList.booksList = document.querySelector('.books-list');
      thisBookList.bookTemplate = Handlebars.compile(
        document.querySelector('#template-book').innerHTML
      );
    }
    
    render() {
        const thisBookList = this;

        for (let eachBookdata of dataSource.books) {
         const ratingBgc = this.determineRatingBgc(eachBookdata.rating);
         const ratingWidth = eachBookdata.rating * 10;
         eachBookdata['ratingBgc'] = ratingBgc;
         eachBookdata['ratingWidth'] = ratingWidth;

         const generatedHTML = thisBookList.bookTemplate(eachBookdata);
         const generatedDOM = utils.createDOMFromHTML(generatedHTML);
         thisBookList.booksList.appendChild(generatedDOM);
    }
  }

  initActions() {
    const thisBookList = this;
    
    const favoriteBooks = [];
    console.log('favoriteBooks', favoriteBooks);
    
    const booksFronts = thisBookList.booksList.querySelectorAll('.book__image');
    
    for (let bookFront of booksFronts) {
      bookFront.addEventListener('dblclick', function (event) {
        event.preventDefault();
        console.log('bookFront :', bookFront);
        const favoriteBookAtribute = bookFront.getAttribute('data-id');
        const theBookIndex = favoriteBooks.indexOf(favoriteBookAtribute);
        //Jeśli id znajduje się w tablicy ulubionych książek
        if (!favoriteBooks[theBookIndex]) {
        //Dodaj id książki do tablicy favoriteBooks
          favoriteBooks.push(favoriteBookAtribute);
          //oraz nada mu klasę 'favourite'
          bookFront.classList.add(thisBookList.favoriteBook);
    
          console.log('add ' + favoriteBookAtribute + ' to favoriteBooks');
        } else {
          favoriteBooks.splice(theBookIndex, 1);
          console.log('remove ' + favoriteBookAtribute + ' to favoriteBooks');
          bookFront.classList.remove(thisBookList.favoriteBook);
        }
      });
  }
  /* FILTERS */

  console.log('filters', this.filters);
  const form = document.querySelector('.filters');

  form.addEventListener('click', function (event) {
    const clickedElement = event.target;

    const tagName = clickedElement.tagName;

    const type = clickedElement.getAttribute('type');

    const name = clickedElement.getAttribute('name');

    const value = clickedElement.getAttribute('value');

    const clickedElementIsCheckbox =
      tagName == 'INPUT' && type == 'checkbox' && name == 'filter';

    if (clickedElementIsCheckbox) {
      if (clickedElement.checked) {
        console.log('Add', value, 'to filters');
        thisBookList.filters.push(value);
      } else {
        console.log('Remove', value, 'from filters');
        const valueIndex = thisBookList.filters.indexOf(value);
        thisBookList.filters.splice(valueIndex, 1);
      }
    }
    thisBookList.filterBooks();
  });
}

/* FILTER BOOKS */

filterBooks() {
  const thisBookList = this;

  for (let eachBookdata of dataSource.books) {
    let shouldBeHidden = false;

    for (const option of this.filters) {
      if (!eachBookdata.details[option] == false) {
        shouldBeHidden = true;
        break;
      }
    }

    const bookImage = thisBookList.booksList.querySelector(
      // '.book__image[data-id="' + eachBookdata.id + '"'
      `.book__image[data-id="${eachBookdata.id}"]`
    );

    if (shouldBeHidden) {
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }
  }
}

/* Ratings */

determineRatingBgc(rating) {
  let ratingBackground = '';

  if (rating < 6) {
    ratingBackground =
      'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if (rating > 6 && rating <= 8) {
    ratingBackground = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  } else if (rating > 8 && rating <= 9) {
    ratingBackground = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9) {
    ratingBackground = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
  return ratingBackground;

  // console.log("ratingBackground", ratingBackground);
}
}

// eslint-disable-next-line no-unused-vars
const app = new BookList();
