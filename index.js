import {saveTask, getTasks, onGetTasks,deleteTask, getTask, updateTask, saveImage} from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('task-container')

let editStatus = false;
let id = "";

window.addEventListener('DOMContentLoaded',async () => {
    // const querySnapshot = await getTasks()
    onGetTasks((querySnapshot) => {

        taskContainer.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            taskContainer.innerHTML += `
            <div class="card card-body mt-2 boder-primary">
            <h3 class="h5">${task.title}</h3>
            <p>${task.description}</p>
            <div class>
                <button class="btn btn-primary btn-delete" data-id="${doc.id}" >Delete</button>
                <button class="btn btn-secondary btn-edit" data-id="${doc.id}" >Edit</button>
                </div>
                </div>
                `;
            });
            
            
            const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
            btnsDelete.forEach((btn) => {
                btn.addEventListener('click', ({target: {dataset}}) =>{
                    deleteTask(dataset.id);
                })
            })
            
            const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) =>{
                    const doc = await getTask(e.target.dataset.id)
                    const task = doc.data()

                    taskForm['task-title'].value = task.title
                    taskForm['task-description'].value = task.description
                    
                    
                    editStatus = true;
                    id = e.target.dataset.id
                    
                    taskForm['btn-task-save'].innerText = 'Update';
                })
            })
            
        });
        document.querySelector('#file-tasks').addEventListener('change', uploadFileAction);
    });
    
    const uploadFileAction = (e) => {
        const file = e.target.files[0];
        
        if( file.type.includes('image')){
            console.log('Si es una imagen');
            saveImage(file);
        }
    }
    
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = taskForm ['task-title'].value;
        const description = taskForm['task-description'].value;

        if (title.length > 3 && description.length > 3){

        if (!editStatus){
            saveTask(title, description)
        }else {
            updateTask(id,{
            'title': title,
            'description': description
        });
        
        editStatus = false;
    }
    
    taskForm.reset()
}else{
    alert('Desbes escribir algo');
}

    
    //document.querySelector('#tasks-container').addEventListener('click', acttionsButtons);
    //formTask.addEventListener('submit', saveImage);
    
})