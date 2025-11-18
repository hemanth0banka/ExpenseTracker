var pro;
function nos(f, p, c, n, l) {
    const div = document.createElement('div')
    div.id = 'pno'
    const first = document.createElement('button')
    const prev = document.createElement('button')
    prev.style = "background-color : lightgray"
    const last = document.createElement('button')
    const next = document.createElement('button')
    next.style = "background-color : lightgray"
    const current = document.createElement('button')
    current.style = "background-color : white;box-shadow : 0px 0px 2px rgb(86, 86, 86);border-color: lightgray;"
    first.addEventListener('click', (event) => { expenses(Number(f) - 1, document.querySelector('#no').value) })
    prev.addEventListener('click', (event) => { expenses(Number(c) - 2, document.querySelector('#no').value) })
    last.addEventListener('click', (event) => { expenses(Number(l) - 1, document.querySelector('#no').value) })
    next.addEventListener('click', (event) => { expenses(Number(c), document.querySelector('#no').value) })
    if (f > 0 && f < c) {
        first.innerHTML = f
        div.appendChild(first)
    }
    if (p >= 1 && p < c) {
        prev.innerHTML = ' << '
        div.appendChild(prev)
    }
    current.innerHTML = c
    div.appendChild(current)
    if (n > c && n <= l) {
        next.innerHTML = ' >> '
        div.appendChild(next)
    }
    if (l > c) {
        last.innerHTML = l
        div.appendChild(last)
    }
    document.querySelector('#dashboard').appendChild(div)
}

async function expenses(page, limit) {
    try {
        let data = await axios.post('/expenses', {
            page: page,
            limit: limit
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        document.querySelector('ul').innerHTML = ''
        const paginationControls = document.querySelector('#pno');
        if (paginationControls) {
            paginationControls.remove();
        }
        for (let x of data.data.data.expenses) {
            lists(x)
        }
        const prev = data.data.data.prev
        const current = data.data.data.current
        const next = data.data.data.next
        const last = data.data.data.last
        nos(1, prev, current, next, last)
    }
    catch (e) {
        console.log(e)
    }
}
function lists(x) {
    const li = document.createElement('li')
    const a = document.createElement('p')
    a.innerHTML = x.amount
    const d = document.createElement('p')
    d.innerHTML = x.description
    const c = document.createElement('p')
    c.innerHTML = x.category
    const button = document.createElement('button')
    button.innerHTML = 'Delete'
    button.id = 'cancel'
    button.addEventListener('click', async () => {
        try {
            let d = await axios.delete('/expenses', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    id: x.id,
                    amount: x.amount
                }
            })
            document.querySelector('ul').removeChild(li)
        }
        catch (e) {
            console.log(e)
        }
    })
    li.appendChild(a)
    li.appendChild(d)
    li.appendChild(c)
    li.appendChild(button)
    document.querySelector('ul').appendChild(li)
}

