
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
    import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "AIzaSyAlHN3EWZnMOXfa0RNWN6WpE9nrkivACs0",
        authDomain: "cafe-menu-5358e.firebaseapp.com",
        projectId: "cafe-menu-5358e"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    let menuItems = [];
    let currentCategory = null;
    let currentLang = "en";
    let fastMode = false;

    const homeMenuDiv = document.getElementById("homeMenu");
    const categoryPageDiv = document.getElementById("categoryPageMenu");
    const categoryGridEl = document.getElementById("categoryGrid");
    const menuGridEl = document.getElementById("menuGrid");
    const backBtn = document.getElementById("backBtn");
    const searchInput = document.getElementById("searchInput");
    const langSelect = document.getElementById("langSelect");
    const fastToggle = document.getElementById("fastToggle");
    const currentCategoryDisplay = document.getElementById("currentCategoryDisplay");

    const translations = {
        en: {
            homeTitle: "Experience Elegance & Comfort",
            homeSubtitle: "Luxurious rooms, gourmet dining, and unmatched hospitality in the heart of Ethiopia",
            exploreMenu: "Explore Menu",
            contactUs: "Contact Us",
            menuTitle: "Our Digital Menu",
            searchPlaceholder: "Search dishes...",
            fastLabel: "🍃 Fasting menu only",
            backText: "Back to Categories",
            galleryTitle: "Moments at Roseau",
            aboutTitle: "About Roseau",
            aboutText1: "Nestled in a serene landscape, Roseau Hotel & Spa combines timeless elegance with modern comforts. Enjoy beautifully appointed rooms, exceptional service, and a peaceful environment that feels like home away from home.",
            aboutText2: "Founded in 2010, Roseau has become a landmark of hospitality. We take pride in offering world-class spa treatments, breathtaking views, and personalized service.",
            aboutText3: "🏆 Award-winning service | 🌱 Eco-friendly | 🎭 Cultural heritage",
            feature1Title: "Free Wi-Fi",
            feature1Desc: "High-speed internet",
            feature2Title: "Breakfast Included",
            feature2Desc: "Fresh daily buffet",
            feature3Title: "Spa & Wellness",
            feature3Desc: "Relaxation awaits",
            feature4Title: "24/7 Service",
            feature4Desc: "Room service & support",
            quickLinksTitle: "Quick Links",
            contactTitle: "Contact Info",
            hoursTitle: "Opening Hours",
            hoursText: "Sunday - Sunday · 24 / 7",
            alwaysOpen: "Always Open",
            paymentTitle: "Payment Methods"
        },
        am: {
            homeTitle: "ውበት እና ምቾት ተሞክሩ",
            homeSubtitle: "የቅንጦት ክፍሎች፣ ጥሩ ምግብ እና እንግዳ ተቀባይነት",
            exploreMenu: "ምናሌ ያስሱ",
            contactUs: "ያግኙን",
            menuTitle: "ዲጂታል ",
            searchPlaceholder: "ምግቦችን ፈልግ...",
            fastLabel: "🍃 የጾም ምግብ",
            backText: "ወደ ምድቦች ተመለስ",
            galleryTitle: "በሮዞ የሚገኙ አስደሳች ጊዜያት",
            aboutTitle: "ስለ ሮዞ",
            aboutText1: "ሮዞ ሆቴል እና ስፓ ዘመናዊ ምቾትን ከጥንታዊ ውበት ጋር ያጣመረ ነው።",
            aboutText2: "እ.ኤ.አ. በ2010 የተመሰረተው ሮዞ የእንግዳ መቀበያ ምልክት ሆኗል።",
            aboutText3: "🏆 ሽልማት አሸናፊ | 🌱 ለአካባቢ ተስማሚ | 🎭 ባህላዊ ቅርስ",
            feature1Title: "ነጻ ዋይ-ፋይ",
            feature1Desc: "ከፍተኛ ፍጥነት",
            feature2Title: "ቁርስ ተካቷል",
            feature2Desc: "ዕለታዊ ቡፌ",
            feature3Title: "ስፓ እና ደህንነት",
            feature3Desc: "እረፍት ይጠብቅዎታል",
            feature4Title: "24/7 አገልግሎት",
            feature4Desc: "ክፍል አገልግሎት",
            quickLinksTitle: "ፈጣን አገናኞች",
            contactTitle: "የእውቂያ መረጃ",
            hoursTitle: "የስራ ሰዓት",
            hoursText: "እሁድ - እሁድ · 24 / 7",
            alwaysOpen: "ሁልጊዜ ክፍት",
            paymentTitle: "የክፍያ መንገዶች"
        }
    };

    function updateLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        document.getElementById("homeTitle").textContent = t.homeTitle;
        document.getElementById("homeSubtitle").textContent = t.homeSubtitle;
        document.getElementById("exploreMenuBtn").innerHTML = `<i class="fas fa-utensils"></i> ${t.exploreMenu}`;
        document.getElementById("contactUsBtn").innerHTML = `<i class="fas fa-calendar-check"></i> ${t.contactUs}`;
        document.getElementById("menuTitle").textContent = t.menuTitle;
        document.querySelector("#searchInput").placeholder = t.searchPlaceholder;
        document.getElementById("fastLabel").textContent = t.fastLabel;
        document.getElementById("backText").textContent = t.backText;
        document.getElementById("galleryTitle").textContent = t.galleryTitle;
        document.getElementById("aboutTitle").textContent = t.aboutTitle;
        document.getElementById("aboutText1").textContent = t.aboutText1;
        document.getElementById("aboutText2").textContent = t.aboutText2;
        document.getElementById("aboutText3").innerHTML = t.aboutText3;
        document.getElementById("feature1Title").textContent = t.feature1Title;
        document.getElementById("feature1Desc").textContent = t.feature1Desc;
        document.getElementById("feature2Title").textContent = t.feature2Title;
        document.getElementById("feature2Desc").textContent = t.feature2Desc;
        document.getElementById("feature3Title").textContent = t.feature3Title;
        document.getElementById("feature3Desc").textContent = t.feature3Desc;
        document.getElementById("feature4Title").textContent = t.feature4Title;
        document.getElementById("feature4Desc").textContent = t.feature4Desc;
        document.getElementById("quickLinksTitle").textContent = t.quickLinksTitle;
        document.getElementById("contactTitle").textContent = t.contactTitle;
        document.getElementById("hoursTitle").textContent = t.hoursTitle;
        document.getElementById("hoursText").innerHTML = t.hoursText;
        document.getElementById("alwaysOpen").textContent = t.alwaysOpen;
        document.getElementById("paymentTitle").textContent = t.paymentTitle;
        if (currentCategory) renderMenuItems();
        renderGallery();
    }

    const galleryImages = [
        { img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format", title: "Luxury Suite", titleAm: "የቅንጦት ስብስብ" },
        { img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format", title: "Fine Dining", titleAm: "ጥሩ ምግብ" },
        { img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format", title: "Spa & Relax", titleAm: "ስፓ እና ዘና" },
        { img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format", title: "Infinity Pool", titleAm: "ኢንፊኒቲ ገንዳ" }
    ];
    
    function renderGallery() {
        const galleryGrid = document.getElementById("galleryGrid");
        if(galleryGrid) {
            galleryGrid.innerHTML = galleryImages.map(img => `
                <div class="gallery-card">
                    <div class="gallery-img" style="background-image: url('${img.img}');"></div>
                    <div class="caption">${currentLang === 'am' ? img.titleAm : img.title}</div>
                </div>
            `).join('');
        }
    }

    onSnapshot(collection(db, "menu"), (snapshot) => {
        menuItems = [];
        snapshot.forEach(doc => {
            const d = doc.data();
            if (d.active === false) return;
            menuItems.push({
                category: d.category?.toLowerCase() || "other",
                name: d.name,
                desc: d.desc,
                price: d.price,
                img: d.img || "default.jpg",
                amName: d.amName || d.name,
                amDesc: d.amDesc || d.desc,
                fastAllowed: !!d.fastAllowed
            });
        });
        renderHomeMenu();
    });

    function renderHomeMenu() {
        if(!categoryGridEl) return;
        const categories = [...new Set(menuItems.map(i => i.category))];
        categoryGridEl.innerHTML = "";
        categories.forEach(cat => {
            const firstItem = menuItems.find(i => i.category === cat);
            const imgUrl = firstItem?.img && firstItem.img !== 'default.jpg' ? `images/${firstItem.img}` : 'https://placehold.co/400x240/2c423d/d4af37?text=Roseau';
            const card = document.createElement("div");
            card.className = "category-card";
            card.innerHTML = `<img src="${imgUrl}" onerror="this.src='https://placehold.co/400x240/2c423d/d4af37?text=Menu'"><span>${cat.toUpperCase()}</span>`;
            card.onclick = () => openCategory(cat);
            categoryGridEl.appendChild(card);
        });
    }

    function openCategory(cat) {
        currentCategory = cat;
        homeMenuDiv.classList.remove("active");
        categoryPageDiv.classList.add("active");
        backBtn.style.display = "flex";
        const displayName = cat.toUpperCase();
        currentCategoryDisplay.textContent = displayName;
        renderMenuItems();
    }

    backBtn.onclick = () => {
        categoryPageDiv.classList.remove("active");
        homeMenuDiv.classList.add("active");
        backBtn.style.display = "none";
        searchInput.value = "";
        currentCategory = null;
        currentCategoryDisplay.textContent = "Select Category";
    };

    function renderMenuItems() {
        if(!menuGridEl) return;
        menuGridEl.innerHTML = "";
        const term = searchInput.value.toLowerCase();
        const filteredItems = menuItems.filter(item => {
            if (item.category !== currentCategory) return false;
            if (fastMode && !item.fastAllowed) return false;
            const title = currentLang === "am" ? item.amName : item.name;
            if (term && !title.toLowerCase().includes(term)) return false;
            return true;
        });
        
        filteredItems.forEach(item => {
            const title = currentLang === "am" ? item.amName : item.name;
            const desc = currentLang === "am" ? item.amDesc : item.desc;
            const imgSrc = (item.img && item.img !== "default.jpg") ? `images/${item.img}` : 'https://placehold.co/400x300/2c423d/d4af37?text=Roseau';
            const card = document.createElement("div");
            card.className = "menu-card";
            card.innerHTML = `
                <img src="${imgSrc}" onerror="this.src='https://placehold.co/400x300/2c423d/d4af37?text=Dish'">
                <div class="card-content">
                    <h3>${escapeHtml(title)}</h3>
                    <p>${escapeHtml(desc || "Delicious taste")}</p>
                    <div class="price">${item.price} Birr</div>
                </div>
            `;
            menuGridEl.appendChild(card);
        });
        if (filteredItems.length === 0) menuGridEl.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">✨ No dishes match ✨</div>';
    }

    function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m])); }

    if(searchInput) searchInput.addEventListener("input", () => { if (currentCategory) renderMenuItems(); });
    if(fastToggle) fastToggle.addEventListener("change", (e) => { fastMode = e.target.checked; if (currentCategory) renderMenuItems(); });
    if(langSelect) langSelect.addEventListener("change", (e) => { updateLanguage(e.target.value); if (currentCategory) renderMenuItems(); });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
            if (langSelect) langSelect.value = lang;
            if (currentCategory) renderMenuItems();
        });
    });

    const sections = ['home', 'menu', 'gallery', 'about-footer', 'contact'];
    const navLinks = document.querySelectorAll('[data-section]');
    
    function setActiveNav(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('data-section') === sectionId) link.classList.add('active');
        });
    }

    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if(element) {
            const offset = 80;
            const offsetPosition = element.offsetTop - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveNav(sectionId);
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    }

    document.querySelectorAll('[data-section]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const section = el.getAttribute('data-section');
            if(section) scrollToSection(section);
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        for(let s of sections) {
            const sec = document.getElementById(s);
            if(sec && scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) current = s;
        }
        if(current) setActiveNav(current);
        const nav = document.querySelector('nav');
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    document.querySelector('.hamburger')?.addEventListener('click', () => {
        document.querySelector('.nav-links')?.classList.toggle('active');
    });

    setTimeout(() => {
        homeMenuDiv.classList.add("active");
        categoryPageDiv.classList.remove("active");
        backBtn.style.display = "none";
        renderGallery();
        updateLanguage('en');
    }, 100);
