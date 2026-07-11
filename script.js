const section = document.querySelector('.impacto');
const counters = document.querySelectorAll('.impacto h2');

const observer = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting) return;

    counters.forEach((counter) => {
      const texto = counter.textContent.trim();
      const numero = parseInt(texto.replace(/\D/g, ''));
      const prefixo = texto.match(/^\D+/)?.[0] || '';
      const sufixo = texto.match(/\D+$/)?.[0] || '';

      let atual = 0;

      const duracao = Math.random() * 1600 + 1200;
      const inicio = performance.now();

      function animar(tempo) {
        const progresso = Math.min((tempo - inicio) / duracao, 1);

        atual = Math.floor(progresso * numero);
        counter.textContent = `${prefixo}${atual}${sufixo}`;

        if (progresso < 1) {
          requestAnimationFrame(animar);
        } else {
          counter.textContent = `${prefixo}${numero}${sufixo}`;
        }
      }

      requestAnimationFrame(animar);
    });

    observer.disconnect();
  },
  {
    threshold: 0.4,
  },
);

observer.observe(section);
