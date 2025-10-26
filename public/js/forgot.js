document.querySelector('form').addEventListener('submit',async (event)=>{
    event.preventDefault()
    try
    {
        let r = await axios.post('/forgot',{
            email : event.target.email.value
        })
        
        alert('password reset link has sent to your email. if your email was registered')
        window.location.href = `http://13.201.187.41/`;
    }
    catch(e)
    {
        console.log(e)
    }
})