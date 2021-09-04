/*Designed and Developed by Apple Developers Group - VIT
https://github.com/ADG-VIT/ADG-Quiz-Website*/

/*getting a bunch of DOM elements using querySelectors*/




/*defining some variables and arrays that will help us keep track of questions, options of various listed questions*/




/*this is sleep function designed to sync. stop the thread for 1 sec*/




/*data will recieve the json data in it*/
/*counter will represent the question number counter = 0 is first question*/




/*this function will prompt fetch API to get data, axios can be used here too (more suitable)
we get data from JSON and .json() is called on it to wait till we convert the data to js object
refer how Fetch API and .json() works*/




/*when update is called on a counter, the (counter+1)th question will be updated
by updated we mean the selected option will be CHECKED and text related to the question will be displayed*/




/*this is an async function that will pause the thread till all the data from API has arrived and turned into object*/
/*await sleep is required here to relax the thread for 1 sec*/
/*if this wasnt here the thread will loop contineously and eat up all the RAM and freeze the system*/




/*adding event listners to prev and next buttons - will save the options and load up the next question
by load I mean update(counter ++ or counter--) will be called*/




/*this is function that will render the thanks page through DOM manipulation
it will also calculate the final score
theres a security bug here, try to find it*/




/*below is an implementation of timer for 10 minutes in js
this is a bit cumbersome try to shorten it*/




/*change is the final game loop
breaking of this loop will mean the time has ended and game is over
termination of change wil prompt us to thank you page*/
