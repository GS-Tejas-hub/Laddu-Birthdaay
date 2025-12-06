import React from 'react';
import { useNavigate } from 'react-router-dom';
import SphereGallery from '../components/SphereGallery';
import MarqueeGallery from '../components/MarqueeGallery';
import MonkeysTimeline from '../components/MonkeysTimeline';
import { ArrowLeft } from 'lucide-react';
import './GalleryPage.css';

// Personal birthday photos with Cloudinary fetch optimization
const BIRTHDAY_IMAGES = [
    {
        id: 'img-1',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG_20230612_182744.jpg',
        alt: 'Kutty Donga',
        title: 'Kutty Donga 🤭',
        description: 'Ehhh fitting pettesaaa 😎✨'
    },
    {
        id: 'img-2',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG_20230612_182804.jpg',
        alt: 'Beginer Kalli',
        title: 'Beginer Kalli 👀',
        description: 'Choosavaa... 😏'
    },
    {
        id: 'img-3',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG_20241204_235419.jpg',
        alt: 'Ughhh',
        title: 'Ughhh... 😤',
        description: 'I had enoughh 😩💢'
    },
    {
        id: 'img-4',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG_20250704_213957.jpg',
        alt: 'Ayyayyooo',
        title: 'Ayyayyooo 😱',
        description: 'weight undi ra eemee 🐷😂'
    },
    {
        id: 'img-5',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG_20251109_130107.jpg',
        alt: 'Shadow pain',
        title: 'Shadow pain 🖤',
        description: '😔💔'
    },
    {
        id: 'img-6',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG_20251128_054800.jpg',
        alt: 'Ahhhhh',
        title: 'Ahhhhh... 😋',
        description: 'Aakaliiii 🍕🍔🤤'
    },
    {
        id: 'img-7',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG-20230105-WA0002.jpg',
        alt: 'Gundu Gundu',
        title: 'Gundu Gundu 🍬',
        description: 'Gulab jaaam 🍰😍'
    },
    {
        id: 'img-8',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG-20230812-WA0016.jpg',
        alt: 'Chinni Ponnu',
        title: 'Chinni Ponnu 👧',
        description: 'Ladduuuuu... 🍭💕'
    },
    {
        id: 'img-9',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG-20241122-WA0085.jpg',
        alt: 'Photography skills',
        title: 'Photography skills 📷',
        description: 'by Jayanth ✨🎨'
    },
    {
        id: 'img-10',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG-20250330-WA0152.jpg',
        alt: 'Festive vibes',
        title: 'Festive vibes 🎊',
        description: '✨🎉💫'
    },
    {
        id: 'img-11',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG-20250330-WA0153.jpg',
        alt: 'Festive vibes',
        title: 'Festive vibes 🎊',
        description: '✨🎉💫'
    },
    {
        id: 'img-12',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20221215171752.jpg',
        alt: '1st Birthday In Engineering',
        title: 'My 1st Birthday 🎂',
        description: 'In engineeering Life.... Photi by Demonsii 📸🎓'
    },
    {
        id: 'img-13',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20230616135711.jpg',
        alt: 'Donga boi Ladduu',
        title: 'Donga boi 😈',
        description: 'Ladduu 🍬💛'
    },
    {
        id: 'img-14',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20230616135741.jpg',
        alt: 'Sweet little Laddu',
        title: 'Sweet little 🥰',
        description: 'Laddu Padduuu.... 🍭💕'
    },
    {
        id: 'img-15',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20230804182125%20(1).jpg',
        alt: 'Photo clicks near Quadrangle',
        title: 'Photo clicks 📸',
        description: 'near Quadrangle by Demon 🎭✨'
    },
    {
        id: 'img-16',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20230804182125.jpg',
        alt: 'close up shot',
        title: 'Choosava Laddu 👀',
        description: 'na skils, idhi close up shot 📷🔥'
    },
    {
        id: 'img-17',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20230804182202.jpg',
        alt: 'Ahhh',
        title: 'Ahhh... 😌',
        description: 'Jolleyyy 🎉😄'
    },
    {
        id: 'img-18',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20230827152248.jpg',
        alt: 'Photo teekone mood',
        title: 'Aaroju photo teekone mood le.. 📸',
        description: 'aina odhal le ee Tejas mendal 😤😂'
    },
    {
        id: 'img-19',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20231215160201.jpg',
        alt: 'Ehh cake',
        title: 'Ehh cake 🎂',
        description: 'ivvuuu.... 🍰😋'
    },
    {
        id: 'img-20',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215105105.jpg',
        alt: 'Okka photo',
        title: 'Nen sarigga ekkuva sepu nilapadalenu 😅',
        description: 'photos kis... so Okka photo, okke okka photo manchiga teesthe chaalu ra Demon 📸💯'
    },
    {
        id: 'img-21',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215123707.jpg',
        alt: 'Birthday cap',
        title: 'Ehhh kalli nenu... 👑',
        description: 'Birthday cap naadhi... 🎉🎈'
    },
    {
        id: 'img-22',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215123728.jpg',
        alt: 'Hehehe',
        title: 'Hehehe 😁',
        description: '😄😊🤭'
    },
    {
        id: 'img-23',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215130919.jpg',
        alt: 'Ehh photo',
        title: 'Ehh photo 📸',
        description: 'theeya kandraa urikee 😎✨'
    },
    {
        id: 'img-24',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215130929.jpg',
        alt: 'Heeee',
        title: 'Heeee 😄',
        description: '😁🎉✨'
    },
    {
        id: 'img-25',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215133020.jpg',
        alt: 'Life lo',
        title: 'Life lo Demonsii lekapothe 🤷',
        description: 'entha haayii ga undedhanno 😂💔'
    },
    {
        id: 'img-26',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215152629.jpg?v=2',
        alt: 'Venakala pyramid',
        title: 'Venakala full pyramid 🔺',
        description: 'raavali sare naa 😎✨'
    },
    {
        id: 'img-27',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215153042~2.jpg',
        alt: 'This Boiii',
        title: 'Ummm This Boiii... 🤔',
        description: 'Sometimes Good sometimes bad! 😇😈'
    },
    {
        id: 'img-28',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320172746.jpg',
        alt: 'Queen',
        title: 'Hehe nenu 👑',
        description: 'Queen 💅✨'
    },
    {
        id: 'img-29',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173028.jpg',
        alt: 'Woohooo',
        title: 'Woohooo... 🎉',
        description: 'Idhi dhan pose 💃✨'
    },
    {
        id: 'img-30',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173042.jpg',
        alt: 'em pose',
        title: 'arey em pose 🤔',
        description: 'ivvalo cheppandi ra... 😅🙏'
    },
    {
        id: 'img-31',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173044%20(1).jpg',
        alt: 'em Jayanthhh',
        title: 'Hahahaha... 😂',
        description: 'em Jayanthhh... 🤣💀'
    },
    {
        id: 'img-32',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173046.jpg',
        alt: 'adhi entha bagundoo',
        title: 'Ehh adhi 😍',
        description: 'entha bagundoo ✨💫'
    },
    {
        id: 'img-33',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173113.jpg',
        alt: 'Black and white',
        title: 'Black and white loo kuda 🖤',
        description: 'nene best 😎💯'
    },
    {
        id: 'img-34',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173302_BURST001.jpg',
        alt: 'round round',
        title: 'Eh Demon Mendal 😤',
        description: 'nenu round round thirugutha Photo theeyali sare naa... 🔄📸'
    },
    {
        id: 'img-35',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173302_BURST003.jpg',
        alt: 'round round',
        title: 'Eh Demon Mendal 😤',
        description: 'nenu round round thirugutha Photo theeyali sare naa... 🔄📸'
    },
    {
        id: 'img-36',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173302_BURST004.jpg',
        alt: 'round round',
        title: 'Eh Demon Mendal 😤',
        description: 'nenu round round thirugutha Photo theeyali sare naa... 🔄📸'
    },
    {
        id: 'img-37',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173302_BURST012.jpg',
        alt: 'round round',
        title: 'Eh Demon Mendal 😤',
        description: 'nenu round round thirugutha Photo theeyali sare naa... 🔄📸'
    },
    {
        id: 'img-38',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250320173302_BURST019.jpg',
        alt: 'round round',
        title: 'Eh Demon Mendal 😤',
        description: 'nenu round round thirugutha Photo theeyali sare naa... 🔄📸'
    },
    {
        id: 'img-39',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250321181150.jpg',
        alt: 'dwaraga Photo',
        title: 'Ehh dwaraga Photo 🙏',
        description: 'theeyandra nenu aaduthu unta lekapothe.... 🎮😂'
    },
    {
        id: 'img-40',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250321181254.jpg',
        alt: 'hair ethi',
        title: 'Ehh Ila hair ethi 💇',
        description: 'vestha nuv photo thee Sare na 📸✨'
    },
    {
        id: 'img-41',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250321181422.jpg',
        alt: 'Serious ga',
        title: 'Eeee demonsii Mendal gaadu 😠',
        description: 'Serious ga kindaki choodamannadu.. Pichi veediki 🤦😂'
    },
    {
        id: 'img-42',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516143621.jpg',
        alt: 'Enduk ra',
        title: 'Enduk ra nannu 😤',
        description: 'Eppudu edo okati antu untav 😑💢'
    },
    {
        id: 'img-43',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516144814.jpg',
        alt: 'Kottali',
        title: 'Kottali ra 💢',
        description: 'veedini... 😤👊'
    },
    {
        id: 'img-44',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516145124.jpg',
        alt: 'Photos bale',
        title: 'Ehhehee 😁',
        description: 'Photos bale ochai 📸✨'
    },
    {
        id: 'img-45',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516154530.jpg',
        alt: 'Prasuu makeup',
        title: 'Enti Prasuu naa makeup ki 😍',
        description: 'aypoyav Survival nunchi 💄✨'
    },
    {
        id: 'img-46',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516154648.jpg',
        alt: 'natural ga',
        title: 'Arey mee amma phone oddu 📱',
        description: 'nee phone lo nunchi thee, natural ga ostai Photos 📸💯'
    },
    {
        id: 'img-47',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516173004.jpg',
        alt: 'message',
        title: 'Evado message 📱',
        description: 'pettadu undu ra... 💬😏'
    },
    {
        id: 'img-48',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250516173031.jpg',
        alt: 'urike unduu',
        title: 'Ehh demonnn 😤',
        description: 'urike unduu raa ... ilanti photos theeyakuuu 📸🚫'
    },
    {
        id: 'img-49',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20250806172129.jpg',
        alt: 'Chandapura',
        title: 'Veedu okkadu... 🙄',
        description: 'Urike ochestadu Chandapura Chandapura antuu 🤦😂'
    },
    {
        id: 'img-50',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215131957.jpg',
        alt: 'Jollyyyyyy',
        title: 'Jollyyyyyy... 🎉',
        description: 'Chaala happy ga undi ra... Fly fly auvthunna nenuu... 🦋✨😄'
    },
    {
        id: 'img-51',
        src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_600/https://ladduu-birthday.vercel.app/images/IMG20241215132135.jpg',
        alt: 'Prasoona swing',
        title: 'Ehh Prasoona.. 👯',
        description: 'Ehh ee swing bale undi... ahh chinna pllalu manalne choostunnaru veellaki picha enti ani,,, 🤪😂🎠'
    }
];

const GalleryPage = () => {
    const navigate = useNavigate();

    return (
        <div className="gallery-page">
            <button className="gallery-back-button" onClick={() => navigate('/')}>
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="gallery-page-content">
                <h1 className="gallery-page-title">My sweet Memories 🎂</h1>
                <p className="gallery-page-subtitle">Drag to rotate • Click any photo to view</p>

                <div className="gallery-page-sphere">
                    <SphereGallery
                        images={BIRTHDAY_IMAGES}
                        containerSize={Math.min(600, window.innerWidth - 40)}
                        sphereRadius={200}
                        dragSensitivity={0.8}
                        momentumDecay={0.96}
                        maxRotationSpeed={6}
                        baseImageScale={0.15}
                        hoverScale={1.3}
                        perspective={1000}
                        autoRotate={true}
                        autoRotateSpeed={0.2}
                    />
                </div>
            </div>

            {/* Marquee Gallery Section */}
            <MarqueeGallery images={BIRTHDAY_IMAGES} />

            {/* My Monkeys Timeline Section */}
            <MonkeysTimeline />
        </div>
    );
};

export default GalleryPage;
