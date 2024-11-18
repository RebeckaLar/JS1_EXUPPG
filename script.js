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
        addToPosts(); //liknar renderPosts()

        //Arrayen med data från API:et
        console.log(data);

        //Egen array posts []
        console.log(posts);

    } catch (err) {
        console.log(err.message);
    }
}
getAllTodos();

//Adderar to-dos från API:ets array till egen array posts []
function addToPosts() { //liknar renderPosts()
    let list = document.getElementById('list1');
    posts.forEach(obj => {
        let li = document.createElement('li');
        list.appendChild(li);
        li.innerText = obj.title;
    })
}

const createTodo = () => {
    const list = document.getElementById('list1');
    const title = document.getElementById('title').value;

    let li = document.createElement('li');
    list.appendChild(li);
    li.innerText = title;
    
    console.log('createTodo() done. Title value is ' + title);
    const objTitle = title;
    postTodo(objTitle);
    
}

// const postTodo = () => {
//     // createTodo();
//     fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c', {
//         method: 'POST',
//         body : JSON.stringify(post),
//         headers: {
//             'Content-Type' : 'application/json' 
//         }
//     })
//         .then(result => {
//             if(Response.status = 201) {
//                 // createTodo();
//                 console.log('Status 201, to-do created');
//             } 
//             console.log(result);
//             return result.json();
//         })
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
// }

//Triggas vid klick på knappen Create to-do
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

//från https://stackoverflow.com/questions/78245676/nextjs-post-neterr-aborted-500-internal-server-error
// You have to always return a Response by:
// return new Response("message", {status: 200})
// return new NextResponse("message", {status: 200})
// return Response.json({...}, {status: 200})
// return NextResponse.json({...}, {status: 200})

const btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    const item = document.getElementById('title').value;
    if (item == '' || item == null) {
        console.log('Please write a title');
    } else {
        createTodo();
    }
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