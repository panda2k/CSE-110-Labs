# `stickyNote.text.tsx`
## Create StickyNote
### renders create note form
This test ensures the create note form is on screen 

### creates a new note
This test ensures a new sticky note can be created

## Read StickyNote
### All sticky notes can be read
This test ensures every sticky note from dummyNoteList is displayed on screen

## Update StickyNote
### Sticky note title updates
This test ensures the sticky note title can be edited

### Sticky note content updates
This test ensures the sticky note content can be edited

### Sticky note label updates
This test ensures the sticky note label can be edited

## Delete StickyNote 
### Sticky note deletes
This test ensures a sticky note is deleted and removed from screen

### Deleted note is unfavorited
This test ensures that a liked sticky note is removed from the likes list
when it is deleted

## Like StickyNote
### Sticky note likes and unlikes
This test ensures that a liked sticky note is added to the liked list when 
the like button is clicked and 
removed from the liked list when the like button is clicked again

# `toDoList.test.tsx`
## Read ToDoList
### All todolist items can be read
This test ensures every todolist item in dummyGroceryList is displayed on screen.

## Title display
### title displays number of checked
This test makes sure the title shows 0 items checked initially, then 
updates when a checkbox is clicked.

# `App.test.tsx`
## renders Create Note
This renders the router and app and checks if the Create Note element
exists.

