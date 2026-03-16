const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());

// Mutable news data
let news = [
    {
        id: 1,
        title: "IMO 환경 규제 강화: 탄소 집약도 지수(CII) 본격화",
        summary: "국제해사기구(IMO)의 탄소 배출 규제가 강화됨에 따라 해운사들의 친환경 선박 전환 속도가 빨라지고 있습니다. 새로운 CII 등급 제도가 선박 가치에 미치는 영향 분석.",
        image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop",
        link: "https://www.imo.org",
        source: "Maritime News",
        date: "2024-03-15",
        category: "Shipping"
    },
    {
        id: 2,
        title: "LNG 추진선 수요 급증... 국내 조선업계 수주 호황",
        summary: "친환경 연료 선박에 대한 글로벌 수요가 늘어나며 한국 조선사들이 LNG 운반선 및 추진선 수주를 독식하고 있습니다. K-조선의 기술 경쟁력 조명.",
        image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1000&auto=format&fit=crop",
        link: "https://www.kdnd.co.kr",
        source: "Shipbuilding Times",
        date: "2024-03-14",
        category: "Shipbuilding"
    },
    {
        id: 3,
        title: "자율운항 선박 실증 성공... 해운 IT의 미래",
        summary: "해상에서 인공지능(AI) 기반의 자율운항 기술이 성공적으로 실증되었습니다. 선원 부족 문제 해결과 안전 운항의 획기적인 전환점 예상.",
        image: "https://images.unsplash.com/photo-1567427018141-0584f1bcd1b3?q=80&w=1000&auto=format&fit=crop",
        link: "https://www.maritimeit.com",
        source: "Tech Marine",
        date: "2024-03-13",
        category: "IT"
    },
    {
        id: 4,
        title: "EU ETS 해운 분야 적용... 탄소 비용 부담 현실화",
        summary: "유럽연합의 탄소배출권거래제(EU ETS)가 해운 분야로 확대 적용되면서 해운사들의 운영 비용 부담이 커지고 있습니다. 향후 대응 전략 분석.",
        image: "https://images.unsplash.com/photo-1517482754388-7e793917865c?q=80&w=1000&auto=format&fit=crop",
        link: "https://ec.europa.eu",
        source: "EU Report",
        date: "2024-03-12",
        category: "Shipping"
    },
    {
        id: 5,
        title: "스마트 항만 구축 가속화... 물류 혁신의 핵심",
        summary: "자동화 터미널과 IoT 기술이 결합된 스마트 항만이 전 세계적으로 확산되고 있습니다. 항만 효율성 증대와 탄소 배출 감소 효과 기대.",
        image: "https://images.unsplash.com/photo-1521733912148-5bc8e36706e2?q=80&w=1000&auto=format&fit=crop",
        link: "https://www.portofrotterdam.com",
        source: "Logistics Weekly",
        date: "2024-03-11",
        category: "IT"
    }
];

// Sidebar Menu Items
let menuItems = [
    { id: 'co-fleeter', name: 'Co-Fleeter', link: 'https://cofleeter.com' },
    { id: 'marine-market', name: 'Marine Market', link: 'https://marinemarket.com' },
    { id: 'shipping', name: '해운 (Shipping)', link: '#' },
    { id: 'it', name: 'IT', link: '#' },
    { id: 'shipbuilding', name: '조선 (Shipbuilding)', link: '#' }
];

// Admin Credentials
const ADMIN_USER = {
    email: "badaroadmin@badaro.com",
    password: "1234"
};

// Auth Middleware (Simplified for demo)
const adminOnly = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "Basic AdminToken") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        res.json({ token: "Basic AdminToken", user: { email: ADMIN_USER.email, role: "admin" } });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

app.get('/api/news', (req, res) => {
    res.json(news);
});

app.get('/api/news/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : "";
    const filteredNews = news.filter(n => 
        n.title.toLowerCase().includes(query) || 
        n.summary.toLowerCase().includes(query)
    );
    res.json(filteredNews);
});

// Admin CRUD Operations
app.post('/api/news', adminOnly, (req, res) => {
    const newPost = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString().split('T')[0]
    };
    news.unshift(newPost);
    res.status(201).json(newPost);
});

app.put('/api/news/:id', adminOnly, (req, res) => {
    const id = parseInt(req.params.id);
    const index = news.findIndex(n => n.id === id);
    if (index !== -1) {
        news[index] = { ...news[index], ...req.body };
        res.json(news[index]);
    } else {
        res.status(404).json({ message: "News not found" });
    }
});

app.delete('/api/news/:id', adminOnly, (req, res) => {
    const id = parseInt(req.params.id);
    news = news.filter(n => n.id !== id);
    res.json({ message: "Deleted successfully" });
});

// Menu Management Endpoints
app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

app.put('/api/menu', adminOnly, (req, res) => {
    const updatedMenu = req.body;
    if (Array.isArray(updatedMenu)) {
        menuItems = updatedMenu;
        res.json(menuItems);
    } else {
        res.status(400).json({ message: "Invalid data format" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
