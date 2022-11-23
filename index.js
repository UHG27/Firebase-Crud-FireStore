import { saveTask, getTasks } from "./firebase.js";

window.addEventListener('DOMContentLoaded', async() => {

    const querySnapshot = await getTasks()

    querySnapshot.forEach(doc => {
        console.log(doc.data())
    })
})

const taskForm = document.getElementById('task-form')

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

saveTask(title.value, description.value)

taskForm.reset()

})