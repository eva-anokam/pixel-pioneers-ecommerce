document.addEventListener('DOMContentLoaded', () =>{
    const categoriesContainer = document.getElementById('products-categories')
    const productsContainer = document.querySelector('.products-container')

     function displayCategories(categories){
        categories.forEach(categoryItem => {
            const categoryItemList = document.createElement('li')
            categoryItemList.textContent = categoryItem

            categoriesContainer.appendChild(categoryItemList)
        })
    }

    function displayProduct(productArray){
        productsContainer.innerHTML = ''
        productArray.forEach(product => {
            const productDIv = document.createElement('div')
            productDIv.className = 'product-card'
            productDIv.innerHTML = `
            <img src=${product.image} alt=${product.title} id="product-image">
            <h3 id="product-name">${product.title}</h3>
            <p id="product-description">${product.description}</p>
            <p id="product-price">$ ${product.price}</p>
            <p id="product-category">${product.category}</p>
            <p id="product-rating">${product.rating.rate} (${product.rating.count} reviews)</p>
            `
            productsContainer.appendChild(productDIv)
        })
    }

    async function fetchCategory() {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const category = await res.json()
        // return category
        displayCategories(category)
    }

    async function fetchProducts(){
        const res = await fetch('https://fakestoreapi.com/products')
        const categoriesProducts = await res.json()
        return categoriesProducts
    }

    async function filterItemsByCategory(itemClicked) {
        const products = await fetchProducts() 
        if (itemClicked == 'electronics' ) {
            const electronicsProducts = products.filter( (product) => {
                return product.category === itemClicked
            }) 
            displayProduct(electronicsProducts)
           } else if (itemClicked == 'jewelery'){
            const jewelryProducts = products.filter( (product) => {
                return product.category === itemClicked 
            })
            displayProduct(jewelryProducts)
           } else if (itemClicked == "men's clothing"){
            const mensClothingProducts = products.filter( (product) => {
                return product.category === itemClicked 
            })
            displayProduct(mensClothingProducts)
           } else if (itemClicked == "women's clothing"){
            const womensClothingProducts = products.filter( (product) => {
                return product.category === itemClicked 
            })
            displayProduct(womensClothingProducts)
           } else {
                displayProduct([])
           } 
    }

    categoriesContainer.addEventListener('click', (event) => {
        const itemClicked = event.target.textContent
        filterItemsByCategory(itemClicked)

    })

    fetchCategory()
})