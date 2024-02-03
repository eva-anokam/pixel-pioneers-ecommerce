document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more')
    let currPage = 0;
    let startIndex = 0;
    let endIndex = 5;


    async function getProducts(){
        const res = await fetch(`https://fakestoreapi.com/products`)
        const products = await res.json() 
        return products
    }

    function displayProducts(products){
        const container = document.getElementById('container')
        const page1 = products.slice(startIndex, endIndex)
        const page2 = products.slice(startIndex + 5, endIndex + 5)
        const page3 = products.slice(startIndex + 10, endIndex + 10)
        const page4 = products.slice(startIndex + 15, endIndex + 15)
        
    if (currPage === 1){
        page1.forEach(product => {
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
            container.appendChild(productDIv)
        })
    } else if (currPage === 2) {
        page2.forEach(product => {
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
            container.appendChild(productDIv)
        })
    } else if (currPage === 3) {
        page3.forEach(product => {
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
            container.appendChild(productDIv)
        })
    } else if (currPage === 4) {
        page4.forEach(product => {
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
            container.appendChild(productDIv)
        })
    } else {
        alert ('No more products to show')
    }
    }

    loadMoreBtn.addEventListener('click', async ()=> {
        const products = await getProducts()
        currPage = currPage + 1
        displayProducts(products)
    console.log(currPage)
})
    
    loadMoreBtn.click()
})