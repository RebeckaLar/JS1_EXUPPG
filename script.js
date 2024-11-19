//Array som hämtar alla data från arrayen i API:et. Används för att kunna display
const posts = [];

// -----EVENT LISTENERS-----
const btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    validateInput();
})


const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    validateSearch();
})

// function renderPosts2() {
//     let list = document.getElementById('list1');
//     posts.forEach(obj => {
//         let li = document.createElement('li');
//         list.appendChild(li);
//         li.innerText = obj.title;
//     })
// }

// -----METODER FÖR ATT SKAPA ELLER RENDERA OBJEKT-----
// //För eventuell PUT
//Adderar objekt (to-do's) från API:ets array till egen array Posts[] och visar på hemsidan
function renderPosts() {
    let list = document.getElementById('list1');
    posts.forEach(obj => {
        let div = document.createElement('div');
        let label = document.createElement('label')
        let item = document.createElement('input');

        label.setAttribute("for", "flexCheckDefault");
        item.setAttribute("id", "flexCheckDefault");
        item.setAttribute("type", "checkbox");
        item.setAttribute("class", "form-check-input");

        list.appendChild(div);
        div.appendChild(label);
        div.appendChild(item);
        label.innerText = obj.title;
    })
}

// const createTodo2 = () => {
//     const list = document.getElementById('list1');
//     const title = document.getElementById('title').value;

//     let li = document.createElement('li');
//     list.appendChild(li);
//     li.innerText = title;
    
//     console.log('createTodo() done. Title value is ' + title);
//     postTodo(title);
// }

//För eventuell PUT
const createTodo = () => {
    const list = document.getElementById('list1');
    const title = document.getElementById('title').value;

    let div = document.createElement('div');
    let label = document.createElement('label')
    let item = document.createElement('input');

    label.setAttribute("for", "flexCheckDefault");
    item.setAttribute("id", "flexCheckDefault");
    item.setAttribute("type", "checkbox");
    item.setAttribute("class", "form-check-input");

    list.appendChild(div);
    div.appendChild(label);
    div.appendChild(item);
    label.innerText = title;
    
    console.log('createTodo() done. Title value is ' + title);
    postTodo(title);
}

// -----HTTP METODER-----
//Funktion med kod från Joakim Lindh, 2024. Hämtad från YouTube, LindhCoding.
const getAllTodos = async() => {
    let url = 'https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c';

    try {
        const response = await fetch (url);
        console.log(response);

        if(response.status == 200) {
            console.log('Status 201, to-do created');
        } else {
            throw new Error ('Something went wrong.');
        }
        const data = await response.json()

        data.forEach(post => posts.push(post));
        renderPosts();

        //Arrayen med data från API:et
        console.log(data);

        //Egen array posts []
        console.log(posts);

    } catch (err) {
        console.log(err.message);
    }
}
getAllTodos();

//Triggas efter genomfört validateInput();
const postTodo = async (objTitle) => {
    let post = {
        title : objTitle
    }
    const url = 'https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c';

        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json' 
        },
        body : JSON.stringify(post)
    })
        console.log(response);

        if(response.status == 201) {
            console.log('Status 201, to-do created');
        } else {
            throw new Error ('Something went wrong.');
        }
        const data = await response.json()
        return data;
    }

const removeTodo = async (id) => {
    const bla = id._id;
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${bla}?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c`, {
        method: 'DELETE',
    })

    if(response.status !== 200) {
        throw new Error ('Something went wrong.');
    }
    console.log(response);
    const data = await response.json();
    console.log('Deleted todo with id:' + data);
    window.location.reload();
    return data;
}

//från https://stackoverflow.com/questions/78245676/nextjs-post-neterr-aborted-500-internal-server-error
// You have to always return a Response by:
// return new Response("message", {status: 200})
// return new NextResponse("message", {status: 200})
// return Response.json({...}, {status: 200})
// return NextResponse.json({...}, {status: 200})


// ----VALIDERING----
//Triggas vid klick på knappen Create to-do
const validateInput = () => {
    console.log('validateInput()');
    const title = document.getElementById('title');

    if(title.value === '' || title.length < 0 || title == null) {
        addErrorCreateTodo();
    } else {
        removeErrorCreateTodo();
        createTodo();
    }
}

//Triggas vid klick på knappen Delete to-do
const validateSearch = () => {
    console.log('validateSearch()');
    const search = document.getElementById('search').value;

    let matched;
    posts.filter(obj => {
        if (obj.title == search) {
            removeErrorDeleteTodo();
            removeTodo(obj);
            matched = true;
        } else {
            matched = false;
        }
    })
    
    if(matched == false) {
        addErrorDeleteTodo();
    }
}

// const addErrorMessage = () => {
//     const form = document.getElementById('form');
//     const errMessage = 'Please write a title';
//     const title = document.getElementById('title');
//     let p = document.createElement('p');
    
//     form.appendChild(p);
//     p.innerText = errMessage;
//     title.classList.add('error');
//     return;
// }

const addErrorCreateTodo = () => {
    console.log('addErrorCreateTodo()');

    const form = document.getElementById('createTodo');
    form.classList.add('error');
    return;
}

const addErrorDeleteTodo = () => {
    console.log('addErrorDeleteTodo()');

    const form = document.getElementById('deleteTodo');
    form.classList.add('error');
    return;
}

const removeErrorCreateTodo = () => {
    console.log('removeErrorCreateTodo()');

    const form = document.getElementById('createTodo');
    form.classList.remove('error');
    return;
}

const removeErrorDeleteTodo = () => {
    console.log('removeErrorDeleteTodo()');

    const form = document.getElementById('deleteTodo');
    form.classList.remove('error');
    return;
}
//Valideringvideon del 1 19:30