//Array som hämtar alla data från arrayen i API:et. Används för att kunna display
const posts = [];

//Funktion med kod från Joakim Lindh, 2024. Hämtad från YouTube, LindhCoding.
const getAllTodos = async() => {
    let url = 'https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c';

    try {
        const response = await fetch (url);
        console.log(response);

        if(response.status !== 200) {
            throw new Error ('Something went wrong.');
        }

        const data = await response.json()

        data.forEach(post => posts.push(post));
        addToPosts3();
        addToPosts4(); //liknar renderPosts()
        //Arrayen med data från API:et
        console.log(data);
        //Egen array posts []
        console.log(posts);
        // checkTitle();

    } catch (err) {
        console.log(err.message);
    }
}
getAllTodos();

//Adderar to-dos från API:ets array till egen array posts []
function addToPosts3() { //liknar renderPosts()
    let list = document.getElementById('list1');
    posts.forEach(para => {
        let li = document.createElement('li');
        list.appendChild(li);
        li.innerText = para.title;
    })
}

//posts.forEach(parameter motsvarar varje objekt i arrayen)
function addToPosts4() { //1:26:00
    let list = document.getElementById('list2');
    posts.forEach(para => {
        let li = document.createElement('li');
        list.appendChild(li);
        li.innerText = para.title;
    })
}

// let post = document.getElementById('search').value;

let post = {
    'title' : 'To-do 10'
}

// const createTodo = () => {
//     // let post = document.getElementById('search').value;

//     // title.setAttribute('value', post);
//     // console.log('attribute post.title till value');
//     // list.appendChild(title);

//     const list = document.getElementById('list2');
//     const title = document.getElementById('title').value;

//     let li = document.createElement('li');
//     list.appendChild(li);
//     li.innerText = title;
//     // console.log(li);
    
//     postTodo(title);
// }

//Triggas vid klick på knappen Create to-do
const postTodo = () => {
    // const bla = post._id;
    console.log('bla = post._id;')
    fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c', {
        method: 'POST',
        body : JSON.stringify(post),
        headers: {
            'Content-Type' : 'application/json' 
        }
    })
        .then(response => {
            console.log('efter fetch')
            if(Response.status = 201) {
                console.log('Status 201, to-do created');
            } 
            console.log(response)
            // li.innerText = post;
            return response.json();
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
        window.location.reload(false);
}

const btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    postTodo();
    // console.log('before createTodo()')
    // createTodo();
    // window.location.reload(false);
})


const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    const item = document.getElementById('search').value;
    console.log('Removing ' + item);
    posts.filter(obj => {
        if (obj.title == item) {
            console.log(obj.title);
            removeTodo(obj);
            return;
        } else {
            console.log('Does not match any To-do title. Try again');
        }
    })
})

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
    window.location.reload(false);
    return data;
}