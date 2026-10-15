# Book Tracker — 8 Simple Codex Prompts

I'm building a simple Book Tracker using plain HTML, CSS, and JavaScript with Codex in VS Code. I'll use these prompts one at a time. After each step, I'll review the changes, run the app, and fix any problems before moving on.

## Prompt 1 — Plan and set up the project

I want to build a simple Book Tracker web app. I should be able to add books, search for them, change their reading status, delete them, and keep my list after refreshing the page.

Before coding, please explain the plan in simple language and tell me which files we'll need. Then create `index.html`, `style.css`, `app.js`, and `README.md`. Keep the setup basic and use only HTML, CSS, and JavaScript—no frameworks, backend, or database. Add a proper page title, mobile viewport setting, and connect the CSS and JavaScript files correctly.

Please don't build every feature yet. Keep the code beginner-friendly, avoid changing unrelated files, and tell me how to open the page and check that everything is connected properly.

A few things to remember:
- Keep each file focused on its own job.
- Use clear file and variable names.
- Explain any setup steps I need to do myself.

## Prompt 2 — Add the form and show books

Let's build the main part of the app. Please add a form with fields for book title, author, and a status dropdown containing `To read`, `Reading`, and `Finished`.

The title and author must be required. If either is missing, show a helpful message below that field. Trim extra spaces from the title and author, and prevent the form from refreshing the page. When I submit a valid book, show it in the list with its title, author, and status. Give each book a unique ID and creation time, and make new books appear at the top.

Clear the form after a successful addition, and show a friendly message when the list is empty. Please keep the code simple and build on the files we already have. Use safe DOM methods such as `textContent` when displaying user-entered text.

Please also make sure:
- The status defaults to `To read`.
- Invalid submissions don't create a book.
- The page doesn't reload when I add a book.

## Prompt 3 — Save books after refreshing

Now please make sure my books don't disappear when I refresh the page. Use browser `localStorage` to save the list whenever a book is added, and load the saved list when the app opens.

If there are no saved books, start with an empty list. Handle invalid saved JSON and storage errors as safely as possible. If saving fails, don't pretend the data was saved; show a helpful message where practical.

Please keep the existing form and list working. When you're done, explain how I can test this by adding a book, refreshing the page, and checking the saved data in browser developer tools. Mention that data is stored in this browser and does not automatically sync across devices.

Please check that:
- Saved books load only once when the app starts.
- Adding a new book doesn't remove older saved books.
- The list still works if there is no saved data.

## Prompt 4 — Add search

Please add a search box above the book list. I want to find books by typing part of a title or an author's name. Search should ignore capital letters, so searching for `ben` should find a book by `Benyamin`. Trim extra spaces around the search query too.

Update the results as I type. If nothing matches, show a friendly message, and when I clear the search, show all the books again. Searching should not delete or change the saved books, and the newest books should still appear first.

Please add this to the existing code without using a search library or breaking other features. Tell me how to test title searches, author searches, partial words, different capitalization, and no results.

A few details:
- Search as I type; don't require a separate Search button.
- Keep the original saved list unchanged.
- Show all books again when I clear the search.

## Prompt 5 — Change status and delete books

I'd like to manage my reading list more easily. Please let me change each book's status using a dropdown with `To read`, `Reading`, and `Finished`. Save status changes so they remain after a refresh.

Please also add a Delete button for each book. Ask me to confirm before deleting, then remove only the selected book and update the saved list. Use each book's unique ID so the correct item is changed or deleted. Make sure changing or deleting a book still works when I'm using search, and update the empty-state message when the last book is removed.

Please preserve the features that already work. Explain how to test changing a status, refreshing the page, deleting a book, and deleting a book while a search is active.

Please make sure:
- Only the selected book is updated or deleted.
- Status changes are saved immediately.
- The empty-state message appears if no books remain.

## Prompt 6 — Show counts and improve the design

Please add a small section showing the total number of books and how many are `To read`, `Reading`, and `Finished`. The counts should update whenever I add or delete a book or change its status. They should count the full list, not only the search results currently visible.

Then improve the design so the app looks clean and modern. I'd like a warm, light background, dark green accents, readable text, neat book cards, and clear status labels. Make it work well on phones, tablets, and desktops, without horizontal scrolling. Add visible keyboard focus styles and keep buttons and form fields easy to use on touchscreens.

Please keep the styling in `style.css`, avoid external UI libraries, and don't remove any existing features. After the changes, explain what you updated and how I can check the layout on a small screen.

Please pay attention to:
- Buttons and inputs being comfortable to tap.
- Text and status labels being easy to read.
- Clear focus styles when using a keyboard.
- Counts remaining correct while search is active.

## Prompt 7 — Test the app and fix problems

Please review my Book Tracker and check that all the features work together. Check required fields, adding books, newest-first order, searching by title and author, changing status, deleting books, counts, and saving data after a refresh. Also check empty search results, the mobile layout, keyboard usability, and browser console errors.

Where practical, check what happens with invalid saved JSON or unavailable `localStorage`. First tell me what you found and which things you couldn't verify. Then fix real problems with the smallest changes possible. Please don't rewrite the whole app or remove working features. Explain the fixes and give me a short checklist so I can test them myself.

Don't say a test passed unless you actually ran it. If you can't run a test in your environment, say so and tell me how I can test it manually.

Please group findings into:
- Bugs that need fixing.
- Improvements that are optional.
- Tests I still need to run myself.

## Prompt 8 — Finish the project and prepare it for GitHub

Please give my Book Tracker a final review. Check that the main features work, the code is understandable, user-entered text is displayed safely, and the app handles empty inputs and missing saved data sensibly.

Update `README.md` with the project overview, features, technologies, file structure, instructions for running the app, and a short testing checklist. Explain that `localStorage` saves data in the current browser and doesn't sync between devices. Make sure this `prompts.md` file is included in the project.

Then check the Git status and tell me how to save the project to GitHub using Git commands. Please don't commit or push automatically. Let me review the files first, and don't delete or overwrite existing Git history. Explain anything I should check before sharing the project, and don't claim the app is deployed or fully tested unless that is true.

Before I share it, remind me to:
- Check the final files and Git status.
- Make sure no secrets or personal files are included.
- Test the app once more in the browser.
- Review the commit message before running Git commands.

---

## My workflow

1. Give Codex one prompt at a time.
2. Review the code changes before accepting them.
3. Run the app in my browser and test the feature.
4. Try normal inputs and mistakes, such as an empty title or a search with no matches.
5. Fix any problems before moving to the next prompt.
6. Save a Git checkpoint when a stage is working.