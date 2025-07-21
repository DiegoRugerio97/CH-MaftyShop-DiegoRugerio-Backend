const removeFromCart = async (cid, pid) => {
    const response = await fetch(`http://localhost:8080/api/carts/${cid}/products/${pid}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    }).then(result => {
        if (result.status === 200) {
            alert("¡Producto eliminado del carrito! Refrescar la página.")
        }
        else{
            alert("Algo salio mal, intente mas tarde.")
        }
    })
}

const checkout = async () => {
    await fetch(`http://localhost:8080/api/tickets/checkout`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    }).then(result => {
        if (result.status === 200) {
            alert("¡Orden creada! Productos sin stock permaneceran en el carrito.")
        }
        else{
            alert("Algo salìo mal, intente mas tarde.")
        }
    })
}