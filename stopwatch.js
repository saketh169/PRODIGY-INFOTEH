
let start=document.querySelector("#start");
let stops=document.querySelector("#stop");
let reset=document.querySelector("#reset");
    
    
    let startTime = 0;
    let elapsedTime = 0;
    let intervalId;
    let isRunning = false;

    function updateStopwatch() {
      // Calculate elapsed time
      elapsedTime = new Date().getTime() - startTime;

      // Convert elapsed time to hours, minutes, and seconds
      let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      
      // Format hours, minutes, and seconds  based on whether to add string "0"
      
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      

      // Update the display
      document.getElementById('stopwatch').innerText = `${hours}:${minutes}:${seconds}`;
    }


    start.addEventListener("click",() => {
      if (!isRunning) {
        // Set the start time
        startTime = new Date().getTime() - elapsedTime;
        // Update the stopwatch every second
        intervalId = setInterval(updateStopwatch, 1000);
        isRunning = true;
      }
    });

    stops.addEventListener("click",() => {
     if (isRunning) {
        // Stop updating the stopwatch
        clearInterval(intervalId);
        isRunning = false;
      }
    });
      reset.addEventListener("click",() => {
         // Stop updating the stopwatch
      clearInterval(intervalId);
      // Reset elapsed time and update the display
      elapsedTime = 0;
      document.getElementById('stopwatch').innerText = '00:00:00';
      isRunning = false;
      });


    
    

    