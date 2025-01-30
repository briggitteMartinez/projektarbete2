document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    let currentIndex = 0; // Startposition
    const slideCount = carousel.children.length; // Antal bilder
    const slidesPerView = 1; // En bild visas åt gången
  
    // Funktion för att uppdatera karusellens position
    function updateCarousel() {
      const offset = -(currentIndex * 100); // Skifta med 100% per bild
      carousel.style.transform = `translateX(${offset}%)`;
    }
  
    // Nästa knapp (loop)
    nextBtn.addEventListener("click", () => {
      if (currentIndex < slideCount - slidesPerView) {
        currentIndex++;
      } else {
        currentIndex = 0; // Gå tillbaka till första bilden
      }
      updateCarousel();
    });
  
    // Föregående knapp (loop)
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slideCount - slidesPerView; // Gå till sista bilden
      }
      updateCarousel();
    });
  });
  
  