window.addEventListener('load', async () => {
    try {
        let data = await axios.get('/pro', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const name = data.data.data[1]
        const select = document.createElement('select')
        select.value = name + ' '
        const but = document.createElement('button')
        but.innerHTML = 'LogOut'

        const op = document.createElement('option')
        op.innerHTML = name
        op.hidden = true
        const op1 = document.createElement('option')
        op1.innerHTML = 'LogOut'
        select.appendChild(op)
        select.appendChild(op1)
        select.addEventListener('change', () => {
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:1000/'
        })
        document.querySelector('#div1').appendChild(select)
        pro = data.data.data[0]
        if (pro == false) {
            const buy = document.createElement('button')
            const img = document.createElement('img')
            img.src = '/images/crown.png'
            buy.append(img, 'Pro')
            buy.id = 'buy'
            buy.addEventListener('click', async (event) => {
                event.preventDefault()
                try {
                    const cashfree = Cashfree({
                        mode: "sandbox"
                    });
                    let data = await axios.post('/pro/buy', {}, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    console.log(data)
                    const { orderId, paymentSessionId } = data.data.data
                    let checkoutOptions = {
                        paymentSessionId: paymentSessionId,
                        redirectTarget: "_modal",
                    };
                    let result = await cashfree.checkout(checkoutOptions)
                    if (result.error) {
                        console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                        console.log(result.error);
                    }
                    if (result.redirect) {

                        console.log("Payment will be redirected");
                    }
                    if (result.paymentDetails) {

                        console.log("Payment has been completed, Check for Payment Status");
                        console.log(result.paymentDetails.paymentMessage);
                        let a = await axios.get(`/pro/buy/${orderId}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        alert(`your Payment ${a.data.data}`)
                        pro = true
                    }

                }
                catch (e) {
                    alert('Payment fail')
                    console.log(e)
                }
            })
            document.querySelector('#div1').appendChild(buy)
        }
    }
    catch (e) {
        console.log(e)
    }
})

document.querySelector('#home').addEventListener('click', async (event) => {
    event.preventDefault()
    document.querySelector('#dashboard').innerHTML = ''
    const add = document.createElement('button')
    add.id = 'add'
    add.innerHTML = ' + '
    add.addEventListener('click', () => {
        const form = document.createElement('form')
        const label = document.createElement('label')
        label.innerHTML = 'Amount'
        const input = document.createElement('input')
        const label2 = document.createElement('label')
        label2.innerHTML = 'Description'
        const input2 = document.createElement('input')
        const label3 = document.createElement('label')
        label3.innerHTML = 'Category'
        const input3 = document.createElement('select')
        const option1 = document.createElement('option')
        option1.innerHTML = 'Movie'
        option1.value = 'Movie'
        const option2 = document.createElement('option')
        option2.innerHTML = 'Fuel'
        option2.value = 'Fuel'
        const option3 = document.createElement('option')
        option3.innerHTML = 'Electricity'
        option3.value = 'Electricity'
        const ok = document.createElement('button')
        ok.innerHTML = 'ok'
        ok.type = 'submit'
        ok.id = 'submit'
        form.id = 'new'
        const cancel = document.createElement('button')
        cancel.innerHTML = 'cancel'
        cancel.id = 'cancel'
        cancel.addEventListener('click', () => {
            document.querySelector('#dashboard').removeChild(form)
        })
        input3.appendChild(option1)
        input3.appendChild(option2)
        input3.appendChild(option3)
        form.appendChild(label)
        form.appendChild(input)
        form.appendChild(label2)
        form.appendChild(input2)
        form.appendChild(label3)
        form.appendChild(input3)
        form.appendChild(ok)
        form.appendChild(cancel)
        document.querySelector('#dashboard').appendChild(form)
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            try {
                let d = await axios.post('/expenses/add', {
                    amount: input.value,
                    description: input2.value,
                    category: input3.value
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(d)
                document.querySelector('#dashboard').removeChild(form)
            }
            catch (e) {
                console.log(e)
            }
        })
    })
    document.querySelector('#dashboard').appendChild(add)

})

document.querySelector('#expenses').addEventListener('click', async (event) => {
    event.preventDefault()
    let form = document.createElement('form')
    form.id = 'pages'
    let label = document.createElement('label')
    label.innerHTML = 'no.of'
    let ok = document.createElement('button')
    ok.innerHTML = 'ok'
    ok.type = 'submit'
    ok.id = 'submit'
    let select = document.createElement('select')
    select.name = 'no'
    select.id = 'no'
    let op = document.createElement('option')
    op.value = 2
    op.innerHTML = 2
    let op1 = document.createElement('option')
    op1.value = 4
    op1.innerHTML = 4
    let op2 = document.createElement('option')
    op2.value = 10
    op2.innerHTML = 10
    let op3 = document.createElement('option')
    op3.value = 15
    op3.innerHTML = 15
    let op4 = document.createElement('option')
    op4.value = 20
    op4.innerHTML = 20
    let op5 = document.createElement('option')
    op5.value = 25
    op5.innerHTML = 25
    select.appendChild(op)
    select.appendChild(op1)
    select.appendChild(op2)
    select.appendChild(op3)
    select.appendChild(op4)
    select.appendChild(op5)
    form.appendChild(ok)
    form.appendChild(select)
    form.appendChild(label)
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        expenses(0, event.target.no.value)
    })
    const ul = document.createElement('ul')
    document.querySelector('#dashboard').innerHTML = ''
    document.querySelector('#dashboard').appendChild(form)
    document.querySelector('#dashboard').appendChild(ul)
    await expenses(0, 4)
    if (pro != false) {
        const button = document.createElement('button')
        button.innerHTML = ' 🡻 Download'
        button.id = 'submit'
        button.addEventListener('click', async () => {
            try {
                const response = await axios.get('/download', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const a = document.createElement('a')
                a.href = response.data.data.Location
                a.download = 'expenses.txt'
                a.click()
                console.log(response.data.data)
            }
            catch (e) {
                console.log(e)
            }
        })
        button.style = 'position:absolute;bottom:90px;right:100px;padding:20px;box-shadow : 0px 0px 5px rgb(176, 176, 176);'
        document.querySelector('#dashboard').appendChild(button)
    }
})

document.querySelector('#board').addEventListener('click', async (event) => {
    if (pro == false) {
        document.querySelector('#dashboard').innerHTML = '<h3 style="align-self:center;margin-top:17%;">Buy Pro 🔒 to Unlock This Feature </h3> '
        return 0
    }
    try {
        let users = await axios.get('/rank', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(users)
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        const td0 = document.createElement('th')
        td0.innerHTML = 'Rank'
        const td1 = document.createElement('th')
        td1.innerHTML = 'Name'
        const td2 = document.createElement('th')
        td2.innerHTML = 'Total Amount'
        thead.appendChild(td0)
        thead.appendChild(td1)
        thead.appendChild(td2)
        table.appendChild(thead)
        let i = 1;
        for (let x of users.data.data) {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            td.innerHTML = `🎖️ ${i}`
            const td3 = document.createElement('td')
            td3.innerHTML = x.username
            const td4 = document.createElement('td')
            td4.innerHTML = x.total
            tr.appendChild(td)
            tr.appendChild(td3)
            tr.appendChild(td4)
            table.appendChild(tr)
            i++
        }
        document.querySelector('#dashboard').innerHTML = ''
        document.querySelector('#dashboard').appendChild(table)
    }
    catch (e) {
        console.log(e)
    }
})

document.querySelector('#progress').addEventListener('click', async (event) => {
    event.preventDefault()
    if (pro == false) {
        document.querySelector('#dashboard').innerHTML = '<h3 style="align-self:center;margin-top:17%;">Buy Pro 🔒 to Unlock This Feature </h3> '
        return 0
    }
    document.querySelector('#dashboard').innerHTML = ''
    const div1 = document.createElement('div')
    const div2 = document.createElement('ul')
    document.querySelector('#dashboard').appendChild(div1)
    document.querySelector('#dashboard').appendChild(div2)
    const today = document.createElement('button')
    today.innerHTML = 'Today'
    today.addEventListener('click', async () => {
        div2.innerHTML = ''
        try {
            let result = await axios.post('/progress', {
                end: new Date(),
                start: new Date(Date.now() - (1000 * 60 * 60 * 24))
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            for (let x of result.data.data) {
                lists(x)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
    div1.appendChild(today)
    const week = document.createElement('button')
    week.innerHTML = 'week'
    week.addEventListener('click', async () => {
        div2.innerHTML = ''
        try {
            let result = await axios.post('/progress', {
                end: new Date(),
                start: new Date(Date.now() - (1000 * 60 * 60 * 24 * 7))
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            for (let x of result.data.data) {
                lists(x)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
    div1.appendChild(week)
    const month = document.createElement('button')
    month.innerHTML = 'month'
    month.addEventListener('click', async () => {
        div2.innerHTML = ''
        try {
            let result = await axios.post('/progress', {
                end: new Date(),
                start: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30))
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            for (let x of result.data.data) {
                lists(x)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
    div1.appendChild(month)
    const year = document.createElement('button')
    year.innerHTML = 'year'
    year.addEventListener('click', async () => {
        div2.innerHTML = ''
        try {
            let result = await axios.post('/progress', {
                end: new Date(),
                start: new Date(Date.now() - (1000 * 60 * 60 * 24 * 365))
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            for (let x of result.data.data) {
                lists(x)
            }
        }
        catch (e) {
            console.log(e)
        }
    })
    div1.appendChild(year)
    const custom = document.createElement('button')
    custom.innerHTML = 'custom'
    custom.addEventListener('click', async () => {
        div2.innerHTML = ''
        const form = document.createElement('form')
        const button = document.createElement('button')
        const label1 = document.createElement('label')
        const label2 = document.createElement('label')
        const from = document.createElement('input')
        const to = document.createElement('input')
        label1.innerHTML = 'From : '
        label2.innerHTML = 'To : '
        button.innerHTML = 'ok'
        button.type = 'submit'
        button.id = 'submit'
        from.name = 'from'
        from.type = 'date'
        to.type = 'date'
        to.name = 'to'
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            try {
                let result = await axios.post('/progress', {
                    start: new Date(event.target.from.value),
                    end: new Date(event.target.to.value)
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                for (let x of result.data.data) {
                    lists(x)
                }
            }
            catch (e) {
                console.log(e)
            }
        })
        form.appendChild(label1)
        form.appendChild(from)
        form.appendChild(label2)
        form.appendChild(to)
        form.appendChild(button)
        div2.appendChild(form)
    })
    div1.appendChild(custom)
})

document.querySelector('#ai').addEventListener('click', async (event) => {
    if (pro == false) {
        document.querySelector('#dashboard').innerHTML = '<h3 style="align-self:center;margin-top:17%;">Buy Pro 🔒 to Unlock This Feature </h3> '
        return 0
    }
    try {
        document.querySelector('#dashboard').innerHTML = ''
        const div = document.createElement('div')
        div.id = 'chat'
        document.querySelector('#dashboard').appendChild(div)
        const form = document.createElement('form')
        form.id = 'ask'
        const input = document.createElement('textarea')
        input.placeholder = 'Ask me anything ...'
        input.cols = 100
        input.rows = 0
        input.name = 'prompt'
        const button = document.createElement('button')
        button.type = 'submit'
        button.innerHTML = 'ask'
        button.id = 'submit'
        form.appendChild(input)
        form.appendChild(button)
        document.querySelector('#chat').appendChild(form)
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            const prompt = event.target.prompt.value
            form.reset()
            const txt = document.createElement('p')
            txt.id = 'user-prompt';
            txt.innerHTML = prompt
            document.querySelector('#chat').appendChild(txt)
            const p = document.createElement('p')
            p.id = 'ai-response';
            p.innerHTML = 'Thinking...'
            document.querySelector('#chat').appendChild(p)
            try {
                const response = await axios.post('/ask', {
                    prompt: prompt
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                p.innerHTML = response.data.data
            }
            catch (e) {
                p.innerHTML = 'Something Went wrong !'
                p.id = 'ai-error';
                console.log(e)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})
