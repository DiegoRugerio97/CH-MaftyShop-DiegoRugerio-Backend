const form = document.getElementById('resetPasswordForm')

form.addEventListener('submit', e => {
    // Obtain token from query parameters
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const token = urlParams.get('token')

    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    obj['token'] = token
    fetch('/api/sessions/resetPassword', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }).then(async result => {
        let message = await result.json()
        if (result.status === 200) {
            alert(message.message)
            form.reset()
            window.location.replace('/login')
        }
        if (result.status === 400) {
            alert(message.message)
            form.reset()
        }
    })
})