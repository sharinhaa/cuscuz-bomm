document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cuscuzform");
    const totalDisplay = document.getElementById("totalvalue");

    if (!form || !totalDisplay) {
      console.error("Elementos necessários do formulário não foram encontrados no DOM.");
      return;
    }

    // Função auxiliar para formatar valores no padrão de moeda brasileira
    function formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    // Função de cálculo do total dinâmico
    function calculeTotal() {
      const selectedOptions = form.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');

      const total = Array.from(selectedOptions).reduce((soma, option) => {
        const valorItem = Number.parseFloat(option.value);
        return soma + (isNaN(valorItem) ? 0 : valorItem);
      }, 0);

      totalDisplay.textContent = formatarMoeda(total);
      return total;
    }

    // Recalcula o valor sempre que uma opção for alterada
    form.addEventListener("change", calculeTotal);

    // Evento de envio e validação do pedido
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      const total = calculeTotal();

      // Pega o nome amigável dos itens selecionados via 'data-name'
      const itensSelecionados = Array.from(
        form.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked')
      ).map((item) => item.dataset.name);

      alert(
        `🎉 Pedido Realizado com Sucesso!\n\n` +
        `Itens Selecionados:\n• ${itensSelecionados.join("\n• ")}\n\n` +
        `Valor Total: R$ ${formatarMoeda(total)}`
      );
    });

    // Executa o cálculo inicial ao carregar a página
    calculeTotal();
});