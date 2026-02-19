const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const counter = entry.target;
    const target = +counter.getAttribute("data-target");
    const numberNode = counter.childNodes[0]; // 👈 only the number part

    if (entry.isIntersecting) {
      let count = 0;

      const updateCounter = () => {
        const increment = target / 100;

        if (count < target) {
          count += increment;
          numberNode.nodeValue = Math.ceil(count); // 👈 update only number
          requestAnimationFrame(updateCounter);
        } else {
          numberNode.nodeValue = target;
        }
      };

      updateCounter();

    } else {
      // Reset to 0 when leaving viewport
      numberNode.nodeValue = "0";
    }
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  observer.observe(counter);
});
