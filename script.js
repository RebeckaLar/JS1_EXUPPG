//Array som hämtar alla data från arrayen i API:et. Används för att kunna display
const posts = [];

// -----METODER FÖR ATT SKAPA ELLER RENDERA OBJEKT-----
const displayDate = () => {
    let today = new Date();
    document.getElementById('date').textContent = today.toDateString(("en-US"));
}
displayDate();

//Adderar objekt (to-do's) från API:ets array till egen array posts[] och visar på hemsidan
function renderPosts() {
    let list = document.getElementById('list1');

    posts.forEach(obj => {
        let li = document.createElement('li');
        let label = document.createElement('label')
        let item = document.createElement('input');

        li.setAttribute("class", "form-check-div mt-3");
        label.setAttribute("for", obj._id);
        label.setAttribute("class", "flexCheckLabel");
        item.setAttribute("type", "checkbox");
        item.setAttribute("id", obj._id);
        item.setAttribute("class", "form-check-input");

        list.appendChild(li);
        li.appendChild(label);
        li.appendChild(item);
        label.innerText = obj.title;

        if(obj.completed == true) {
            item.checked = true;
            console.log(obj.title + ' (id: ' + obj._id + ') is completed');
            label.classList.add("text-decoration-line-through") 
        } else {
            item.checked = false;
            label.classList.remove("text-decoration-line-through") 
        }

            item.addEventListener('change', (e) => {
                if(e.target.checked) { 
                    obj.completed = true;      
                    label.classList.add("text-decoration-line-through")
                } else {
                    obj.completed = false;
                    label.classList.remove("text-decoration-line-through");
                }   
            updateTodo(item);      
            })  
        })
}

const createTodo = (obj) => {
    const list = document.getElementById('list1');
    const title = document.getElementById('title').value;

    let li = document.createElement('li');
    let label = document.createElement('label')
    let item = document.createElement('input');

    li.setAttribute("class", "form-check-div mt-2");
    label.setAttribute("for", obj);
    label.setAttribute("class", "flexCheckLabel");
    item.setAttribute("type", "checkbox");
    item.setAttribute("id", obj);
    item.setAttribute("class", "form-check-input");

    list.appendChild(li);
    li.appendChild(label);
    li.appendChild(item);
    label.innerText = title;
    
    console.log('createTodo() done. Title value is ' + title);
    postTodo(title);
}

const closeModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    removeErrorClass();
}

const openModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
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

        console.log(data);
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
        window.location.reload();
        return data;
    }

// const setCompletedTrue = (obj) => {
//     obj.completed == true;
// }


// const setCompletedFalse = (obj) => {
//     obj.completed == false;
// }


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
            if(obj.checked != true) {
                obj.completed = false;
                console.log('To-do with id ' + todo + ' completed == false');
            } else if (obj.checked == true) {
                obj.completed = true;
                console.log('To-do with id ' + todo + ' completed == true');
            }
            } else {
                throw new Error ('Something went wrong.');
            }

        const data = await response.json()
        console.log('Updated todo with id:' + todo);
        return data;
    }

    //en update metod för ändra till completed true en för att uppdatera objektet i parametern till completed false. samma. 

const removeTodo = async (obj) => {
    const todo = obj._id;
    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${todo}?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c`, {
        method: 'DELETE',
    })

    console.log(obj.completed + 'hej')

    if(response.status == 200) {
        console.log('Status 200, deleting to-do if completed...');
        if(obj.completed != true) {
            console.log('Sorry, to-do with id ' + todo + ' completed == false');
        } else if (obj.completed == true) {
            console.log('To-do with id ' + todo + ' completed == true');
        }
    } else {
        throw new Error ('Something went wrong.');
    }
    console.log(response);
    const data = await response.json();
    console.log('Deleted todo with id:' + data);
    window.location.reload();
}

// -----EVENT LISTENERS-----
const btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    validateInput();
})

let search;

const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () => {

    search = document.getElementById('search').value;
    let matched = false;

    posts.filter(obj => {

        if (obj.title == search) {
            removeErrorClass();         

                if(!obj.completed) {
                    matched = true;
                    console.log('To-do with id ' + obj + ' completed == false');
                    openModal();
                    return;
                } else {
                    matched = true;
                    console.log('To-do with id ' + obj + ' completed == true');
                    removeTodo(obj); 
                    return;       
                }
            }
    })
    console.log(posts);
    
    if(matched == false) {
        addErrorDeleteTodo();
    } else {
        removeErrorClass();   
    }
     // validateSearch(search);
})


// const btnDelete = document.getElementById('btnDelete');
// btnDelete.addEventListener('click', (e) => {
//     e.preventDefault();
//     validateSearch(e);
// })

const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', () => {
        closeModal();
})

const xBtn = document.getElementById('xBtn');
    xBtn.addEventListener('click', () => {
        closeModal();
})

// -----VALIDERING-----

//Valideringvideon del 1 19:30, 49:00, 1:00:00
//Valideringvideon del 2 

//Triggas vid klick på knappen Create to-do
const validateInput = () => {
    console.log('validateInput()');
    const title = document.getElementById('title');

    if(title.value === '' || title.length < 0 || title == null || title.value.replace(/\s+/g, '').length == 0) {
        addErrorCreateTodo();
    } else {
        removeErrorClass();
        createTodo();
    }
}

//Triggas vid klick på knappen Delete to-do
// const validateSearch = (obj) => {
//     console.log('validateSearch()');
//     let search = document.getElementById('search').value;

//     let matched;
//     posts.filter(obj => {
//         if (obj.title == search) {
//             removeErrorClass();
//             if(obj.completed != true) {
//                 console.log('To-do with id ' + obj + ' completed == false');
//                 openModal();
//             } else if (obj.completed == true) {
//                 console.log('To-do with id ' + obj + ' completed == true');
//                 removeTodo(obj);
//             }
//             matched = true;
//         } else {
//             matched = false;
//         }
//     })
    
//     if(matched == false) {
//         addErrorDeleteTodo();
//     }
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

const removeErrorClass = () => {
    const form = document.getElementById('form');
    for(let i = 0; i < form.length; i++) {
        form[i].parentElement.classList.remove('error');
    }
    return;
}