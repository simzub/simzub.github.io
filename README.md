# simzub.github.io
* Possibility to add a new item<br>
○ Input field for description<br>
	■ Required<br>
	■ Length up to 160 symbols<br>
* Input field for deadline<br>
	■ Optional<br>
	■ Input type is datetime-local (format YYYY-MM-DD HH:MM)<br>
* ‘Add’ button
■ Adds item to the list
● Use sessionStorage to store data
■ Clears input fields

● Existing items list
○ Item in the list should have
■ Description
■ Time left till deadline (show days, hours and minutes left)
■ ‘Delete’ button
● Shows confirm popup window
● When confirmed removes item from the list completely
● Does nothing if not confirmed
■ Checkbox to mark a completed item
● Marking as completed moves item down the list
● Completed items have line-through style applied to them

○ Sorting order
■ Recently added (Newest items at the top. Default sorting)
	■ Deadline (Least time left to most time left)
■ Recently completed items (Recently completed are shown on the top)

●   First list item
     - First nested list item
       - Second nested list item
