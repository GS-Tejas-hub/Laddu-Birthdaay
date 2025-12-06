import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import './MonkeysTimeline.css';

const TIMELINE_DATA = [
    {
        id: 1,
        date: '3 Dec 2022',
        time: 'Sat, 17:57 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20221203-WA0084.jpg',
                description: 'idhi lib lo anukonta kadhaa 📚✨'
            }
        ]
    },
    {
        id: 2,
        date: '6 Dec 2022',
        time: 'Tue, 15:04 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800,a_90/https://ladduu-birthday.vercel.app/MyMonkeys/1670319250338.jpg',
                description: "it was Prdha's birthday remember...? neeku gurthu le ante Prasoona ni adugu aameki gurthu untundi 🎂🎉"
            }
        ]
    },
    {
        id: 3,
        date: '15 Dec 2022',
        time: 'Thu, 17:24 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20221215172446.jpg',
                description: 'Idhi nee birthday telusaaa... nee first birthday, engineering life lo and mana kallage lo 🎂🎓💕'
            }
        ]
    },
    {
        id: 4,
        date: '5 Jan 2023',
        time: 'Thu, 09:43 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20230105-WA0002%20(2).jpg',
                description: 'gundu gundu Padduuu... Ig ee photo Deepika teesindhi laa ? 🍬😍'
            }
        ]
    },
    {
        id: 5,
        date: '14 Apr 2023',
        time: 'Fri, 16:22 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800,a_90/https://ladduu-birthday.vercel.app/MyMonkeys/Snapchat-752444410.jpg',
                description: 'aaroju manam eh movie ki vellamo cheppu choodhammm.... 🎬🍿'
            }
        ]
    },
    {
        id: 6,
        date: '24 May 2023',
        time: 'Wed, 16:59 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230524165923.jpg',
                description: 'Idhi gurthu unda mann... dwarga dwarga photos teeskoni Teju vellali ani vellipoyindhi laa 📸😂'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230524171350.jpg',
                description: ''
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230524170106.jpg',
                description: ''
            }
        ]
    },
    {
        id: 7,
        date: '5 Jun 2023',
        time: 'Mon, 15:18 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230605151854.jpg',
                description: 'Meeru first time veldam ani plan vesi nappudu raale telusaa.... idhi malli meetho vellinappudu 🚶‍♀️💭'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230605154421.jpg',
                description: 'Boating vellam laaa,,,, 🚤💦'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230605160735.jpg',
                description: 'paathiyaa photography skillss 📷✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20230605-WA0001.jpg',
                description: ''
            }
        ]
    },
    {
        id: 8,
        date: '12 Jun 2023',
        time: 'Mon, 16:48 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20230612-WA0007.jpg',
                description: 'Leva daniki entha khastamoo mana Laddu ki 😴😂'
            }
        ]
    },
    {
        id: 9,
        date: '26 Jun 2023',
        time: 'Mon, 12:57 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20230626-WA0002.jpg',
                description: 'Aaroju paiki poi Ekalavya platform lo exam raasam gurthu undaa.... Ilanti photos anni Dhanush teestadu... 📝🏢'
            }
        ]
    },
    {
        id: 10,
        date: '4 Aug 2023',
        time: 'Fri, 18:22 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230804182249.jpg',
                description: 'Aaroju nuv antunde Deepika tho okka photo kuda ledu ani... appudu teesa nenu idhi.... Ig manam truth or dare aadindhi same day anukonta laa... 🎮💭'
            }
        ]
    },
    {
        id: 11,
        date: '12 Aug 2023',
        time: 'Date Unknown',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20230812-WA0016%20(1).jpg',
                description: 'Cutiee patutiee Laduuu padduuu 🥰💕'
            }
        ]
    },
    {
        id: 12,
        date: '27 Aug 2023',
        time: 'Sun, 14:35 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230827143544.jpg',
                description: 'Idhi Jayanth birthday appudu Lalbagh ki vellinappudu laaa... 🌺🎂'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20230827153912.jpg',
                description: 'nilchukoni unna maa height leru kadha ra meeru 😂📏'
            }
        ]
    },
    {
        id: 13,
        date: '29 Aug 2023',
        time: 'Tue, 12:02 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG_20240115_175606.jpg',
                description: 'Parsoona birthday ki.... 🎉🎂'
            }
        ]
    },
    {
        id: 14,
        date: '29 Oct 2023',
        time: 'Sun, 16:22 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20231029162236.jpg',
                description: 'Santrupthi ki vellam laa aroju idhi 🍽️✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20231029162129.jpg',
                description: 'Nuv irritated unte full cute untav raa 😂😂😂'
            }
        ]
    },
    {
        id: 15,
        date: '25 Nov 2023',
        time: 'Sat, 23:19 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20231125-WA0022%20(1).jpg',
                description: "Nenu lekundaa enjoy chesar laaa meeru antha... aina video call chesi andhari outfits choopinchinanduku Thanks ra... and nuv nee outfit choopinche thappudu drum la unna cylinder laa unna ani cheppav anuko saree lo kodatha ninnu ani arustu unde nuvvu... 🥁😂👗"
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20231127-WA0003.jpg',
                description: 'Choostunna choostunna... nenu lekunda enjoy chestunnav 👀💔'
            }
        ]
    },
    {
        id: 16,
        date: '15 Dec 2023',
        time: 'Fri, 15:42 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/video/upload/f_auto,q_auto/https://ladduu-birthday.vercel.app/MyMonkeys/WhatsApp%20Video%202025-12-06%20at%208.13.41%20PM.mp4',
                isVideo: true,
                description: 'Malli nee birthday ochesindhi choodu mann 🎂🎉'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20231215154257.jpg',
                description: ''
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20231215154620.jpg',
                description: ''
            }
        ]
    },
    {
        id: 17,
        date: '26 Mar 2024',
        time: 'Tue, 09:19 GMT+00:00',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG_20241122_22330880.jpeg',
                description: 'Evado naaku chepthu unde... putti manchi pani chesav ani... 😊✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240326144939.jpg',
                description: 'Nee ugly photo dorikithe naaku jollyyy 😂📸'
            }
        ]
    },
    {
        id: 18,
        date: '5 Jun 2024',
        time: 'Wed, 16:11 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20240605-WA0091.jpg',
                description: 'Idhi Dhanusha Birthday... Pinky fellow 💗🎂'
            }
        ]
    },
    {
        id: 19,
        date: '27 Aug 2024',
        time: 'Tue, 14:59 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240827145950.jpg',
                description: 'idhi Jayanth birthday 🎂🎊'
            }
        ]
    },
    {
        id: 20,
        date: '29 Aug 2024',
        time: 'Thu, 13:27 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240829132754_01.jpg',
                description: 'Malli nee survival kit birthday 🎂💕'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240829182126.jpg',
                description: ''
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240829183318.jpg',
                description: 'Prasoona laagutu unnde ninnu photos teeskondam ani 📸✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240829183252.jpg',
                description: 'Nenu full irritate chestu unde ninnuu.... Nuv vellethappudu antunde Enduku Tejas eeroju over Normal ga unde nuvvu ani... 😤😂'
            }
        ]
    },
    {
        id: 21,
        date: '28 Sept 2024',
        time: 'Sat, 14:24 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20240928142448.jpg',
                description: 'Idhi gurthu undaa raa urike vellesi ocham dheeniki... 🚶‍♂️💭'
            }
        ]
    },
    {
        id: 22,
        date: 'Date Unknown',
        time: 'Idhi eppudu pampinchavo naaku cheppuko choodham',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/unnamed.webp',
                description: 'appudu appudu traditional veskoni manchidhan laaga kanipisthav nuvvu... 🌸✨'
            }
        ]
    },
    {
        id: 23,
        date: '23 Oct 2024',
        time: 'Wed, 20:45 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/Screenshot_2024-10-23-20-45-41-39_40deb401b9ffe8e1df2f1cc5ba480b12.jpg',
                description: 'Idhi aa unstop lo test unde choodu.... adhi gurthu ochindhaa 💻📝'
            }
        ]
    },
    {
        id: 24,
        date: '22 Nov 2024',
        time: 'Fri, 14:43 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20241122-WA0085%20(2).jpg',
                description: 'edo event unde anukonta... appudud teeskonnadhi ivi 🎭✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241122144354.jpg',
                description: ''
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG_20241204_235419%20(1).jpg',
                description: 'Ilanti photos na fav photos telusaa... 📸💕'
            }
        ]
    },
    {
        id: 25,
        date: '8 Dec 2024',
        time: 'Sun, 15:39 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20241208-WA0026%20(1).jpg',
                description: 'Aaroju KFC lo thintunde gurthundaa mann 🍗🍟'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241208164012.jpg',
                description: ''
            }
        ]
    },
    {
        id: 26,
        date: '15 Dec 2024',
        time: 'Sun, 12:40 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241215124044_01.jpg',
                description: 'Arey Laddumannn Malli nee birthdayy ochesindhiiii 🎂🎉🎊'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241215123816.jpg',
                description: 'Birthday cap maathram bale unde raa neeku 🎩✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241215131739.jpg',
                description: 'Full jolley unde laa ra aaroju... First time mana iddariki em godaval undale... iddaram jolley ga unde 😊💕'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241215133020%20(1).jpg',
                description: 'Choosava naa photography skills.. 📷✨'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20241215153042~2%20(1).jpg',
                description: 'Ala inkeppudu na vaipu choodavu kadha inka? Ekkuva ga connect aipoi ekkuva ga premincheyyadame kadha na thappu ? 💔😔'
            }
        ]
    },
    {
        id: 27,
        date: '27 Dec 2024',
        time: 'Fri, 16:15 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/Screenshot_2024-12-27-16-15-53-29_56a5d7f547b7ec4c705e63bf13c9c197.jpg',
                description: 'Nannu odhilesi vellipoyav laa nuvvu... nen chaala feel ayya... ig Keerthi ochadu ani emo naaku telidu... Kani nannu odhilesi vellipoyav 💔😢'
            }
        ]
    },
    {
        id: 28,
        date: '28 Jan 2025',
        time: 'Tue, 19:40 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250128194032.jpg',
                description: 'Ee photo teeskone mundu nannu arichav telusaa nuvvuuu 😤😂'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20250128-WA0019.jpg',
                description: 'Cutiee Ladduu 🥰💕'
            }
        ]
    },
    {
        id: 29,
        date: '26 Feb 2025',
        time: 'Wed, 10:42 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250226104213%20(2).jpg',
                description: 'Going to mysooree 🚗🏔️'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250226115345.jpg',
                description: ''
            }
        ]
    },
    {
        id: 30,
        date: '20 Mar 2025',
        time: 'Thu, 17:51 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250320175140.jpg',
                description: 'Tarangaaa, ee photos nenu veyyatle because my memories section lo unnai 🌊✨'
            }
        ]
    },
    {
        id: 31,
        date: '21 Mar 2025',
        time: 'Fri, 18:12 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250321181255.jpg',
                description: 'Ilanti photos are my fav mann!! 😂😂😂 I\'m sorry, but I love these 😂'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250321181254%20(1).jpg',
                description: ''
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG_20251128_054739.jpg',
                description: '😂😂'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250321182045.jpg',
                description: 'I know neeku full kopam ostundi idhi choosthe, kani ee photo aithe naaku full favv 😂😂'
            },
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG_20251128_054800%20(1).jpg',
                description: '😂😂😂😂'
            }
        ]
    },
    {
        id: 32,
        date: '30 Mar 2025',
        time: 'Sun, 14:17 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG-20250330-WA0127.jpg',
                description: 'edo panduga roju idhi naaku pampav ra... entha cute unde no meeru... nenu dhanni gigbhilify kuda chesi unde gurthu undaa 🎊🥰'
            }
        ]
    },
    {
        id: 33,
        date: '14 Apr 2025',
        time: 'Mon, 13:10 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250414131035.jpg',
                description: 'Awww... aaroju lenskart and movie ki vellinappudu... iddaram entha happy ga manchiga unde Ladduu... ig this will never happen again 💕😢'
            }
        ]
    },
    {
        id: 34,
        date: '16 May 2025',
        time: 'Fri, 15:37 GMT+05:30',
        images: [
            {
                src: 'https://res.cloudinary.com/dyratzal0/image/fetch/f_auto,q_auto,w_800/https://ladduu-birthday.vercel.app/MyMonkeys/IMG20250516153751.jpg',
                description: 'Nuvv Saree loo full cute unde laddumaa... 🥻✨💕'
            }
        ]
    }
];

