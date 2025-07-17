const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); 
const count = document.getElementById('count');
const total = document.getElementById('total'); 
const movieSelect = document.getElementById('movie'); 
 

//FUNCTIONS
populateUI(); 

let ticketPrice = +movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
     localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    //Select seats selected and update the count 
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); 

    //Copy selected seats into an array
    //Map through array
    //return a new array
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat)
    }); 
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


    const selectedSeatsCount = selectedSeats.length; 
    count.textContent = selectedSeatsCount; 
    total.textContent = selectedSeatsCount * ticketPrice;
    console.log(`Total: ${total.textContent}`)
}

//Get data from localstorage and populate UI
function populateUI(){ 
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); 
  
    //If there's selectedSeats in localStorage then add the CSS class selected 
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {    
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex; 
    }

}

//EVENT LISTENERS

//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    console.log(`Ticket price: ${ticketPrice}`)
    console.log(`Movie selected: ${movieSelect.value}`)
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount(); 
})

//Select movie and seats
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount(); 
    }
    
})

//Update Initial Count and total
updateSelectedCount(); 