// Adding Items to Cart

export const addCart = (product) => {
    return{
        type : "ADDITEM",
        payload : product
    }
}

// Deleting Items to Cart

export const delCart = (product) => {
    return{
        type : "DELITEM"
        payload : product
    }
}