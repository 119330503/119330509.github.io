function slider()
{
	$current=$('slider img.active');
    if($current.length==0){
		$('slider img:first-child').addClass('active);
	}else{
		$next = $current.removeClass('active').next();
	if($next.length==0){
		$('.slider img:first-child').addClass('active');
	}else{
		$next.addClass('active');
	     }
	}
}
setInterval(slider,5000);		
	
	    
	
	$(function() { // Start autoplay
    var auto = true;
     
    // Pause duration between slides (ms)
    var pause = 7000;
     
    // Get parent element
    var $this = $('#slider');
     
    // Slides container
    var slidesCont = $this.children('.slides-container');
    // Get all slides
    var slides = slidesCont.children('.slide');
     
    // Get pager div
    var pager = $this.children('.pager');
     
    // Get Previous / Next links
    var arrowsCont = $this.children('.arrows');
    var prevSlide = arrowsCont.children('.prev');
    var nextSlide = arrowsCont.children('.next');
     
    // Total slides count
    var slidesCount = slides.length;
     
    // Set currentSlide to first child
    var currentSlide = slides.first();
    var currentSlideIndex = 1;
     
    // Holds setInterval for autoplay, so we can reset it when user navigates
    var autoPlay = null;
});
	slides.not(':first').css('display', 'none');
currentSlide.addClass('active');

	    // Function responsible for fading to next slide
    function fadeNext() {
        currentSlide.removeClass('active').fadeOut(700);
     
        if(currentSlideIndex == slidesCount) {
            currentSlide = slides.first();
            currentSlide.delay(500).addClass('active').fadeIn(700);
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            currentSlide = currentSlide.next();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }
     
        pager.text(currentSlideIndex+' / '+slidesCount);
    }
     
    // Function responsible for fading to previous slide
    function fadePrev() {
        currentSlide.removeClass('active').fadeOut(700);
     
        if(currentSlideIndex == 1) {
            currentSlide = slides.last();
            currentSlide.delay(500).addClass('active').fadeIn();
            currentSlideIndex = slidesCount;
        } else {
            currentSlideIndex--;
            currentSlide = currentSlide.prev();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }
     
        pager.text(currentSlideIndex+' / '+slidesCount);
    }

Now we will create a function that will start the auto slideshow. Important thing in this function is that we reset timer/pause between slides. This is needed when person clicks next or previous arrow, so that the timer resets to firstly set value, otherwise it could happen that someone clicks next, and 2 seconds later slider transitions to another slide.

    // Function that starts the autoplay and resets it
    // in case user navigated (clicked prev or next)
    function AutoPlay() {
        clearInterval(autoPlay);
     
        if(auto == true)
            autoPlay = setInterval(function() {fadeNext()}, pause);
    }

Last thing we need to do, is to transition the slides when user clicks on either next or prevous arrow, and call the AutoPlay function so the sliders autoplay starts is set true.

    // Detect if user clicked on arrow for next slide and fade next slide if it did
    $(nextSlide).click(function(e) {
        e.preventDefault();
        fadeNext();
        AutoPlay();
    });
     
    // Detect if user clicked on arrow for previous slide and fade previous slide if it did
    $(prevSlide).click(function(e) {
        e.preventDefault();
        fadePrev();
        AutoPlay();
    });
     
    // Start autoplay if auto is set to true
    AutoPlay();

And that’s it! Now you have your own simple slider with fading transition.

 

PS It wouldn’t be a bad idea to actually wrap all of that code into function, so you can then create multiple sliders.

function dxSimpleSlider(element, auto = false, pause = 7000) {
   // slider code goes here
}

You will need to remove var auto = true; and var pause = 7000; from our code, and change var $this = $('#slider'); to var $this = $(element); when pasting into function.
Now you can use it very simply:

dxSimpleSlider('#slider', true, 6000);
dxSimpleSlider('#slider-two', false, 4000);
dxSimpleSlider('#slider-three', false, 10000);

