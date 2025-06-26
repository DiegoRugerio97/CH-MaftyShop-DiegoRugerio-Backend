const form = document.getElementById('registerForm')

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }).then(async result => {
        let message = await result.json()
        if (result.status == 200) {
            alert(message.message)
            form.reset()
            window.location.replace('/login')
        }
        else {
            alert(message.message)
            form.reset()
        }
    })
})