window.addEventListener("load", function() {
    const input = document.getElementById("slider");

    const velocity = 0.5; 
    const timeout = 7000; 
    let pauseTimeout = null;
    let pause = true;  
    let direction = "low";

    input.addEventListener("input", slide);

    function slide(e, value = null){
        if(e) {
            clearTimeout(pauseTimeout)
            pause = true;

            pauseTimeout = setTimeout(() => {
                pause = false;
            }, timeout)
        }

        let slideValue = value || input.value;
    
        document.getElementById("img2").style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
        //console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
    }
    
    const startInterval = () => {
        interval = setInterval(() => {
            if(pause) return;
            
            const isLow = Number(input.value) < 1;
            const isHigh = Number(input.value) > 99;
    
            const value = direction === "low" ? Number(input.value) - velocity : Number(input.value) + velocity;
            input.value = value;
            let slideValue = direction === "low" ? Number(input.value) - velocity : Number(input.value) + velocity;
            
            if(isHigh) direction = "low"
            if(isLow) direction = "high"
        
            slide(null, slideValue)
        }, 100);
    }

    startInterval();
    
    pauseTimeout = setTimeout(() => {
        pause = false;
    }, timeout);

})

