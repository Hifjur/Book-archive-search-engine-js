// taking input from the input field
const searchInput = () =>{
    const previousResult= document.getElementById('search-result');
    previousResult.textContent = '';
    const text = document.getElementById('search-text');
    bookArchiveConnetor(text.value);
    text.value = '';
    document.getElementById('search-count').style.display='none';
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
const totalFindingResults= data =>{
    console.log(data);
    const resutlCount= document.getElementById('search-count-value');
    resutlCount.innerText = data.numFound;
    document.getElementById('search-count').style.display='block';

    diplayResult(data.docs);
};

//getting author and getting rid of undefined values
const getAuthor = book => {
    if (book.author_name === undefined){
        return 'Author Not Found!';
    }
    else{
        return book.author_name;
    };
}
//getting publisher and getting rid of undefined values
const getPublisher = book => {
    if (typeof(book.publisher) === 'object'){
        return book.publisher[0];
    }
    else if (book.publisher === undefined){
        return 'Not found!';
    }
    else{
        return book.publisher;
    };
}
//getting cover photo    
const getCover = book => {
    const coverPhoto= `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    if (book.cover_i === undefined){
        return `images/no_preview.png`;
    }
    else{
        return coverPhoto;
    };
}    
//search result
const diplayResult = books => {
    console.log(books);
    const result = document.getElementById('search-result');
    books.forEach(book => {
        const author = getAuthor(book);
        const coverPhoto = getCover(book);
        const publisher = getPublisher(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-card">
            <img src="${coverPhoto}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">by ${author} <br>
                Publisher: ${publisher}
                .</p>
            </div>
        </div>
        `;
        result.appendChild(div);
    });
}