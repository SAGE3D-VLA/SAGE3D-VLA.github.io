(function () {
  'use strict';

  function makePlaceholder(video) {
    if (!video || video.dataset.replaced === 'true') return;
    video.dataset.replaced = 'true';

    const label = video.dataset.placeholder || 'Video placeholder';
    const source = video.querySelector('source');
    const filename = source ? source.getAttribute('src') : '';

    const placeholder = document.createElement('div');
    placeholder.className = 'video-placeholder';
    placeholder.innerHTML = `
      <strong>${label}</strong>
      ${filename ? `<span>${filename}</span>` : ''}
    `;

    video.replaceWith(placeholder);
  }

  function setupVideoFallbacks() {
    document.querySelectorAll('video').forEach((video) => {
      const source = video.querySelector('source');
      const onError = () => makePlaceholder(video);

      video.addEventListener('error', onError, { once: true });
      if (source) {
        source.addEventListener('error', onError, { once: true });
      }

      // Trigger source loading so a missing local MP4 becomes a labeled placeholder.
      try {
        video.load();
      } catch (_) {
        // No action needed; native browser controls remain available if loading is deferred.
      }
    });
  }

  function setupCarousel() {
    const carousel = document.querySelector('#results-carousel');
    if (!carousel) return;

    if (typeof window.bulmaCarousel !== 'undefined') {
      window.bulmaCarousel.attach('#results-carousel', {
        slidesToScroll: 1,
        slidesToShow: 3,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        navigation: true,
        pagination: false
      });
    } else {
      carousel.classList.add('carousel-fallback');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupVideoFallbacks();
    setupCarousel();
  });
})();
