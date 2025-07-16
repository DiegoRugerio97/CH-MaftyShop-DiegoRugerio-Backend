const form = document.getElementById('forgetPasswordForm')
const loadingSpinner = document.getElementById('loadingSpinner')

form.addEventListener('submit', e => {
    loadingSpinner.style.visibility= 'visible'
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/forgetPassword', {
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
        if (result.status === 404) {
            alert(message.message)
            form.reset()
        }
    })
})