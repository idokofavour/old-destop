import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import ListForm from './components/ListForm';
import TodoList from './components/TodoList';
import './css/style.css';

new Modal();
const listForm = new ListForm();
listForm.render();
new TodoList();



