//Array som hämtar alla data från arrayen i API:et. Används för att kunna display
const posts = [];
//Array innehållande ifyllda checkboxar (completed to-dos)
let completedTodos = [];

// -----METODER FÖR ATT SKAPA ELLER RENDERA OBJEKT-----
//Adderar objekt (to-do's) från API:ets array till egen array Posts[] och visar på hemsidan
function renderPosts() {
    let list = document.getElementById('list1');
    posts.forEach(obj => {
        let div = document.createElement('div');
        let label = document.createElement('label')
        let item = document.createElement('input');

        div.setAttribute("class", "form-check-div");
        label.setAttribute("for", "flexCheckDefault");
        item.setAttribute("type", "checkbox");
        item.setAttribute("id", obj._id);
        item.setAttribute("class", "form-check-input");

        list.appendChild(div);
        div.appendChild(label);
        div.appendChild(item);
        label.innerText = obj.title;
    })
}

function check() {
    console.log('Checking completed to-dos...');
    var checkboxes = document.querySelectorAll("input[type=checkbox]");

            posts.forEach(obj => {
                    if(obj.completed == true) {
                    document.getElementById(obj._id).checked= true;
                        completedTodos = 
                          Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                          .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
                          
                } else if (obj.completed !=true) {
                    document.getElementById(obj._id).checked= false;
                    completedTodos = 
                          Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                          .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                          .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
                }
            })
            console.log('Completed / checked to-dos: ' + completedTodos.length);
            console.log('Completed to-dos successfully displayed');
        }

const createTodo = (obj) => {
    const list = document.getElementById('list1');
    const title = document.getElementById('title').value;

    let div = document.createElement('div');
    let label = document.createElement('label')
    let item = document.createElement('input');

    div.setAttribute("class", "form-check-div");
    label.setAttribute("for", "flexCheckDefault");
    item.setAttribute("type", "checkbox");
    item.setAttribute("id", obj);
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
    const url = 'https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c';

    try {
        const response = await fetch (url);
        console.log(response);

        if(response.status == 200) {
            console.log('GET request OK');
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

const updateTodo = async (obj) => {
    let post = {
        completed: obj.checked
    }
    let todo = obj.id;

        const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${todo}?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json' 
        },
        body : JSON.stringify(post)
    })
        console.log(response);
        if(response.status == 200) {
            console.log('Status 200, to-do updated');
            if(post.completed != true) {
                console.log('To-do with id ' + todo + ' completed == false');
            } else if (post.completed == true) {
                console.log('To-do with id ' + todo + ' completed == true');
            }
            } else {
                throw new Error ('Something went wrong.');
            }
        const data = await response.json()
        return data;
    }

const removeTodo = async (obj) => {
    const todo = obj._id;
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${todo}?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c`, {
        method: 'DELETE',
    })

    if(response.status == 200) {
        console.log('Status 200, deleting to-do');
    } else {
        throw new Error ('Something went wrong.');
    }
    console.log(response);
    const data = await response.json();
    console.log('Deleted todo with id:' + data);
    window.location.reload();
    return data;
}

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

setTimeout(listenIfChecked, 1000);

//Kod tagen från thordarson på Stackoverflow: 
//https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
function listenIfChecked() {

// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox]");
(console.log(checkboxes));
// let completedTodos = []

/*
For IE11 support, replace arrow functions with normal functions and
use a polyfill for Array.forEach:
https://vanillajstoolkit.com/polyfills/arrayforeach/
*/

// Use Array.forEach to add an event listener to each checkbox.
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
          completedTodos = 
            Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
            .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
            .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
            
        console.log('Completed / checked to-dos: ' + completedTodos.length);
          updateTodo(checkbox);
          
        })  
      });
      check();
}

// -----VALIDERING-----

//Valideringvideon del 1 19:30

//från https://stackoverflow.com/questions/78245676/nextjs-post-neterr-aborted-500-internal-server-error
// You have to always return a Response by:
// return new Response("message", {status: 200})
// return new NextResponse("message", {status: 200})
// return Response.json({...}, {status: 200})
// return NextResponse.json({...}, {status: 200})

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