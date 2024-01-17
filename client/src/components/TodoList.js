import listsApi from "../services/listsApi";

class TodoList {
    constructor() {
        this._todoListEl = document.querySelector('#todo-list');
        this._
        this._lists = [];
        this.getLists();
    }

    addEventListeners() {
        this._todoListEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const listId = e.target.parentElement.parentElement.dataset.id;
                this.deleteList(listId);
            }
        });
    }

    async onClick(e) {
        e.preventDefault();
        // Handle the click event
        const clickedP = e.target;
        clickedP.style.color = '#cf5454';
        clickedP.style.textDecoration = 'line-through';

        const checkInput = clickedP.querySelector('.checkbox');
        if (checkInput) {
            checkInput.checked = !checkInput.checked;
        }
    }


    async getLists() {
        try {
            const res = await listsApi.getLists();
            this._lists = res.data.data;
            this.render();
        } catch (error) {
            console.log(error);
        }
    }

    addList(list) {
        this._lists.push(list);

        this.render()
    }

    async deleteList(listId) {
        try {
            const res = await listsApi.deleteList(listId);
            this._lists = this._lists.filter((list) => list._id !== listId);
            this.render();
        } catch (error) {
            alert('You cannot delete this resource');
        }
    }

    render() {
        this._todoListEl.innerHTML = this._lists.map((list) => {
            const deleteBtn = list.title === localStorage.getItem('title') ? '<div class="delete"><i class="fa-solid fa-times fa-x fa-1x"></i></div>' : '';
            return `
            <div id="card" data-id="${list._id}">
                ${deleteBtn}
                <h4 class="list-heading">${list.title}</h4>
                <hr>
                <p><input type="checkbox">Book a flight</p>
                <p><input type="checkbox">Pasport check</p>
                <p><input type="checkbox">Packing luggages</p>
                <p><input type="checkbox">Hotel reserve</p>

                <button id="add-list-btn"><i class="fa-solid fa-plus fa-1px"></i></button>
            </div>
            `;
        }).join('');
        this.addEventListeners()

        // add event listener to button
        this._addList = document.querySelector('#add-list-btn');
        this._addList.addEventListener('click', ()=> {
            const form = document.createElement('form');
            // form.className = 'list-form'
            form.innerHTML = `
            <div class="form-control">
                <label for="list-title">Enter a Task</label>
                <input type="title" name="title" id="title">
            </div>
            
            `
            console.log(form);
        })


        // Add click event listener to each list item
        this._listItem = document.querySelectorAll('.list-item');

        this._listItem.forEach((item) => {
            item.addEventListener('click', this.onClick.bind(this));
        });

    };
};

export default TodoList;