const MonkeysTimeline = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="monkeys-timeline-section">
            <h2 className="monkeys-title">My Monkeys 🐵💕</h2>
            <p className="monkeys-subtitle">Our journey together through time... 📸✨</p>

            <div className="timeline-container">
                <div className="timeline-line"></div>

                {TIMELINE_DATA.map((item, index) => (
                    <div
                        key={item.id}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="timeline-dot"></div>

                        <div className="timeline-card">
                            <div className="timeline-date-wrapper">
                                <div className="timeline-date">
                                    <Calendar size={16} />
                                    <span>{item.date}</span>
                                </div>
                                <div className="timeline-time">
                                    <Clock size={14} />
                                    <span>{item.time}</span>
                                </div>
                            </div>

                            <div className="timeline-images">
                                {item.images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="timeline-image-wrapper">
                                        {img.isVideo ? (
                                            <video
                                                src={img.src}
                                                controls
                                                className="timeline-video"
                                                preload="metadata"
                                            />
                                        ) : (
                                            <img
                                                src={img.src}
                                                alt={`Memory ${item.id}-${imgIndex}`}
                                                className="timeline-image"
                                                onClick={() => setSelectedImage(img)}
                                                loading="lazy"
                                            />
                                        )}
                                        {img.description && (
                                            <p className="timeline-description">{img.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="timeline-modal" onClick={() => setSelectedImage(null)}>
                    <div className="timeline-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="timeline-modal-close"
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={selectedImage.src}
                            alt="Full size"
                            className="timeline-modal-image"
                        />
                        {selectedImage.description && (
                            <p className="timeline-modal-description">{selectedImage.description}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonkeysTimeline;
