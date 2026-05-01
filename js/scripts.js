
    document.addEventListener("DOMContentLoaded", () => {
      /*  1. THEME TOGGLE  */
      const root = document.documentElement;
      const themeBtn = document.getElementById("themeBtn");
      const themeIcon = document.getElementById("themeIcon");
      const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
      const sunSVG = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;

      function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        themeIcon.innerHTML = theme === "dark" ? moonSVG : sunSVG;
        localStorage.setItem("theme", theme);
      }
      const savedTheme = localStorage.getItem("theme") || "dark";
      applyTheme(savedTheme);
      themeBtn.addEventListener("click", () => {
        applyTheme(
          root.getAttribute("data-theme") === "dark" ? "light" : "dark",
        );
      });

      /*  2. NAVBAR SCROLL  */
      const navbar = document.getElementById("navbar");
      window.addEventListener(
        "scroll",
        () => {
          navbar.classList.toggle("scrolled", window.scrollY > 50);
          bttBtn.classList.toggle("visible", window.scrollY > 300);
        },
        { passive: true },
      );

      /*  3. HAMBURGER MENU  */
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileMenu.classList.toggle("open");
        document.body.style.overflow = mobileMenu.classList.contains("open")
          ? "hidden"
          : "";
      });
      document.querySelectorAll(".mob-link").forEach((l) => {
        l.addEventListener("click", () => {
          hamburger.classList.remove("open");
          mobileMenu.classList.remove("open");
          document.body.style.overflow = "";
        });
      });

      /*  4. SCROLLSPY  */
      const navAnchors = document.querySelectorAll(".nav-links a");
      const sections = document.querySelectorAll("section[id]");
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              navAnchors.forEach((a) => {
                a.classList.toggle(
                  "active",
                  a.getAttribute("href") === "#" + e.target.id,
                );
              });
            }
          });
        },
        { threshold: 0.35 },
      );
      sections.forEach((s) => spyObserver.observe(s));

      /*  5. TYPEWRITER  */
      const roles = [
        "Full Stack Developer",
        "PHP & Laravel Expert",
        "Java Spring Boot Dev",
        "Problem Solver",
        "Web Designer",
      ];
      const tw = document.getElementById("typewriter");
      const delay = (ms) => new Promise((r) => setTimeout(r, ms));
      async function typeLoop() {
        let i = 0;
        while (true) {
          const txt = roles[i % roles.length];
          for (let c = 0; c < txt.length; c++) {
            tw.textContent = txt.slice(0, c + 1);
            await delay(80);
          }
          await delay(2000);
          for (let c = txt.length; c > 0; c--) {
            tw.textContent = txt.slice(0, c - 1);
            await delay(40);
          }
          await delay(300);
          i++;
        }
      }
      typeLoop();

      /*  6. HERO ENTRANCE  */
      const hero = document.querySelector(".hero");
      setTimeout(() => hero.classList.add("animated"), 100);

      /*  7. SCROLL REVEAL  */
      const revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("revealed");
              revealObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((el) => revealObs.observe(el));

      /*  8. COUNT-UP  */
      const countObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = +el.getAttribute("data-target");
            const suffix = el
              .closest(".stat-card")
              .querySelector(".stat-label")
              .textContent.includes("Exp")
              ? "+"
              : "+";
            const start = performance.now();
            const dur = 1500;
            const step = (ts) => {
              const p = Math.min((ts - start) / dur, 1);
              const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
              el.textContent =
                Math.floor(eased * target) + (p === 1 ? suffix : "");
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            countObs.unobserve(el);
          });
        },
        { threshold: 0.5 },
      );
      document
        .querySelectorAll(".stat-number")
        .forEach((el) => countObs.observe(el));

      /*  9. SKILLS TAB FILTER  */
      document.querySelectorAll(".skill-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          const parent = tab.closest("section");
          parent
            .querySelectorAll(".skill-tab")
            .forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          const cat = tab.getAttribute("data-cat");
          parent.querySelectorAll(".skill-card").forEach((card) => {
            const match =
              cat === "all" || card.getAttribute("data-cat") === cat;
            card.classList.toggle("hidden", !match);
            if (match) card.style.position = "";
          });
        });
      });

      /*  10. PROJECTS FILTER  */
      document.querySelectorAll("[data-pcat]").forEach((tab) => {
        tab.addEventListener("click", () => {
          document
            .querySelectorAll("[data-pcat]")
            .forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          const cat = tab.getAttribute("data-pcat");
          document.querySelectorAll(".project-card").forEach((card) => {
            const match =
              cat === "all" || card.getAttribute("data-pcat") === cat;
            if (match) {
              card.style.display = "flex";
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            } else {
              card.style.opacity = "0";
              card.style.transform = "scale(.95)";
              setTimeout(() => {
                if (!match) card.style.display = "none";
              }, 300);
            }
          });
        });
      });

      /*  10b. SHOW MORE  */
      const showMoreBtn = document.getElementById("showMoreBtn");
      let expanded = false;
      showMoreBtn.addEventListener("click", () => {
        expanded = !expanded;
        document.querySelectorAll(".extra-project").forEach((c) => {
          c.classList.toggle("hidden", !expanded);
        });
        showMoreBtn.textContent = expanded
          ? "Show Less"
          : "Show More Projects";
      });

      /*  11. BACK TO TOP  */
      const bttBtn = document.getElementById("btt");
      bttBtn.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );

      /*  12. CONTACT FORM  */
      const form = document.getElementById("contactForm");
      const submitBtn = document.getElementById("submitBtn");

      function showToast(msg, type) {
        const t = document.createElement("div");
        t.className = `toast ${type}`;
        t.innerHTML =
          (type === "success"
            ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
            : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`) +
          msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 4000);
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("femail").value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showToast("Please enter a valid email address.", "error");
          return;
        }
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
        setTimeout(() => {
          showToast("Message sent! I'll reply soon. 🚀", "success");
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Send Message →";
        }, 1500);
      });

      /*  Skill cards staggered reveal  */
      const skillCards = document.querySelectorAll(".skill-card");
      const skillObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const cards = e.target.querySelectorAll(".skill-card");
              cards.forEach((c, i) => {
                setTimeout(() => {
                  c.style.opacity = "1";
                  c.style.transform = "translateY(0)";
                }, i * 60);
              });
              skillObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      const skillsGrid = document.querySelector(".skills-grid");
      if (skillsGrid) {
        skillCards.forEach((c) => {
          c.style.opacity = "0";
          c.style.transform = "translateY(30px)";
          c.style.transition = "opacity .4s ease, transform .4s ease";
        });
        skillObs.observe(skillsGrid);
      }
    });