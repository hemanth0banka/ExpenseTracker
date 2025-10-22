document.querySelector('form').addEventListener('submit',async (event)=>{
    event.preventDefault()
    try
    {
        const uuid = window.location.pathname.split('/').pop();
        console.log(window.location.href)
        let result = await axios.put(`/forgot/${uuid}`,{
            password : event.target.new.value
        })
        alert(result.data.data)
        window.location.href = `http://3.111.53.35/`;
    }
    catch(e)
    {
        console.log(e)
    }
})