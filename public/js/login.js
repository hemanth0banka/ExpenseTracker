document.querySelector('form').addEventListener('submit',async (event)=>{
    event.preventDefault()
    try
    {
        let data = await axios.post('/login',{
            username : event.target.username.value,
            password : event.target.password.value
        })
        window.localStorage.setItem('token',data.data.data)
        window.location.href = 'http://localhost:1000/home'
    }
    catch(e)
    {
        e.status == 404 ? alert('user with username not found') : 0
        e.status == 401 ? alert('password is incorrect') : 0
        console.log(e)
    }
})