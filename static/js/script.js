function addToCart(cartId, productId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error ("Couldn't add to cart" )
        }
        console.log("Product added to cart")
        return response.json()
    })
    .catch(error => console.error('Error: ', error))
}
