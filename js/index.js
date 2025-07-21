    const nav = document.getElementById('mobileNav');
    function toggleMenu() {
      nav.classList.toggle('active');
    }
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !e.target.classList.contains('menu-toggle')) {
        nav.classList.remove('active');
      }
    });

    let lang = 'en';
    function toggleLang() {
      lang = lang === 'en' ? 'tr' : 'en';
      document.querySelectorAll('[data-tr-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-tr-${lang}`);
      });
      document.body.classList.toggle('theme-tr', lang === 'tr');
      document.body.classList.toggle('theme-en', lang === 'en');
    }

    window.onload = () => {
      document.body.classList.add('theme-en');
      toggleLang(); toggleLang();

      // Kayan yıldızlar
      const starCount = 50;
      const bgStars = document.querySelector('.bg-stars');
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-dot' + (Math.random() > 0.5 ? ' light' : '');
        const size = Math.random() * 2.2 + 1.2; // 1.2px - 3.4px
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 6; // 6s - 10s
        const delay = Math.random() * 10;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}vw`;
        star.style.top = `-${size * 2}px`;
        star.style.opacity = (Math.random() * 0.3 + 0.12).toFixed(2);
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        bgStars.appendChild(star);
      }
    };
