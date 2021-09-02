// taking input from the input field
const searchInput = () =>{
    const text = document.getElementById('search-text');
    bookArchiveConnetor(text.value);
    text.value = '';
}

//procecssing the input to fetch result
const bookArchiveConnetor = bookName => {
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => diplayResult(data.docs));
    
}

const diplayResult = books => {
    const result = document.getElementById('search-result');
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-card">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        result.appendChild(div);
    });
}