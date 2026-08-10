const input = document.getElementById("taskInput");
const button = document.getElementById("createBtn");
const taskList = document.getElementById("taskList");

button.addEventListener("click", () => {

    const taskName = input.value;

    fetch("/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            taskName: taskName
        })
    })
    .then((response) => response.json())
    .then((data) => {

        console.log(data);

        taskList.innerHTML += `
            <p>${data.taskName}</p>
        `;

        input.value = "";
    })
    .catch((error) => {
        console.log(error);
    });
});