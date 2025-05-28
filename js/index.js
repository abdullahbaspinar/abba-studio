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
    }

    window.onload = () => {
      toggleLang(); toggleLang();
    };
