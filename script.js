const getAllTodos = () => {
    const url = fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1a450641-7efe-4a0f-bcb3-7e9f93cca42c')
    .then(result => {
        console.log(url);
        if(Response.status = 200) {
            console.log('Status 200, succsessful');
        }
        console.log(result);
        return result.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
} 

getAllTodos();