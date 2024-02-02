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

    categoriesContainer.addEventListener('click', (event) => {
        const itemClicked = event.target.textContent
       if (itemClicked == 'electronics' ) {
        productsContainer.textContent = 'electronics'
       } else if (itemClicked == 'jewelery'){
        productsContainer.textContent = 'jewelery'
       } else if (itemClicked == "men's clothing"){
        productsContainer.textContent = "men's clothing"
       } else if (itemClicked == "women's clothing"){
        productsContainer.textContent = "women's clothing"
       } else {
        productsContainer.textContent = 'Category not found'
       }
    })
    fetchProducts()

    fetchCategory()
})