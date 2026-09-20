document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cuscuzform");
    const totalDisplay = document.getElementById("totalvalue");

    if (!form || !totalDisplay) {
      console.error("Elementos necessários não foram encontrados.");
      return;
    }

    function formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      });
    }

    function CalculeTotal() {
     const selectedOptions = form.querySelectorAll('input[type="redio"]:checked, input[type="checkbox"]:checked');

     const total = Array.from(selectedOptions).reduce((soma, option) => {
      return soma + Number.parseFloat(option.value);
     }, 0);
      totalDisplay.textContent = formatarMoeda(total);

      return total;
    }


form.addEventListener('change', CalculeTotal);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if(!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const total = CalculeTotal();

  const itens = Array.from(
    form.querySelectorAll(
      'input[type="radio"]:checked, input[type="checkbox"]:checked'
    )
  ).map((item) => item.dataset.name);

  alert(
    'Pedido realizado com sucesso!\n\n' +
    'Itens: ${itens.join(",")}\n' +
    'Valor total: R$ ${formatarMoeda(total)}'
  );
});

CalculeTotal();
});