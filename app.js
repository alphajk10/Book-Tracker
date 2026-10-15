console.log("Book Tracker JavaScript is connected.");

const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const titleError = document.querySelector("#title-error");
const authorError = document.querySelector("#author-error");
const bookList = document.querySelector("#book-list");
const bookCounts = document.querySelector("#book-counts");
const searchInput = document.querySelector("#book-search");
const storageMessage = document.querySelector("#storage-message");
const storageKey = "bookTrackerBooks";
const statusOptions = ["To read", "Reading", "Finished"];

function showStorageMessage(message) {
	storageMessage.textContent = message;
}

function getStorage() {
	try {
		return window.localStorage;
	} catch (error) {
		return null;
	}
}

function loadBooks() {
	const storage = getStorage();

	if (!storage) {
		showStorageMessage("Browser storage is unavailable. Books will only last until this page is closed.");
		return [];
	}

	try {
		const savedBooks = storage.getItem(storageKey);

		if (!savedBooks) {
			return [];
		}

		const parsedBooks = JSON.parse(savedBooks);

		if (!Array.isArray(parsedBooks)) {
			showStorageMessage("Saved book data was not in the expected format, so it was reset.");
			return [];
		}

		const usedIds = new Set();
		let replacementId = 1;

		return parsedBooks.reduce((validBooks, book) => {
			if (
				!book
				|| typeof book !== "object"
				|| typeof book.title !== "string"
				|| typeof book.author !== "string"
				|| !statusOptions.includes(book.status)
			) {
				return validBooks;
			}

			const title = book.title.trim();
			const author = book.author.trim();

			if (!title || !author) {
				return validBooks;
			}

			let id = Number.isInteger(book.id) && book.id > 0 && !usedIds.has(book.id)
				? book.id
				: replacementId;

			while (usedIds.has(id)) {
				id += 1;
			}

			usedIds.add(id);
			replacementId = Math.max(replacementId, id + 1);
			validBooks.push({
				id,
				title,
				author,
				status: book.status,
				createdAt: typeof book.createdAt === "number" ? book.createdAt : Date.now()
			});
			return validBooks;
		}, []);
	} catch (error) {
		showStorageMessage("Saved book data could not be read, so the list started empty.");
		return [];
	}
}

function saveBooks(action = "book") {
	const storageMessages = {
		book: {
			unavailable: "Browser storage is unavailable. This book could not be saved for future visits.",
			failed: "The book was added for this visit, but the browser could not save it permanently."
		},
		status: {
			unavailable: "Browser storage is unavailable. This status change could not be saved for future visits.",
			failed: "The status changed for this visit, but the browser could not save it permanently."
		},
		deletion: {
			unavailable: "Browser storage is unavailable. This deletion could not be saved for future visits.",
			failed: "The book was deleted for this visit, but the browser could not save the deletion permanently."
		}
	};
	const messages = storageMessages[action] || storageMessages.book;
	const storage = getStorage();

	if (!storage) {
		showStorageMessage(messages.unavailable);
		return false;
	}

	try {
		storage.setItem(storageKey, JSON.stringify(books));
		showStorageMessage("");
		return true;
	} catch (error) {
		showStorageMessage(messages.failed);
		return false;
	}
}

const books = loadBooks();
const highestBookId = books.reduce((highestId, book) => Math.max(highestId, Number(book.id) || 0), 0);
let nextBookId = highestBookId + 1;

function renderCounts() {
	bookCounts.replaceChildren();

	const counts = {
		"To read": books.filter((book) => book.status === "To read").length,
		Reading: books.filter((book) => book.status === "Reading").length,
		Finished: books.filter((book) => book.status === "Finished").length
	};

	const countLabels = [
		`Total books: ${books.length}`,
		`To read: ${counts["To read"]}`,
		`Reading: ${counts.Reading}`,
		`Finished: ${counts.Finished}`
	];

	countLabels.forEach((label) => {
		const count = document.createElement("p");
		count.textContent = label;
		bookCounts.append(count);
	});
}

function updateBookStatus(bookId, newStatus) {
	if (!statusOptions.includes(newStatus)) {
		return;
	}

	const book = books.find((candidate) => candidate.id === bookId);

	if (!book) {
		return;
	}

	book.status = newStatus;
	saveBooks("status");
	renderBooks();
}

