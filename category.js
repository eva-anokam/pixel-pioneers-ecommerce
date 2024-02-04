document.addEventListener('DOMContentLoaded', () => {
    let pageLoad = 1;
    const categoriesContainer = document.getElementById('products-categories')
    const productsContainer = document.querySelector('.products-container')

     function displayCategories(categories){
        categories.forEach(categoryItem => {
            const categoryItemList = document.createElement('li')
            categoryItemList.textContent = categoryItem
            categoriesContainer.appendChild(categoryItemList)
            if (pageLoad === 1) {
                categoriesContainer.firstElementChild.classList.add("active")
                pageLoad++
            }
        })
    }

    function displayProduct(productArray){
        productsContainer.innerHTML = ''
        productArray.forEach(product => {
            const productDIv = document.createElement('div')
            productDIv.className = 'product-card'
            productDIv.innerHTML = `
            <img src=${product.image} alt=${product.title} id="product-image">
            <div class="flow product-text">
            <h3 id="product-name">${product.title}</h3>
            <p id="product-description" class="truncate-text">${product.description} </p>
            <p class="read-more">Read more</p>
            </div>
            <div class="product-details">
            <p id="product-price">$ ${product.price}</p>
            <p id="product-category">${product.category}</p>
            </div>
            <p id="product-rating">${product.rating.rate} (${product.rating.count} reviews)</p>
            <button class="cta-link">Buy now</button>
            `
            productsContainer.appendChild(productDIv)
        })
        const readMoreBtn = document.querySelectorAll(".read-more")
        readMoreBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                const description = btn.previousElementSibling
                description.classList.toggle("truncate-text")
                if (!description.classList.contains("truncate-text")) {
                    btn.textContent = "Collapse"
                } else {
                    btn.textContent = "Read more"
                }
            })
        })
    }

    async function fetchCategory() {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const category = await res.json()
        displayCategories(category)
    }

    async function fetchProducts(){
        const res = await fetch('https://fakestoreapi.com/products')
        const categoriesProducts = await res.json()
        return categoriesProducts
    }

    async function filterItemsByCategory(itemClicked) {
        const products = await fetchProducts() 
        const filteredProducts = products.filter(product => product.category === itemClicked)
        displayProduct(filteredProducts)
    }
    function selectDefault(defaultItem) {
        filterItemsByCategory(defaultItem)
    }
    
    categoriesContainer.addEventListener('click', (event) => {
        const itemClicked = event.target.textContent
        const itemElementClicked = event.target
        const categoriesListItems = document.querySelectorAll("#products-categories li")
        if (itemElementClicked.tagName === "LI") {
            categoriesListItems.forEach(eachLi => eachLi.classList.remove("active"))
            itemElementClicked.classList.add("active")
       }
        filterItemsByCategory(itemClicked)

    })
    

    fetchCategory()

    selectDefault("electronics")

   
})