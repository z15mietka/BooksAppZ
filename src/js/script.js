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
}}