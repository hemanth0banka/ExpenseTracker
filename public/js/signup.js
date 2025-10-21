document.querySelector('form').addEventListener('submit',async (event)=>{
    event.preventDefault()
    if(event.target.password.value != event.target.confirmpassword.value)
    {
        alert("please re check the password , passwords doesnt match")
        throw "passwords mismatch"
    }
    try
    {
        let r = await axios.post('/signup',{
            username : event.target.username.value,
            email : event.target.email.value,
            phone : event.target.mobile.value,
            password : event.target.password.value
        })
        alert('user created')
        window.location.href = `http://localhost:1000/`;
    }
    catch(e)
    {
        console.log(e)
    }
})