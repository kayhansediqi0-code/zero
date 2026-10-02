 
    (function() {
      /* ============================================================
         DATA
         ============================================================ */
  var skillsData = [


  // Build
  { name: 'Landing Page Development', percent: 97, category: 'build' },
  { name: 'Responsive Website Development', percent: 98, category: 'build' },

  // Redesign & Customize
  { name: 'Website Redesign', percent: 98, category: 'redesign' },
  { name: 'Website Customization', percent: 96, category: 'redesign' },

  // Fix
  { name: 'Responsive Layout Fixes', percent: 97, category: 'fix' },
  { name: 'HTML & CSS Bug Fixes', percent: 96, category: 'fix' }



];

      /* ============================================================
         PROJECTS DATA - EDIT HERE
         ============================================================ */
      var projectsData = [
        { title: 'Silent Knights Website Redesign', desc: 'Transformed an outdated website into a modern, responsive experience that strengthens brand credibility, improves usability, and delivers a more professional online presence.', tech: 'HTML5 • CSS3 • JavaScript', img: './newlogo.jpg' },
      ];

      /* ============================================================
         EXPERIENCE DATA - EDIT HERE
         ============================================================ */
      var experiencesData = [
        {
          title: 'Front-End Developer',
          company: 'Team Project',
          date: 'Feb 2026 – Aug 2026',
          desc: 'Redesigned an existing website with a modern, responsive interface and built a professional user dashboard. Focused on clean UI, usability, and a smooth experience across devices.'
        }
      ];

      /* ============================================================
         PRELOADER
         ============================================================ */
      var preloader = document.getElementById('preloader');
      var header = document.getElementById('header');
      var heroTag = document.getElementById('heroTag');
      var heroHeading = document.getElementById('heroHeading');
      var heroRole = document.getElementById('heroRole');
      var heroDesc = document.getElementById('heroDesc');
      var heroButtons = document.getElementById('heroButtons');
      var heroRight = document.getElementById('heroRight');
      var dismissed = false;

      function revealHero() {
        if (dismissed) return;
        dismissed = true;
        preloader.classList.add('hidden');
        header.classList.add('visible');
        setTimeout(function() { heroTag.classList.add('visible'); }, 100);
        setTimeout(function() { heroHeading.classList.add('visible'); }, 280);
        setTimeout(function() { heroRole.classList.add('visible'); startTyping(); }, 480);
        setTimeout(function() { heroDesc.classList.add('visible'); }, 620);
        setTimeout(function() { heroButtons.classList.add('visible'); }, 780);
        setTimeout(function() { heroRight.classList.add('visible'); }, 400);
      }

      preloader.addEventListener('click', revealHero);
      preloader.addEventListener('touchstart', revealHero, { passive: true });
      var preloaderTimer = setTimeout(revealHero, 5000);

      /* ============================================================
         TYPING EFFECT
         ============================================================ */
      var typingStarted = false;

      function startTyping() {
        if (typingStarted) return;
        typingStarted = true;
        var el = document.getElementById('roleText');
        if (!el) return;
        var roles = [
          'Front-End Fix Specialist.',
          'Responsive Design Expert.',
          'Clean & Reliable UI Fixes.'
        ];
        var ri = 0,
          ci = 0,
          del = false;

        function tick() {
          var cur = roles[ri];
          if (!del) {
            ci++;
            el.textContent = cur.slice(0, ci);
            if (ci === cur.length) { del = true;
              setTimeout(tick, 1800); return; }
          } else {
            ci--;
            el.textContent = cur.slice(0, ci);
            if (ci === 0) { del = false;
              ri = (ri + 1) % roles.length; }
          }
          setTimeout(tick, del ? 30 : 75);
        }
        tick();
      }

      /* ============================================================
         MOUSE GLOW
         ============================================================ */
      (function() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        var glow = document.createElement('div');
        glow.className = 'mouse-glow';
        heroRight.appendChild(glow);
        heroRight.addEventListener('mousemove', function(e) {
          var rect = heroRight.getBoundingClientRect();
          glow.style.transform = 'translate(' + (e.clientX - rect.left - 190) + 'px, ' + (e.clientY - rect.top - 190) + 'px)';
        });
      })();

      /* ============================================================
         HAMBURGER
         ============================================================ */
      var hamburger = document.getElementById('hamburgerBtn');
      var mobileNav = document.getElementById('mobileNav');
      hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        var isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      mobileNav.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileNav.classList.remove('open');
        });
      });
      document.addEventListener('click', function(e) {
        if (!e.target.closest('header')) {
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileNav.classList.remove('open');
        }
      });

      /* ============================================================
         ACTIVE NAV LINK
         ============================================================ */
      var allNavLinks = document.querySelectorAll('.nav-link');

      function updateActiveLink() {
        var current = '';
        var scrollPos = window.scrollY + 120;
        document.querySelectorAll('section[id]').forEach(function(section) {
          var top = section.offsetTop;
          var height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = section.getAttribute('id');
          }
        });
        allNavLinks.forEach(function(link) {
          var href = link.getAttribute('href');
          if (!href) return;
          var id = href.substring(1);
          if (id === current) { link.classList.add('active'); } else { link.classList.remove('active'); }
        });
      }
      window.addEventListener('scroll', updateActiveLink, { passive: true });
      window.addEventListener('load', updateActiveLink);

      /* ============================================================
         SMOOTH SCROLL
         ============================================================ */
      function scrollToSection(id) {
        var target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToSection(this.getAttribute('href').substring(1));
        });
      });

      document.getElementById('hireBtn').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('contact');
      });
      document.getElementById('workBtn').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('projects');
      });

      /* ============================================================
         SKILLS
         ============================================================ */
      var skillsContainer = document.getElementById('skillsContainer');
      var animTimer = null;

      function renderSkills(filter) {
        filter = filter || 'all';
        var filtered = filter === 'all' ? skillsData : skillsData.filter(function(s) { return s.category === filter; });
        skillsContainer.innerHTML = '';
        filtered.forEach(function(skill) {
          var card = document.createElement('div');
          card.className = 'skill-card fade-up';
          card.innerHTML =
            '<div class="skill-info"><span>' + skill.name + '</span><span>' + skill.percent + '%</span></div>' +
            '<div class="progress-bar"><div class="progress-fill" data-target="' + skill.percent + '" style="width:0%;"></div></div>';
          skillsContainer.appendChild(card);
        });
        clearTimeout(animTimer);
        animTimer = setTimeout(function() {
          skillsContainer.querySelectorAll('.progress-fill').forEach(function(bar) {
            bar.style.width = bar.dataset.target + '%';
          });
        }, 150);
        setTimeout(observeDynamic, 200);
      }

      document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');
          renderSkills(this.dataset.filter);
        });
      });

      renderSkills('all');

      /* ============================================================
         PROJECTS
         ============================================================ */
      var projectsContainer = document.getElementById('projectsContainer');

      function renderProjects() {
        projectsContainer.innerHTML = '';
        projectsData.forEach(function(proj) {
          var template = document.getElementById('projectTemplate');
          var clone = template.content.cloneNode(true);

          var img = clone.querySelector('.project-thumb img');
          img.src = proj.img;
          img.alt = proj.title;

          clone.querySelector('h3').textContent = proj.title;
          clone.querySelector('p').textContent = proj.desc;
          clone.querySelector('.project-tech').textContent = proj.tech;

          projectsContainer.appendChild(clone);
        });
        setTimeout(observeDynamic, 100);
      }
      renderProjects();

      /* ============================================================
         EXPERIENCE (TIMELINE)
         ============================================================ */
      var timelineContainer = document.getElementById('timelineContainer');

      function renderTimeline() {
        timelineContainer.innerHTML = '';
        experiencesData.forEach(function(exp, idx) {
          var side = idx % 2 === 0 ? 'left' : 'right';
          var item = document.createElement('div');
          item.className = 'timeline-item ' + side + ' fade-up';

          item.innerHTML =
            '<div class="timeline-dot"></div>' +
            '<div class="timeline-content">' +
              '<div class="timeline-date">' + exp.date + '</div>' +
              '<h3>' + exp.title + '</h3>' +
              '<div class="timeline-company">' + exp.company + '</div>' +
              '<p>' + exp.desc + '</p>' +
            '</div>';

          timelineContainer.appendChild(item);
        });
        setTimeout(observeDynamic, 100);
      }
      renderTimeline();

      /* ============================================================
         SCROLL REVEAL
         ============================================================ */
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

      document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });

      function observeDynamic() {
        document.querySelectorAll('.skill-card, .project-card, .timeline-item, .about-grid').forEach(function(el) {
          if (el.classList.contains('fade-up') && !el.classList.contains('observed')) {
            observer.observe(el);
            el.classList.add('observed');
          }
        });
      }
      setTimeout(observeDynamic, 300);

    
     // ============================================================
