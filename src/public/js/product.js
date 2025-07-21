const addToCart = async (cid, pid) => {
    const response = await fetch(`http://localhost:8080/api/carts/${cid}/products/${pid}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ productQuantity: 1 }),
    }).then(result => {
        if (result.status === 200) {
            alert("¡Producto agregado al carrito!")
        }
        else{
            alert("Algo salio mal, intente mas tarde.")
        }
    })
}