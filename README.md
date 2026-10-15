# Book Tracker

Book Tracker is a beginner-friendly browser application for managing a personal reading list. You can add books, search by title or author, change reading status, delete books, and see status counts.

The application is built with plain HTML, CSS, and JavaScript. It runs entirely in the browser and saves books in browser `localStorage`.

## Features

- Add a book with a title, author, and reading status.
- Use the statuses `To read`, `Reading`, and `Finished`.
- Require a non-empty title and author.
- Trim extra whitespace from title and author values.
- Display newest books first.
- Search by title or author.
- Match searches without considering uppercase or lowercase letters.
- Match partial search terms, such as `ben` in `Benyamin`.
- Change the status of an existing book.
- Delete a book after confirmation.
- Display total books and counts for each status.
- Keep books after refreshing the page with `localStorage`.
- Show helpful messages when saved data is invalid or browser storage is unavailable.
- Use a responsive layout for mobile, tablet, and desktop screens.

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

No framework, external UI library, backend, API, database, or build tool is used.

## Project Structure

```text
Book Tracker/
├── index.html   # Semantic page structure and form controls
├── style.css    # Layout, colors, responsive design, and visual styling
├── app.js       # Book data, validation, rendering, search, storage, and actions
├── README.md    # Project documentation
└── prompts.md   # Project notes and development prompts
```

## Run Locally

No installation is required.

### Option 1: Open the file directly

1. Open the project folder in File Explorer.
2. Double-click `index.html`.
3. The application will open in your default browser.

### Option 2: Open from VS Code

1. Open the project folder in VS Code.
2. Open `index.html`.
3. Use the browser preview or open the file in a browser.

The project does not require a development server. A local server may also be used, but one is not included or required.

## How Data Is Stored

Books are held in a JavaScript array while the page is open. Each book has this general shape:

```js
{
	id: 1,
	title: "The Hobbit",
	author: "J.R.R. Tolkien",
	status: "To read",
	createdAt: 1712345678901
}
```

The complete array is saved under the localStorage key `bookTrackerBooks` after a book is added, its status changes, or it is deleted.

Because `localStorage` stores text, the array is converted to JSON when saving and parsed back into JavaScript objects when the page starts.

The application also handles these situations safely:

- No saved data: starts with an empty list.
- Invalid JSON: starts with an empty list and shows a warning.
- Invalid saved records: ignores records with blank fields, unsupported statuses, or unusable IDs.
- Unavailable or full storage: shows a message instead of pretending the change was saved permanently.

## Using the Application

### Add a Book

1. Enter a title.
2. Enter an author.
3. Choose `To read`, `Reading`, or `Finished`.
4. Select **Add Book**.

Title and author are required. The form displays a message below the missing field and does not refresh the page.

### Search Books

1. Type in the **Search books** field.
2. Search by part or all of a title or author name.
3. Uppercase and lowercase letters are treated the same.
4. Clear the search field to show every book again.

Search only changes what is displayed. It does not modify or delete saved books.

### Change Status

Each book has its own reading-status dropdown. Select a different status to update that book immediately. The status counts and localStorage value are updated at the same time.

### Delete a Book

Select **Delete** on a book and confirm the browser dialog. Only that book is removed. Deleting the final book returns the application to its empty state.

## Manual Testing Checklist

- [ ] Submit the empty form and confirm both validation messages appear.
- [ ] Submit with only a title and confirm the author message appears.
- [ ] Submit with only an author and confirm the title message appears.
- [ ] Add books with all three statuses.
- [ ] Confirm the newest book appears first.
- [ ] Search by a partial title.
- [ ] Search by a partial author name.
- [ ] Try uppercase and lowercase search terms.
- [ ] Search for a term with no matches.
- [ ] Clear the search and confirm all books return.
- [ ] Change a book from `To read` to `Reading` and then `Finished`.
- [ ] Refresh and confirm the changed status remains.
- [ ] Add a book, refresh, and confirm it remains.
- [ ] Delete a book and confirm only that book disappears.
- [ ] Delete a book while a search is active.
- [ ] Delete the last book and confirm the empty-state message appears.
- [ ] Confirm total and per-status counts after each change.
- [ ] Open developer tools and inspect the `bookTrackerBooks` localStorage value.
- [ ] Replace the saved value with invalid JSON and reload the page.
- [ ] Confirm the application does not crash and shows a storage warning.
- [ ] Use the `Tab` key to move through controls and check the visible focus ring.
- [ ] Resize the browser to mobile and desktop widths.
- [ ] Check the browser console for errors.

## Current Limitations

- Data is stored only in the current browser's `localStorage`.
- Books are not synchronized between browsers or devices.
- Clearing browser site data removes the saved books.
- There is no user account or sign-in system.
- There is no backend, database, API, or cloud backup.
- The application does not include automated test files or a test runner.
- The browser confirmation dialog is used for deletion.

## Future Improvements

- Add sorting or filtering by reading status.
- Add editing for book titles and authors.
- Add notes, ratings, genres, or finished dates.
- Add import and export of the book list as JSON or CSV.
- Add an optional server and database for cross-device storage.
- Add automated browser tests.
- Consolidate and further simplify the CSS as the design evolves.

## Browser Developer Tools

To inspect saved books:

1. Open the application in a browser.
2. Press `F12` or `Ctrl+Shift+I`.
3. Open the **Application** or **Storage** panel.
4. Select **Local Storage** for the current page.
5. Find the key `bookTrackerBooks`.

The value should be a JSON array containing the saved book objects.