function deleteBook(bookId) {
	const bookIndex = books.findIndex((book) => book.id === bookId);

	if (bookIndex === -1) {
		return;
	}

	const book = books[bookIndex];
	const confirmed = window.confirm(`Delete "${book.title}" from your books?`);

	if (!confirmed) {
		return;
	}

	books.splice(bookIndex, 1);
	saveBooks("deletion");
	renderBooks();
}

function renderBooks(searchQuery = searchInput.value) {
	const normalizedQuery = searchQuery.trim().toLowerCase();
	const matchingBooks = books.filter((book) => (
		book.title.toLowerCase().includes(normalizedQuery)
		|| book.author.toLowerCase().includes(normalizedQuery)
	));

	renderCounts();
	bookList.replaceChildren();

	if (books.length === 0) {
		const emptyState = document.createElement("div");
		emptyState.className = "empty-state";

		const emptyIcon = document.createElement("div");
		emptyIcon.className = "empty-state-icon";
		emptyIcon.setAttribute("aria-hidden", "true");

		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "No books added yet. Add your first book above.";

		emptyState.append(emptyIcon, emptyMessage);
		bookList.append(emptyState);
		return;
	}

	if (matchingBooks.length === 0) {
		const noResultsMessage = document.createElement("p");
		noResultsMessage.className = "empty-state";
		noResultsMessage.textContent = "No books match your search.";
		bookList.append(noResultsMessage);
		return;
	}

	const list = document.createElement("ul");
	list.className = "book-list";

	matchingBooks.forEach((book) => {
		const listItem = document.createElement("li");
		listItem.className = "book-item";

		const title = document.createElement("h3");
		title.textContent = book.title;

		const author = document.createElement("p");
		author.textContent = `Author: ${book.author}`;

		const status = document.createElement("span");
		status.className = `status-badge status-${book.status.toLowerCase().replace(" ", "-")}`;
		status.textContent = book.status;

		const statusLine = document.createElement("p");
		statusLine.className = "book-meta";
		statusLine.append("Status: ", status);

		const statusField = document.createElement("div");
		statusField.className = "book-status-field";

		const statusLabel = document.createElement("label");
		const statusId = `book-status-${book.id}`;
		statusLabel.htmlFor = statusId;
		statusLabel.textContent = "Reading status";

		const statusSelect = document.createElement("select");
		statusSelect.id = statusId;
		statusSelect.name = statusId;
		statusSelect.setAttribute("aria-label", `Reading status for ${book.title}`);

		statusOptions.forEach((optionValue) => {
			const option = document.createElement("option");
			option.value = optionValue;
			option.textContent = optionValue;
			option.selected = optionValue === book.status;
			statusSelect.append(option);
		});

		statusSelect.addEventListener("change", (event) => {
			updateBookStatus(book.id, event.target.value);
		});

		statusField.append(statusLabel, statusSelect);

		const deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.className = "delete-button";
		deleteButton.textContent = "Delete";
		deleteButton.setAttribute("aria-label", `Delete ${book.title}`);
		deleteButton.addEventListener("click", () => {
			deleteBook(book.id);
		});

		listItem.append(title, author, statusLine, statusField, deleteButton);
		list.append(listItem);
	});

	bookList.append(list);
}

bookForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const title = titleInput.value.trim();
	const author = authorInput.value.trim();
	let firstInvalidInput = null;

	titleInput.value = title;
	authorInput.value = author;
	titleError.textContent = title ? "" : "Please enter a book title.";
	authorError.textContent = author ? "" : "Please enter the author's name.";

	titleInput.toggleAttribute("aria-invalid", !title);
	authorInput.toggleAttribute("aria-invalid", !author);

	if (!title) {
		firstInvalidInput = titleInput;
	} else if (!author) {
		firstInvalidInput = authorInput;
	}

	if (firstInvalidInput) {
		firstInvalidInput.focus();
		return;
	}

	const newBook = {
		id: nextBookId,
		title,
		author,
		status: document.querySelector("#book-status").value || "To read",
		createdAt: Date.now()
	};

	nextBookId += 1;
	books.unshift(newBook);
	saveBooks();
	bookForm.reset();
	titleInput.removeAttribute("aria-invalid");
	authorInput.removeAttribute("aria-invalid");
	renderBooks();
	titleInput.focus();
});

searchInput.addEventListener("input", (event) => {
	renderBooks(event.target.value);
});

renderBooks();
