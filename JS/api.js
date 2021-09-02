// taking input from the input field
const searchInput = () => {
    const previousResult = document.getElementById('search-result');
    previousResult.textContent = '';
    document.getElementById('spinner').style.display="block"
    const text = document.getElementById('search-text');
    bookArchiveConnetor(text.value);
    text.value = '';

    document.getElementById('search-count').style.display = 'none';
}

//procecssing the input to fetch result
const bookArchiveConnetor = bookName => {
    const bookUrl = `https://openlibrary.org/search.json?q=${bookName}`;
    console.log(bookUrl);
    fetch(bookUrl)
        .then(res => res.json())
        .then(data => totalFindingResults(data));

}

//get eh data and shows search reasult
const totalFindingResults = data => {
    console.log(data);
    const resutlCount = document.getElementById('search-count-value');
    const counter = data.numFound;
    if (counter === 0) {
        resutlCount.innerHTML = `
        No result found
    `;
    }
    else {
        resutlCount.innerHTML = `
        About ${counter} results found..
    `;
    }
    document.getElementById('search-count').style.display = 'block';

    diplayResult(data.docs);
};

//getting author and getting rid of undefined values
const getAuthor = book => {
    if (book.author_name === undefined) {
        return 'Author Not Found!';
    }
    else {
        return book.author_name;
    };
}
//getting publisher and getting rid of undefined values
const getPublisher = book => {
    if (typeof (book.publisher) === 'object') {
        return book.publisher[0];
    }
    else if (book.publisher === undefined) {
        return 'Not found!';
    }
    else {
        return book.publisher;
    };
}
//getting publishing year and getting rid of undefined values
const getPublishYear = book => {
    if (typeof (book.publish_year) === 'object') {
        const yearArray = book.publish_year;
        return Math.min(...yearArray);
    }
    else if (book.publish_year === undefined) {
        return 'Not found!';
    }
    else {
        return book.publish_year;
    };
}
//getting cover photo    
const getCover = book => {
    const coverPhoto = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    if (book.cover_i === undefined) {
        return `images/no_preview.png`;
    }
    else {
        return coverPhoto;
    };
}
//search result
const diplayResult = books => {
    console.log(books);
    document.getElementById('spinner').style.display="none"
    const result = document.getElementById('search-result');
    books.forEach(book => {
        const author = getAuthor(book);
        const coverPhoto = getCover(book);
        const publisher = getPublisher(book);
        const publishYear = getPublishYear(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-card">
            <img src="${coverPhoto}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">by ${author} <br>
                Publisher: ${publisher} <br>
                Original Publishing Year: ${publishYear}
                </p>
            </div>
        </div>
        `;
        result.appendChild(div);
    });
}