document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme & RTL Initialization (Applies to Whole Page/Document Element)
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const savedDir = localStorage.getItem('dir');

    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    if (savedDir) {
        htmlElement.setAttribute('dir', savedDir);
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 2. Inject Responsive Sticky Header HTML with Click-Controlled Home Dropdown & Fixed Mobile Login
    const headerContainer = document.getElementById('siteHeaderContainer');
    if (headerContainer) {
        headerContainer.innerHTML = `
        <header class="sticky top-0 z-[99999] bg-white/95 dark:bg-voltDark-950/95 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 transition-all w-full">
            <div class="volt-container flex justify-between items-center h-20">
                <a href="index.html" class="flex items-center gap-3 group shrink-0">
                    <div class="w-10 h-10 rounded-2xl bg-voltAmber-500/10 border border-voltAmber-500/30 flex items-center justify-center text-voltAmber-500 overflow-hidden">
                            <img src="https://cdn-icons-png.flaticon.com/512/6823/6823621.png" alt="brand-logo" class="w-6 h-6 object-contain"/>
                        </div>
                    <div class="flex flex-col leading-none">
                        <span class="text-xl font-black tracking-tight">IonCo</span>
                        <span class="text-[9px] font-black text-voltAmber-500 tracking-widest uppercase mt-0.5">Pro Roadside</span>
                    </div>
                </a>
                
                <!-- Desktop Navigation (Shown at lg / 1024px and above) -->
                <nav class="hidden lg:flex items-center space-x-1 bg-slate-100 dark:bg-neutral-900 px-1 mx-1 py-1.5 rounded-full border border-slate-200 dark:border-neutral-800 text-[11px] xl:text-xs font-bold uppercase tracking-wider">
                    <!-- Home Click-to-Toggle Dropdown Menu -->
                    <div class="relative" id="desktopHomeDropdown">
                        <button type="button" id="homeDropdownBtn" class="px-3 xl:px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${currentPage === 'index.html' || currentPage === 'home2.html' || currentPage === '' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800'}">
                            Home <i class="fa-solid fa-chevron-down text-[9px] transition-transform" id="homeChevron"></i>
                        </button>
                        <div id="homeDropdownMenu" class="absolute left-0 mt-2 w-48 bg-white dark:bg-voltDark-950 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-xl py-2 hidden z-50">
                            <a href="index.html" class="block px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors ${currentPage === 'index.html' || currentPage === '' ? 'text-voltAmber-500 font-black' : ''}">Consumer Portal</a>
                            <a href="home2.html" class="block px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors ${currentPage === 'home2.html' ? 'text-voltAmber-500 font-black' : ''}">Fleet SaaS</a>
                        </div>
                    </div>
                    <a href="services.html" class="px-3 xl:px-4 py-2 rounded-full transition-colors ${currentPage === 'services.html' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800'}">Services</a>
                    <a href="about.html" class="px-3 xl:px-4 py-2 rounded-full transition-colors ${currentPage === 'about.html' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800'}">About Us</a>
                    <a href="pricing.html" class="px-3 xl:px-4 py-2 rounded-full transition-colors ${currentPage === 'pricing.html' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800'}">Pricing</a>
                    <a href="blog.html" class="px-3 xl:px-4 py-2 rounded-full transition-colors ${currentPage === 'blog.html' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800'}">Blog</a>
                    <a href="contact.html" class="px-3 xl:px-4 py-2 rounded-full transition-colors ${currentPage === 'contact.html' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800'}">Contact</a>
                    <a href="dashboard.html" class="px-3 xl:px-4 py-2 rounded-full transition-colors ${currentPage === 'dashboard.html' ? 'bg-voltAmber-500 text-slate-950' : 'hover:bg-slate-200 dark:hover:bg-neutral-800 '}">Dashboard</a>
                </nav>

                <div class="flex items-center gap-3">
                    <button id="rtlToggle" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-black uppercase">${htmlElement.getAttribute('dir') === 'rtl' ? '→ RTL' : '← LTR'}</button>
                    <button id="themeToggle" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center">
                        <span class="material-symbols-outlined text-sm">${htmlElement.classList.contains('dark') ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                    <button id="mobileMenuBtn" class="lg:hidden w-10 h-10 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center" aria-label="Toggle Navigation Drawer">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <!-- Login button shown only on desktop -->
                    <a href="login.html" class="hidden lg:inline-flex bg-voltAmber-500 hover:bg-voltAmber-600 text-slate-950 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-md transition-all">
                        Login
                    </a>
                </div>
            </div>
            
            <!-- Mobile/Tablet Drawer (Shown below lg / 1024px) -->
            <div id="mobileDrawer" class="hidden lg:hidden bg-white dark:bg-voltDark-950 border-b border-slate-200 dark:border-neutral-800 py-6 transition-all shadow-xl absolute w-full left-0 top-20">
                <div class="volt-container space-y-3">
                    <!-- Mobile Home Options Accordion -->
                    <div class="space-y-1">
                        <div class="text-[10px] font-black uppercase tracking-widest text-voltAmber-500 px-4 py-1">Home Options</div>
                        <a href="index.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-6 rounded-xl ${currentPage === 'index.html' || currentPage === '' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">Consumer Portal</a>
                        <a href="home2.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-6 rounded-xl ${currentPage === 'home2.html' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">Fleet SaaS</a>
                    </div>
                    <a href="services.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl ${currentPage === 'services.html' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">Services & Modalities</a>
                    <a href="about.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl ${currentPage === 'about.html' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">About Us</a>
                    <a href="pricing.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl ${currentPage === 'pricing.html' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">Pricing & Core Exchange</a>
                    <a href="blog.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl ${currentPage === 'blog.html' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">Automotive Blog</a>
                    <a href="contact.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl ${currentPage === 'contact.html' ? 'bg-voltAmber-500/20 text-voltAmber-500' : 'hover:bg-slate-100 dark:hover:bg-neutral-900'}">Contact & Support</a>
                    <a href="dashboard.html" class="block font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl ${currentPage === 'dashboard.html' ? 'bg-voltAmber-500 text-slate-950' : ''}">Dashboard</a>
                    <div class="pt-4 border-t border-slate-200 dark:border-neutral-800">
                        <a href="login.html" class="block text-center bg-voltAmber-500 hover:bg-voltAmber-600 text-slate-950 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-md">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </header>`;

        // Re-bind click event handlers for the dynamically injected elements right after setting innerHTML
        const homeDropdownBtn = document.getElementById('homeDropdownBtn');
        const homeDropdownMenu = document.getElementById('homeDropdownMenu');
        const homeChevron = document.getElementById('homeChevron');

        if (homeDropdownBtn && homeDropdownMenu) {
            homeDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                homeDropdownMenu.classList.toggle('hidden');
                if (homeChevron) {
                    homeChevron.classList.toggle('rotate-180');
                }
            });

            document.addEventListener('click', (e) => {
                if (!homeDropdownBtn.contains(e.target) && !homeDropdownMenu.contains(e.target)) {
                    homeDropdownMenu.classList.add('hidden');
                    if (homeChevron) {
                        homeChevron.classList.remove('rotate-180');
                    }
                }
            });
        }

        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileDrawer = document.getElementById('mobileDrawer');
        if (mobileMenuBtn && mobileDrawer) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileDrawer.classList.toggle('hidden');
            });
        }
    }

    // 3. Inject Responsive Footer HTML with Social Icons & Light/Dark Backgrounds
    const footerContainer = document.getElementById('siteFooterContainer');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="bg-slate-100 dark:bg-voltDark-900 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 py-16 text-xs font-semibold transition-colors duration-300">
            <div class="volt-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div class="space-y-4">
                    <div class="flex items-center gap-3 text-slate-900 dark:text-white">
                        <a href="index.html" class="flex items-center gap-3 group shrink-0">
                    <div class="w-10 h-10 rounded-2xl bg-voltAmber-500/10 border border-voltAmber-500/30 flex items-center justify-center text-voltAmber-500 overflow-hidden">
                            <img src="https://cdn-icons-png.flaticon.com/512/6823/6823621.png" alt="brand-logo" class="w-6 h-6 object-contain"/>
                        </div>
                    <div class="flex flex-col leading-none">
                        <span class="text-xl font-black tracking-tight">IonCo</span>
                        <span class="text-[9px] font-black text-voltAmber-500 tracking-widest uppercase mt-0.5">Pro Roadside</span>
                    </div>
                </a>
                    </div>
                    <p class="leading-relaxed text-slate-600 dark:text-slate-400">
                        India's premier on-location car battery delivery, jump-start, and mobile electrical testing network. Guaranteed 30-minute dispatch.
                    </p>
                    <div class="flex items-center gap-3 pt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-white hover:bg-voltAmber-500 hover:text-slate-950 transition-all shadow-sm" aria-label="Facebook">
                            <i class="fa-brands fa-facebook-f text-xs"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-white hover:bg-voltAmber-500 hover:text-slate-950 transition-all shadow-sm" aria-label="Twitter">
                            <i class="fa-brands fa-x-twitter text-xs"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-white hover:bg-voltAmber-500 hover:text-slate-950 transition-all shadow-sm" aria-label="Instagram">
                            <i class="fa-brands fa-instagram text-xs"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-white hover:bg-voltAmber-500 hover:text-slate-950 transition-all shadow-sm" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin-in text-xs"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-[11px]">Quick Links</h4>
                    <ul class="space-y-2.5">
                        <li><a href="index.html" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Consumer Portal</a></li>
                        <li><a href="home2.html" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Fleet SaaS</a></li>
                        <li><a href="services.html" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Services & Modalities</a></li>
                        <li><a href="pricing.html" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Pricing & Core Exchange</a></li>
                        <li><a href="dashboard.html" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Customer Dashboard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-[11px]">Roadside Services</h4>
                    <ul class="space-y-2.5">
                        <li><a href="services.html#jump_start" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Emergency Jump-Start</a></li>
                        <li><a href="services.html#battery_swap" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Doorstep Battery Swap</a></li>
                        <li><a href="services.html#alternator_test" class="hover:text-voltAmber-600 dark:hover:text-voltAmber-400 transition-colors">Alternator & Starter Load Testing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-[11px]">Emergency Dispatch</h4>
                    <p class="mb-2 text-slate-900 dark:text-white font-bold">Emergency Helpline: 112 / (555) 999-BOLT</p>
                    <p class="text-slate-600 dark:text-slate-400">Email: dispatch@IonCo.in</p>
                    <p class="mt-4 text-voltAmber-600 dark:text-voltAmber-400 font-mono font-bold">24/7 Active Mobile Vans</p>
                </div>
            </div>
            <div class="volt-container pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 gap-4">
                <p>&copy; 2026 IonCo Roadside Services India. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="privacy.html" class="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                    <a href="terms.html" class="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>`;
    }

    // 4. Global Interactive Controllers (Theme & RTL persistence across the entire site)
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggleBtn.innerHTML = `<span class="material-symbols-outlined text-sm">${isDark ? 'light_mode' : 'dark_mode'}</span>`;
        });
    }

    const rtlToggleBtn = document.getElementById('rtlToggle');
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentIsRtl = htmlElement.getAttribute('dir') === 'rtl';
            const newDir = currentIsRtl ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            rtlToggleBtn.textContent = newDir === 'rtl' ? '→ RTL' : '← LTR';
        });
    }

    // Intersection Observer for scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
});


// Global 404 redirection guard for broken internal links
window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('404')) {
        window.location.href = '404.html';
    }
});``