// När sidan är helt laddad körs koden inuti denna funktion
document.addEventListener("DOMContentLoaded", () => {
    // Hämta alla "Edit"-knappar
    const editButtons = document.querySelectorAll(".edit-btn");
    
    // Hämta alla "Save"-knappar
    const saveButtons = document.querySelectorAll(".save-btn");
  
    // Loopar igenom alla "Edit"-knappar och lägger till klickhändelser
    editButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        alert("⚠️ You are about to edit this row. Make sure to save your changes!");
        // Hitta raden (tr) som knappen finns i
        const row = btn.closest("tr");
  
        // Hämta alla input-fält i raden
        const inputs = row.querySelectorAll("input");
  
        // Gör alla input-fält redigerbara genom att ta bort "readonly"
        inputs.forEach((input) => {
          input.removeAttribute("readonly");
          input.classList.add("hover:bg-gray-200");
          
        });
  
        // Dölj "Edit"-knappen
        btn.classList.add("hidden");
  
        // Visa motsvarande "Save"-knapp
        saveButtons[index].classList.remove("hidden");
      });
    });
  
    // Loopar igenom alla "Save"-knappar och lägger till klickhändelser
    saveButtons.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // Förhindra formuläret från att skickas direkt
  
        // Visa en alert när ändringarna har sparats
        alert("✅ Changes have been saved successfully!");
  
        // Hitta raden (tr) som knappen finns i
        const row = btn.closest("tr");
  
        // Hämta alla input-fält i raden
        const inputs = row.querySelectorAll("input");
  
        // Gör input-fälten skrivskyddade igen
        inputs.forEach((input) => {
          input.setAttribute("readonly", true);
        });
  
        // Dölj "Save"-knappen och visa "Edit"-knappen igen
        btn.classList.add("hidden");
        editButtons[index].classList.remove("hidden");
      });
    });
  });