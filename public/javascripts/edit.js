// När sidan är helt laddad körs koden inuti denna funktion
document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn"); // Hämta alla "Edit"-knappar
  const saveButtons = document.querySelectorAll(".save-btn"); // Hämta alla "Save"-knappar
  const deleteButtons = document.querySelectorAll(".delete-btn"); // Hämta alla "Delete"-knappar

  // Loopar igenom alla "Edit"-knappar och lägger till klickhändelser
  editButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      alert(
        "⚠️ You are about to edit this row. Make sure to save your changes!"
      );
      const row = btn.closest("tr"); // Hitta raden (tr) som knappen finns i
      const inputs = row.querySelectorAll("input"); // Hämta alla input-fält i raden

      inputs.forEach((input) => {
        // Gör alla input-fält redigerbara genom att ta bort "readonly"
        input.removeAttribute("readonly");
        input.classList.add("hover:bg-gray-200");
      });

      btn.classList.add("hidden"); // Dölj "Edit"-knappen
      saveButtons[index].classList.remove("hidden"); // Visa motsvarande "Save"-knapp
    });
  });

  // Loopar igenom alla "Save"-knappar och lägger till klickhändelser
  saveButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // Förhindra formuläret från att skickas direkt
      const row = btn.closest("tr"); // Hitta raden (tr) som knappen finns i
      const inputs = row.querySelectorAll("input"); // Hämta alla input-fält i raden
      const id = row.getAttribute("data-id"); // Hämta produktens ID från <tr>

      // Hämta uppdaterade värden från input-fälten
      const productName = inputs[0].value;
      const category = inputs[1].value;
      const color = inputs[2].value;
      const price = inputs[3].value;
      console.log("Saving:", { productName, category, color, price }); // Debugging

      // Skicka PUT-förfrågan till API:et för att uppdatera databasen
      fetch(`/api/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          category,
          color,
          price,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }
          return response.json();
        })
        .then((data) => {
          alert("✅ Changes have been saved successfully!"); // Visa en alert när ändringarna har sparats
          console.log("Updated product:", data);
        })
        .catch((error) => {
          alert("❌ Error: " + error.message);
          console.error("Update failed:", error);
        });

      inputs.forEach((input) => {
        // Gör input-fälten skrivskyddade igen
        input.setAttribute("readonly", true);
      });
      btn.classList.add("hidden"); // Dölj "Save"-knappen och visa "Edit"-knappen igen
      editButtons[index].classList.remove("hidden");
    });
  });

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const row = btn.closest("tr"); // Hitta raden (tr) som knappen finns i
      const id = row.getAttribute("data-id"); // Hämta produktens ID

      if (!confirm("⚠️ Are you sure you want to delete this product? This action cannot be undone!")) {
        return; // Avbryt om användaren väljer "Nej"
      }

      // Skicka DELETE-förfrågan till servern
      fetch(`/api/edit/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }
          return response.json();
        })
        .then(() => {
          alert("🗑 Product deleted successfully!");
          row.remove(); // Ta bort raden från tabellen i frontend
        })
        .catch((error) => {
          alert("❌ Error: " + error.message);
          console.error("Delete failed:", error);
        });
    });
  });
});
