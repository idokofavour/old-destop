import listsApi from "../services/listsApi";
import TodoList from "./TodoList";

class ListForm {
    constructor() {
        this._formModal = document.querySelector('#form-modal');
        this._todoList = new TodoList();
    }

    addEventListeners() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        if(!this._form.elements.title.value || !this._form.elements.text.value || !this._form.elements.plan.value || !this._form.elements.tag.value || !this._form.elements.event.value) {
            alert('Please enter all fields');
            return;
        };

        localStorage.setItem('title', this._form.elements.title.value);

        const list = {
            title: this._form.elements.title.value,
            text: this._form.elements.text.value,
            plan: this._form.elements.plan.value,
            tag: this._form.elements.tag.value,
            event: this._form.elements.event.value,
        }

        // Add list to server
        const newList = await listsApi.createList(list);

        // Add list to field
        this._todoList.addList(newList.data.data);

        // Clear fields
       this._form.elements.title.value = '';
       this._form.elements.text.value = '';
        this._form.elements.plan.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.event.value = '';

        this.render();

        document.dispatchEvent(new Event('closemodal'));
    }

    render() {
        this._formModal.innerHTML = `
        <form id="list-form">
            <div class="form-control">
                <label for="list-title">Enter a Task</label>
                <input type="title" name="title" id="title" value = "${localStorage.getItem('title') ? localStorage.getItem('title'): ''}">
            </div>
            <div class="form-control">
                <label for="list-text">Enter a Text</label>
                <input type="text" name="text" id="text">
            </div>
            <div class="form-control">
                <label for="list-plan">What's Your Plan?</label>
                <input type="plan" name="plan" id="list-plan">
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <div class="form-control">
                <label for="event">Event</label>
                <input type="text" name="event" id="event" />
            </div>
                <button class="btn" type="submit" id="submit">Submit</button>
        </form>
    `;

        this._form = document.querySelector('#list-form');
        this.addEventListeners();
    }
}

export default ListForm;