<template>
    <b-container class="bv-example-row">
        <div>
            <b-navbar toggleable type="light" variant="light">
                <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
                <b-navbar-brand>Exquis Book Store App</b-navbar-brand>
                <b-collapse is-nav id="nav_text_collapse">
                    <b-navbar-nav>
                        <b-nav-text>Navbar text</b-nav-text>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <section>
            <div id="show_all_books" v-if="show_books">
                <div class="actions">
                    <a href="#" class="btn btn-default" @click="addNewBook">Add Book</a>
                </div><hr/>
                <h4>List of All Books</h4><hr/>
                <b-alert v-if="loading" variant="info">Loading...</b-alert>
                <b-alert v-if="notification" variant="info">{{ msg }}</b-alert>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book in books" :key="book.id">
                            <td>{{ book.title }}</td>
                            <td>{{ book.author }}</td>
                            <td>{{ book.year }}</td>
                            <td>
                                <a href="#" class="btn btn-warning btn-xs" @click.prevent="populateBookToEdit(book)">Edit</a> 
                                <a href="#" class="btn btn-danger btn-xs" @click.prevent="deleteBook(book.id)">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="add_book" v-if="add_book">
                <hr/>
                <h4>Add new book</h4><hr/>
                <form @submit.prevent="createBook">
                    <div class="form-group">
                        <label for="add-title">Title</label>
                        <input class="form-control" id="add-title" v-model="model.title" required/>
                    </div>
                    <div class="form-group">
                        <label for="add-author">Author</label>
                        <input class="form-control" id="add-author" v-model="model.author" required/>
                    </div>
                    <div class="form-group">
                        <label for="add-year">Year Published</label>
                        <input class="form-control" id="add-year" v-model="model.year" required/>
                    </div>
                    <div class="form-group">
                        <label for="add-page">Pages</label>
                        <input class="form-control" id="add-page" v-model="model.pages" required/>
                    </div>
                    <div class="form-group">
                        <label for="add-genre">Genre</label>
                        <input type="text" class="form-control" id="add-genre" v-model="model.genre"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                    <a href="#" @click="showAll" class="btn btn-default">Cancel</a>
                </form>
            </div>
        </section>
    </b-container>
</template>

<script>
import api from "@/api";
const BaseURL = "http://localhost:5000/api/";
export default {
	name: "Home",
	data() {
		return {
			books: [],
			model: {},
			loading: false,
			show_books: true,
			add_book: false,
			edit_book: false,
			notification: false,
			msg: "",
		};
	},
	async created() {
		await this.listAllBooks();
	},
	methods: {
		async listAllBooks() {
			this.loading = true;
			this.axios.get(BaseURL + "book").then(result => {
				this.books = result.data.data;
			});
			this.loading = false;
		},
		async populateBookToEdit(book) {
			this.model = Object.assign({}, book);
		},
		async createBook() {
			this.axios.post(BaseURL + "book", this.model).then(result => {
				this.model = {};
			});
			location.reload("/");
		},
		async deleteBook(id) {
			if (confirm("Are you sure you want to delete this post?")) {
				// if we are editing a post we deleted, remove it from the form
				if (this.model.id === id) {
					this.model = {};
				}
				this.axios.delete(BaseURL + `book/${id}`).then(result => {});
				this.msg = "Book deleted successfully";
				this.notification = true;
				await this.getAllBooks();
			}
		},
		async showAll() {
			await this.listAllBooks();
			this.show_books = true;
			this.add_book = false;
			this.edit_book = false;
		},
		addNewBook() {
			this.show_books = false;
			this.add_book = true;
			this.edit_book = false;
		},
	},
};
</script>