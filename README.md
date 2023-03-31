# simzub.github.io
* Possibility to add a new item<br>
	- Input field for description<br>
		- Required<br>
		- Length up to 160 symbols<br>
* Input field for deadline<br>
	- Optional<br>
	- Input type is datetime-local (format YYYY-MM-DD HH:MM)<br>
* ‘Add’ button<br>
	- Adds item to the list<br>
		- Use sessionStorage to store data<br>
	- Clears input fields<br>

* Existing items list<br>
	- Item in the list should have<br>
		- Description<br>
		- Time left till deadli<br>ne (show days, hours and minutes left)<br>
		- ‘Delete’ button<br>
			- Shows confirm popup window<br>
			- When confirmed removes item from the list completely<br>
			- Does nothing if not confirmed<br>
		- Checkbox to mark a completed item<br>
			- Marking as completed moves item down the list<br>
			- Completed items have line-through style applied to them<br>

	- Sorting order<br>
		- Recently added (Newest items at the top. Default sorting)<br>
		- Deadline (Least time left to most time left)<br>
		- Recently completed items (Recently completed are shown on the top)<br>
