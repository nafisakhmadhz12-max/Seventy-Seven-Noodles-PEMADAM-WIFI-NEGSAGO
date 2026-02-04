// ========== DATA MENU ==========
        const menuData = [
            { id:1, name:"Shoyu Ramen", price:45000, desc:"Kaldu ayam dengan kecap shoyu autentik, dilengkapi chashu, telur rebus, dan nori.", img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"original" },
            { id:2, name:"Spicy Miso Ramen", price:50000, desc:"Kaldu pedas dengan pasta miso spesial, daging cincang, jagung manis, dan daun bawang.", img:"https://images.unsplash.com/photo-1617421753170-46511b8d578c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"spicy" },
            { id:3, name:"Tonkotsu Ramen", price:55000, desc:"Kaldu tulang babi kental yang dimasak 12 jam, chashu, jamur, telur setengah matang.", img:"https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"original" },
            { id:4, name:"Vegetarian Ramen", price:40000, desc:"Kaldu jamur shiitake yang gurih, tofu, sayuran segar, nori, dan wijen.", img:"https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"veggie" },
            { id:5, name:"Black Garlic Ramen", price:58000, desc:"Minyak bawang putih hitam aromatik, chashu tebal, jamur, telur asin, daun bawang.", img:"https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"original" },
            { id:6, name:"Vegan Miso Ramen", price:44000, desc:"Kaldu sayuran dengan miso merah, berbagai sayuran musiman, tofu goreng, dan nori.", img:"https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"veggie" },
            { id:7, name:"Chicken Paitan Ramen", price:52000, desc:"Kaldu ayam putih yang creamy, ayam panggang, jagung, bamboo shoot, dan nori.", img:"https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"original" },
            { id:8, name:"Extra Spicy Ramen", price:53000, desc:"Level pedas maksimal dengan cabai khas Jepang, daging cincang, telur, dan sayuran.", img:"https://images.unsplash.com/photo-1630840621303-9148a7b1d7b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", cat:"spicy" }
        ];

        // ========== VARIABEL & ELEMEN ==========
        let cartCount = 0;
        const menuGrid = document.getElementById('menuGrid');
        const cartCountEl = document.getElementById('cartCount');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // ========== TAMPILKAN MENU ==========
        function displayMenu(filter = 'all') {
            menuGrid.innerHTML = '';
            const filtered = filter === 'all' ? menuData : menuData.filter(item => item.cat === filter);
            
            filtered.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'menu-item';
                div.style.animationDelay = `${index * 0.1}s`;
                div.innerHTML = `
                    <div class="menu-item-img">
                        <img src="${item.img}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="menu-item-content">
                        <div class="menu-item-title">
                            <h3>${item.name}</h3>
                            <span class="price">Rp ${item.price.toLocaleString('id-ID')}</span>
                        </div>
                        <p>${item.desc}</p>
                        <button class="add-btn" onclick="addToCart(${item.id})">+ Tambah ke Keranjang</button>
                    </div>
                `;
                menuGrid.appendChild(div);
            });
        }

        // ========== FILTER MENU ==========
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                displayMenu(this.dataset.filter);
            });
        });

        // ========== FUNGSI KERANJANG ==========
        function addToCart(itemId) {
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Animasi tombol keranjang
            cartCountEl.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountEl.style.transform = 'scale(1)';
            }, 300);
            
            // Ambil nama item yang ditambahkan
            const item = menuData.find(i => i.id === itemId);
            
            // Tampilkan notifikasi
            showNotification(`${item.name} ditambahkan ke keranjang!`);
        }

        // ========== NOTIFIKASI ==========
        function showNotification(message) {
            // Cek apakah sudah ada notifikasi
            let notification = document.querySelector('.notification');
            if (notification) {
                notification.remove();
            }
            
            // Buat elemen notifikasi baru
            notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <span>${message}</span>
                <button onclick="this.parentElement.remove()">×</button>
            `;
            
            // Styling notifikasi
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--primary);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 9999;
                animation: fadeInUp 0.3s ease;
                min-width: 300px;
            `;
            
            notification.querySelector('button').style.cssText = `
                background: transparent;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                margin-left: 15px;
            `;
            
            document.body.appendChild(notification);
            
            // Hapus notifikasi setelah 3 detik
            setTimeout(() => {
                if (notification && notification.parentElement) {
                    notification.remove();
                }
            }, 3000);
        }

        // ========== ANIMASI SCROLL UNTUK HEADER ==========
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }
        });

        // ========== INISIALISASI ==========
        document.addEventListener('DOMContentLoaded', () => {
            displayMenu(); // Tampilkan semua menu awal
            
            // Tambahkan animasi hover pada logo
            const logoImg = document.querySelector('.logo-img');
            logoImg.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
            });
            logoImg.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Animasi untuk elemen saat scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observasi semua menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                observer.observe(item);
            });
        });