let post = {
    'title' : 'string2'
}

const posts = [];

// //Array som hämtar alla data från arrayen i API:et. Används för att kunna display
// const posts = Object.values(person)

//Funktion med kod från Joakim Lindh, 2024. Hämtad från YouTube, LindhCoding.
const getAllTodos = async() => {
    let url = 'https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c';

    try {
        const result = await fetch (url);
        console.log(result);

        if(result.status !== 200) {
            throw new Error ('Something went wrong.');
        }

        const data = await result.json()

        //Array som hämtar alla data från arrayen i API:et. Används för att kunna display
        // posts = Object.values(data);

        data.forEach(post => posts.push(post));
        // addItem(data);
        addToPosts3();
        addToPosts4();
        // displayPosts1();
        // displayPosts2();
        //Arrayen med data från API:et
        console.log(data);
        //Egen array posts []
        console.log(posts);

    } catch (err) {
        console.log(err.message);
    }
}
getAllTodos();

// function addItem() {
//     const list = document.createElement('li');
//     const item = document.createTextNode(post.title + " ");
//     list.appendChild(item);
//     document.getElementById('list1').append(item);
// }

//Adderar to-dos från API:ets array till egen array posts []
// function addToPosts1() {
//     let list = document.getElementById('list1');
//     for(let i=0;  i < posts.length; i++) {
//         let li = document.createElement('li');

//         // list.innerHTML = posts[i];
//         list.appendChild(li);
//     }
//     // displayPosts1();
// }

function addToPosts3() {
    let list = document.getElementById('list1');
    posts.forEach(para => {
        let li = document.createElement('li');
        list.appendChild(li);
        li.innerText = para.title;
    })
}

//posts.forEach(parameter motsvarar varje objekt i arrayen)
function addToPosts4() {
    let list = document.getElementById('list2');
    posts.forEach(para => {
        let li = document.createElement('li');
        list.appendChild(li);
        li.innerText = para.title;
    })
}

// function addToPosts2() {
//     let list = document.getElementById('list2');
//     for(let i=0;  i < posts.length; i++) {
//         let li = document.createElement('li');
//         // list.innerHTML = posts[i];
//         list.appendChild(li);
//     }
//     // displayPosts2();
// }

// function displayPosts() {
//     let text = '';
//     for(let i in posts) {
//         text += posts[i] + ' ';
//     }
//     document.getElementById('list2').innerHTML = text;
// }

// function displayPosts() {
//     let myString = JSON.stringify(posts);
//     document.getElementById('list2').innerHTML = myString;
// }

// function displayPosts1() {
//     let myString = Object.keys(posts);
//     document.getElementById('list1').innerHTML = myString;
// }


// function displayPosts2() {
//     let keys = Object.values(posts);
//     document.getElementById('list2').innerHTML = keys;
// }

//Triggas vid klick på knappen Create to-do
const postTodo = () => {
    fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c', {
        method: 'POST',
        body : JSON.stringify(post),
        headers: {
            'Content-Type' : 'application/json' 
        }
    })
        .then(result => {
            if(Response.status = 201) {
                console.log('Status 201, to-do created');
            } 
            console.log(result);
            return result.json();
        })
        .then(data => {
            console.log(data);
            // addItem(post);
            // return data;
        })
        .catch(err => {
            console.log(err);
        })
}

const btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    postTodo();
})


const id = '67372592cd3c44cd4dd28f31';
const removeTodo = async () => {
    const result = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c`, {
        method: 'DELETE',
    })

    if(result.status !== 200) {
        throw new Error ('Something went wrong.');
    }
    console.log(result);

    const data = await result.json();
    console.log('Deleted todo with id:' + data);
    return data;
}
// //ANVÄND WINDOW.LOCATION.RELOAD

const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    removeTodo();
})