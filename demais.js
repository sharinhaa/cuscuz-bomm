document.addEventListener('DOMContentLoaded', () =>) {
    const form = document.getElementById('cusuczForm');
    const totalDisplay = document.getElementById('totalValue');

    function CalculeTotal() {
        let total = 0;

     const selectedOptions = form.querySelectorAll('input: checked');
      selectedOptions.forEach(option => {
        total += parseFloat(option.value);
      });

      totalDisplay.textContent = total.toFixed(2).replace('.', '.');
    }
}