// CONTACT FORM - Send to Backend
// ============================================================
document.getElementById('sendMsgBtn').addEventListener('click', async function(e) {
  e.preventDefault();
  var name = document.getElementById('contactName').value.trim();
  var email = document.getElementById('contactEmail').value.trim();
  var msg = document.getElementById('contactMsg').value.trim();
  var fb = document.getElementById('formFeedback');
  var btn = this;

  // Validation
  if (!name || !email || !msg) {
    fb.innerHTML = '<span style="color:#e11d48;">Please fill all fields.</span>';
    setTimeout(function() { fb.innerHTML = ''; }, 3000);
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    fb.innerHTML = '<span style="color:#e11d48;">Please enter a valid email address.</span>';
    setTimeout(function() { fb.innerHTML = ''; }, 3000);
    return;
  }

  // Disable button & show loading
  btn.disabled = true;
  btn.textContent = 'Sending...';
  fb.innerHTML = '<span style="color:#8a8a8a;">Sending your message...</span>';

  try {
    var response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message: msg }),
    });

    var data = await response.json();

    if (data.success) {
      fb.innerHTML = '<span style="color:#16a34a;">' + data.message + '</span>';
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactMsg').value = '';
    } else {
      fb.innerHTML = '<span style="color:#e11d48;">' + data.message + '</span>';
    }
  } catch (error) {
    fb.innerHTML = '<span style="color:#e11d48;">Connection error. Please email me directly at kaihansediqi10@gmail.com</span>';
  }

  btn.disabled = false;
  btn.textContent = 'Request a Fix';
  setTimeout(function() { fb.innerHTML = ''; }, 5000);
});

    document.addEventListener("DOMContentLoaded", function () {

      const header = document.getElementById("header");
      const mobileNav = document.getElementById("mobileNav");
      const hamburgerBtn = document.getElementById("hamburgerBtn");

      const navLinks = document.querySelectorAll(
        'a[href^="#"]'
      );


      function scrollToSection(targetId) {

        const target = document.querySelector(targetId);

        if (!target) return;


        const headerHeight = header
          ? header.getBoundingClientRect().height
          : 0;


        const extraSpace = 12;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          extraSpace;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      }


      navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

          const targetId = this.getAttribute("href");


          if (
            !targetId ||
            targetId === "#" ||
            !targetId.startsWith("#")
          ) {
            return;
          }


          const target = document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          scrollToSection(targetId);


          /*
            Close mobile menu after selecting a section
          */
          if (mobileNav) {

            mobileNav.classList.remove("active");

          }


          if (hamburgerBtn) {

            hamburgerBtn.setAttribute(
              "aria-expanded",
              "false"
            );

            hamburgerBtn.classList.remove("active");

          }


          /*
            Update URL hash without jumping
          */
          if (
            history.pushState &&
            window.location.hash !== targetId
          ) {

            history.pushState(
              null,
              "",
              targetId
            );

          }

        });

      });

    });
  
})();
