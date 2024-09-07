exports.exampleFlex = (location) => {
    const places = [
        {
            name: "พระธาตุพนมวรมหาวิหาร",
            image: "https://cms.dmpcdn.com/travel/2020/08/11/bf31c5c0-db9d-11ea-8433-c5d4d14f3a3c_original.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/8/data.html"
        },
        {
            name: "พญาศรีสัตตนาคราช",
            image: "https://cms.dmpcdn.com/travel/2021/11/22/7bf9f420-4b78-11ec-b308-8513ea472177_webp_original.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/9/data.html"
        },
        {
            name: "พระธาตุเรณู",
            image: "https://pukmudmuangthai.com/wp-content/uploads/2021/07/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B9%E0%B9%80%E0%B8%A3%E0%B8%93%E0%B8%B9.png",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/1/data.html"
        },
        {
            name: "สะพานมิตรภาพ 3",
            image: "https://cms.dmpcdn.com/travel/2021/09/19/cfc3e5e0-1921-11ec-aad2-cf80f6e9833e_webp_original.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/10/data.html"
        },
        {
            name: "ถ้ำนาคี",
            image: "https://cms.dmpcdn.com/travel/2021/11/25/e4806660-4da7-11ec-8b9f-c1e628abd1ff_webp_original.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/48/data.html"
        },
        {
            name: "ถนนคนเดินนครพนม",
            image: "https://lh4.googleusercontent.com/proxy/MRX9OUfu6yqkmJWvVDnDy7l4dwlvAe2sEPBTxCIrd24ipQ3Al9ABGXSnQFVdvz5mAlWnZu1jHtpZ25VjEmfwZkXQi1pbblLqBSoH",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/49/data.html"
        },
        {
            name: "พิพิธภัณฑ์จวนผู้ว่าราชการจังหวัดนครพนม",
            image: "https://karnchanit221143.wordpress.com/wp-content/uploads/2019/01/juanpoowa.jpg?w=640",
            rating: "3.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/41/data.html"
        },
        {
            name: "อนุสรณ์สถานประธานโฮจิมินห์",
            image: "https://cms.dmpcdn.com/travel/2020/12/29/257552a0-4996-11eb-9b6d-3fdf37c2e48e_original.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/44/data.html"
        },
        {
            name: "หาดทรายทองศรีโคตรบูร",
            image: "https://cms.dmpcdn.com/travel/2020/05/14/462cab90-95c5-11ea-bcb3-0320ce420b5e_original.jpg",
            rating: "3.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/40/data.html"
        },
        {
            name: "พระธาตุนคร",
            image: "https://www.gerryganttphotography.com/images/nakhonphanom/DTHNP0129WatMahathat.jpg",
            rating: "3.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/40/data.html"
        },
        // เพิ่มสถานที่อื่นๆ ตามต้องการ
    ];
    const bubbles = places.map(place => {
        return {
            "type": "bubble",
            "size": "hecto",
            "hero": {
                "type": "image",
                "url": place.image,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "320:213",
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "text",
                        "text": place.name,
                        "weight": "bold",
                        "size": "lg",
                        "wrap": true
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            ...Array(5).fill().map((_, i) => ({
                                "type": "icon",
                                "size": "xs",
                                "url": i < Math.floor(parseFloat(place.rating))
                                    ? "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    : "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                            })),
                            {
                                "type": "text",
                                "text": place.rating,
                                "size": "xs",
                                "color": "#8c8c8c",
                                "margin": "sm",
                                "flex": 0
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "color": "#1CACE7",
                        "height": "md", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "นำทาง",
                            "uri": `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}`
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "ดูรายละเอียด",
                            "uri": place.url
                        }
                    }
                ],
                "spacing": "sm",
                "paddingTop": "9px", // เพิ่ม padding ด้านบน (หากต้องการ)
                "paddingAll": "6px",
                "paddingBottom": "4px", // ปรับให้ขอบชิดปุ่ม
                "flex": 0
            },
        };
    });


    return {
        "type": "flex",
        "altText": "รายการสถานที่ท่องเที่ยว",
        "contents": {
            "type": "carousel",
            "contents": bubbles
        },
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "เมนูหลัก",
                    "text": "เมนูหลัก"
                }
            }, {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านอาหาร",
                    "text": "ร้านอาหาร"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านคาเฟ่",
                    "text": "ร้านคาเฟ่"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "โรงแรมที่พัก",
                    "text": "โรงแรมที่พัก"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "อื่นๆ",
                    "text": "อื่นๆ"
                }
            }]
        }
    };
};

// สร้าง Flex Message สำหรับร้านอาหาร
exports.restaurant = (location) => {
    const places = [
        {
            name: "ข้าวเกรียบปากหม้อศรีเทพ",
            image: "https://www.paiduaykan.com/wp-content/uploads/2021/03/SON05042.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/31/data.html"
        },
        {
            name: "ครัวเวียดนาม นครพนม",
            image: "https://img.wongnai.com/p/400x0/2021/07/10/4878ae911b2c4f25843cce8ce314aafa.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/36/data.html"
        },
        {
            name: "ขนมจีนพิสมัย",
            image: "https://img.wongnai.com/p/1920x0/2017/12/16/ca2100bebed946e7983144b6afad33e5.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/30/data.html"
        },
        {
            name: "บ้านเลขที่ ๑ หมู่ ๙",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlNhebAMkO5NBPYjnRZtnRFLQaijmUyrFIg&s",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/10/data.html"
        },
        {
            name: "ดาวทอง อาหารเวียดนาม",
            image: "https://i.ytimg.com/vi/Z5XOWwIdiiI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCNXsnzeUAIA6iMfHhRJYz-k9ON7g",
            rating: "3.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/33"
        },
        {
            name: "โอชิเน นครพนม",
            image: "https://img.salehere.co.th/p/1200x0/2023/12/22/cv520pvipyyr.jpg",
            rating: "3.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/54"
        },
        {
            name: "สบายดี@นครพนม",
            image: "https://www.gplace.com/include/img_gal/6/19/gp63576d7897bc0.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/34/data.html"
        },
        {
            name: "ก๋วยเตี๋ยวเรือหนองแสง",
            image: "https://img.wongnai.com/p/1920x0/2021/04/18/7bd32821612546c2824bd0d60c8af0fc.jpg",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/38/data.html"
        },
        {
            name: "โคขุน ป.จุก",
            image: "https://files.thailandtourismdirectory.go.th/assets/upload/2018/10/12/20181012c81e728d9d4c2f636f067f89cc14862c095203.jpg",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/37/data.html"
        },
        {
            name: "The TREE Cafe&Restaurant",
            image: "https://lh3.googleusercontent.com/p/AF1QipOTCNlG5pfHX855G2Q_g1Rc79BdNZf0PfLvGKns=s680-w680-h510",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/53/data.html"
        },
        // เพิ่มสถานที่อื่นๆ ตามต้องการ
    ];

    const bubbles = places.map(place => {
        return {
            "type": "bubble",
            "size": "hecto",
            "hero": {
                "type": "image",
                "url": place.image,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "320:213",
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "text",
                        "text": place.name,
                        "weight": "bold",
                        "size": "lg",
                        "wrap": true
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            ...Array(5).fill().map((_, i) => ({
                                "type": "icon",
                                "size": "xs",
                                "url": i < Math.floor(parseFloat(place.rating))
                                    ? "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    : "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                            })),
                            {
                                "type": "text",
                                "text": place.rating,
                                "size": "xs",
                                "color": "#8c8c8c",
                                "margin": "sm",
                                "flex": 0
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "color": "#1CACE7",
                        "height": "md", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "นำทาง",
                            "uri": `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}`
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "ดูรายละเอียด",
                            "uri": place.url
                        }
                    }
                ],
                "spacing": "sm",
                "paddingTop": "9px", // เพิ่ม padding ด้านบน (หากต้องการ)
                "paddingAll": "6px",
                "paddingBottom": "4px", // ปรับให้ขอบชิดปุ่ม
                "flex": 0
            },
        };
    });

    return {
        "type": "flex",
        "altText": "รายการสถานที่ร้านอาหาร",
        "contents": {
            "type": "carousel",
            "contents": bubbles
        },
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "เมนูหลัก",
                    "text": "เมนูหลัก"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "สถานที่ท่องเที่ยว",
                    "text": "สถานที่ท่องเที่ยว"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านคาเฟ่",
                    "text": "ร้านคาเฟ่"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "โรงแรมที่พัก",
                    "text": "โรงแรมที่พัก"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "อื่นๆ",
                    "text": "อื่นๆ"
                }
            }]
        }
    };
};
exports.cafegood = (location) => {
    const places = [
        {
            name: "Jungle Space Village",
            image: "https://img.wongnai.com/p/1920x0/2024/02/21/e515674d48df41fd8e9d0fd0eda0558f.jpg",
            rating: "5.0",
            url: "https://www.wongnai.com/r/643079gO"
        },
        {
            name: "Cafe' Le Landmark",
            image: "https://www.chillpainai.com/src/wewakeup/scoop/images/c818aa2b86d2ad6d538e96732dfa1c3ee30593a0.jpg",
            rating: "5.0",
            url: "https://www.wongnai.com/r/355302FK"
        },
        {
            name: "76A The Club ร้านกาแฟ",
            image: "https://s359.kapook.com//pagebuilder/7e150d47-1d19-40cb-bd67-069bd4a9a13c.jpg",
            rating: "4.0",
            url: "https://www.wongnai.com/r/880566Jt"
        },
        {
            name: "76เอ เดอะ สเปซ",
            image: "https://www.goaonweb.com/wp-content/uploads/2020/06/54.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/10/data.html"
        },
        {
            name: "Wayla cafe",
            image: "https://img.wongnai.com/p/1920x0/2018/07/08/aaae2b39bead436b9c6e38612cd2cf81.jpg",
            rating: "4.0",
            url: "https://www.wongnai.com/r/294905Io"
        },
        {
            name: "A-List Coffee&Tea Cheese",
            image: "https://lh5.googleusercontent.com/p/AF1QipMVTkbB_ROria5UqzJRpfx_TIWsfaz1TutxXszK=w480-h300-k-n-rw",
            rating: "5.0",
            url: "https://www.wongnai.com/r/364903Rl"
        },
        {
            name: "5th avenue นครพนม",
            image: "https://img.wongnai.com/p/192x192/2023/10/31/c7923414aa9a4f208669db368d849644.jpg",
            rating: "5.0",
            url: "https://www.wongnai.com/r/912922oV"
        },
        {
            name: "Forest Tales",
            image: "https://files.thailandtourismdirectory.go.th/assets/upload/2021/8/16//1779065b-1c84-45e5-b57b-632ce19df39d.jpg",
            rating: "5.0",
            url: "https://www.wongnai.com/r/875977OS"
        },
        {
            name: "Ali blah blah bistro",
            image: "https://s359.kapook.com//pagebuilder/51fae2cc-09ed-4eb4-960d-7c5928c58aa6.jpg",
            rating: "4.0",
            url: "https://www.wongnai.com/r/144944vE"
        },
        {
            name: "Little Home",
            image: "https://s359.kapook.com//pagebuilder/ea85f953-d0e2-4321-9bd8-c3299d52f789.jpg",
            rating: "5.0",
            url: "https://www.wongnai.com/r/451719Vq"
        },
        // เพิ่มสถานที่อื่นๆ ตามต้องการ
    ];

    const bubbles = places.map(place => {
        return {
            "type": "bubble",
            "size": "hecto",
            "hero": {
                "type": "image",
                "url": place.image,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "320:213",
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "text",
                        "text": place.name,
                        "weight": "bold",
                        "size": "lg",
                        "wrap": true
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            ...Array(5).fill().map((_, i) => ({
                                "type": "icon",
                                "size": "xs",
                                "url": i < Math.floor(parseFloat(place.rating))
                                    ? "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    : "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                            })),
                            {
                                "type": "text",
                                "text": place.rating,
                                "size": "xs",
                                "color": "#8c8c8c",
                                "margin": "sm",
                                "flex": 0
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "color": "#1CACE7",
                        "height": "md", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "นำทาง",
                            "uri": `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}`
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "ดูรายละเอียด",
                            "uri": place.url
                        }
                    }
                ],
                "spacing": "sm",
                "paddingTop": "9px", // เพิ่ม padding ด้านบน (หากต้องการ)
                "paddingAll": "6px",
                "paddingBottom": "4px", // ปรับให้ขอบชิดปุ่ม
                "flex": 0
            },
        };
    });

    return {
        "type": "flex",
        "altText": "รายการสถานที่ร้านคาเฟ่",
        "contents": {
            "type": "carousel",
            "contents": bubbles
        },
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "เมนูหลัก",
                    "text": "เมนูหลัก"
                }
            }, {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านอาหาร",
                    "text": "ร้านอาหาร"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "สถานที่ท่องเที่ยว",
                    "text": "สถานที่ท่องเที่ยว"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "โรงแรมที่พัก",
                    "text": "โรงแรมที่พัก"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "อื่นๆ",
                    "text": "อื่นๆ"
                }
            }]
        }
    };
};
exports.accommodation = (location) => {
    const places = [
        {
            name: "โรงแรมฟอร์จูน ริเวอร์วิว นครพนม",
            image: "https://media-cdn.tripadvisor.com/media/photo-s/06/db/ad/27/caption.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/20/data.html"
        },
        {
            name: "That Phanom River View Hotel",
            image: "https://lh6.googleusercontent.com/proxy/2CHAnm00MfSmGu7k_yYsdu-PjKpsU3JjV0gJIX7yhKDLIbWcyrgW2_fGTT9b6AbSZLIDzcFe5vPdya1pbWw2R6mYD3fURsRyp5rM7z_D0z-uqptAoajxrT0AO3RsUQt-lt0H_JIL",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/21/data.html"
        },
        {
            name: "Blu Hotel Nakhon Phanom",
            image: "https://pix10.agoda.net/hotelImages/938/9387812/9387812_19082114250079788489.jpg?ca=9&ce=1&s=414x232&ar=16x9",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/19/data.html"
        },
        {
            name: "โรงแรมเดอะริเวอร์ นครพนม",
            image: "https://pix10.agoda.net/hotelImages/536/536340/536340_16093017140047187699.jpg?ca=6&ce=1&s=414x232&ar=16x9",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/61/data.html"
        },
        {
            name: "โรงแรมชีวาโขง",
            image: "https://www.chuwab.com/images/hotel/6/89/50689/bimg_20220607165603.jpeg",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/food/detail/33"
        },
        {
            name: "โรงแรม สิริรีเจ้นท์",
            image: "https://www.chuwab.com/images/hotel/5/35/48635/48635_large_202011260954534.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/50/data.html"
        },
        {
            name: "โรงแรมแลนด์มาร์คนครพนม",
            image: "https://pix10.agoda.net/hotelImages/6857060/-1/3535fb4d03babcc515c2ddb4ba709fbf.jpg?ca=8&ce=1&s=414x232&ar=16x9",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/59/data.html"
        },
        {
            name: "โรงแรมเดอะเนสท์ นครพนม",
            image: "https://pix10.agoda.net/hotelImages/23070873/-1/5d26c26031b94378daecc4c7b5b917a0.jpg?ca=20&ce=1&s=414x232&ar=16x9",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/66/data.html"
        },
        {
            name: "R Photo Hotel",
            image: "https://pix10.agoda.net/hotelImages/184/18467434/18467434_20100617500092653647.jpg?ca=14&ce=1",
            rating: "5.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/26/data.html"
        },
        {
            name: "โรงแรมสวนยางรีสอร์ท2 อ.นาแก",
            image: "https://files.thailandtourismdirectory.go.th/assets/upload/2018/03/20/2018032021547bd0bbe574dcb62614d7ade7cf93092649.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/hotel/detail/29/data.html"
        },
        // เพิ่มสถานที่อื่นๆ ตามต้องการ
    ];

    const bubbles = places.map(place => {
        return {
            "type": "bubble",
            "size": "hecto",
            "hero": {
                "type": "image",
                "url": place.image,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "320:213",
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "text",
                        "text": place.name,
                        "weight": "bold",
                        "size": "lg",
                        "wrap": true
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            ...Array(5).fill().map((_, i) => ({
                                "type": "icon",
                                "size": "xs",
                                "url": i < Math.floor(parseFloat(place.rating))
                                    ? "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    : "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                            })),
                            {
                                "type": "text",
                                "text": place.rating,
                                "size": "xs",
                                "color": "#8c8c8c",
                                "margin": "sm",
                                "flex": 0
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "color": "#1CACE7",
                        "height": "md", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "นำทาง",
                            "uri": `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}`
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm", // ลดขนาดปุ่มให้น้อยลง
                        "action": {
                            "type": "uri",
                            "label": "ดูรายละเอียด",
                            "uri": place.url
                        }
                    }
                ],
                "spacing": "sm",
                "paddingTop": "9px", // เพิ่ม padding ด้านบน (หากต้องการ)
                "paddingAll": "6px",
                "paddingBottom": "4px", // ปรับให้ขอบชิดปุ่ม
                "flex": 0
            },
        };
    });

    return {
        "type": "flex",
        "altText": "รายการสถานที่พักโรงแรม",
        "contents": {
            "type": "carousel",
            "contents": bubbles
        },
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "เมนูหลัก",
                    "text": "เมนูหลัก"
                }
            }, {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านอาหาร",
                    "text": "ร้านอาหาร"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "สถานที่ท่องเที่ยว",
                    "text": "สถานที่ท่องเที่ยว"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านคาเฟ่",
                    "text": "ร้านคาเฟ่"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "อื่นๆ",
                    "text": "อื่นๆ"
                }
            }]
        }
    };
};

exports.contact = (location) => {
    return {
        "type": "flex",
        "altText": "Contact Information",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://bucket.ex10.tech/images/0a4653ef-6d1e-11ef-ab4d-0242ac12000e/originalContentUrl.png",
                        "size": "full",
                        "aspectRatio": "4:5",
                        "aspectMode": "cover"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "เบอร์โทรหน่วยงาน",
                                "weight": "bold",
                                "size": "xl"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อสำนักงานจังหวัด",
                                    "uri": "tel:042511578"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อสถานีขนส่ง",
                                    "uri": "tel:042513444"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อการท่องเที่ยวและกีฬา",
                                    "uri": "tel:0-4251-6337"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อเกษตรและสหกรณ์",
                                    "uri": "tel:0-4251-5556"
                                }
                            }
                        ]
                    }
                },
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://bucket.ex10.tech/images/1961dc63-6d1e-11ef-ab4d-0242ac12000e/originalContentUrl.png",
                        "size": "full",
                        "aspectRatio": "4:5",
                        "aspectMode": "cover"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "เบอร์โทรฉุกเฉิน",
                                "weight": "bold",
                                "size": "xl"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อกรมทางหลวงชนบท",
                                    "uri": "tel:1146"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อเตือนภัยแห่งชาติ",
                                    "uri": "tel:1860"
                                }
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่อแพทย์ฉุกเฉินแห่งชาติ",
                                    "uri": "tel:1669"
                                }
                            }
                            ,
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ติดต่ออุบัติเหตุทางน้ำ",
                                    "uri": "tel:1196"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
};
exports.other = (location) => {

}
exports.examplePostback = (profile) => {
    return {
        "type": "flex",
        "altText": "น้องโกทักทาย",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": "https://bucket.ex10.tech/images/df1211b8-6a72-11ef-ab4d-0242ac12000e/originalContentUrl.jpg",
                "size": "full",
                "aspectRatio": "20:24",
                "margin": "none",
                "aspectMode": "cover"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "น้องโก สวัสดีครับ",
                        "weight": "bold",
                        "size": "xl"
                    }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "message",
                            "label": "เมนูหลัก",
                            "text": "เมนูหลัก"
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "message",
                            "label": "แผนที่ภาพรวม",
                            "text": "แผนที่หลัก"
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "uri",
                            "label": "เว็บไซต์",
                            "uri": "https://liff.line.me/2006152701-gYo9Kwqr"
                        }
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "message",
                            "label": "อื่นๆ",
                            "text": "อื่นๆ"
                        }
                    },

                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [],
                        "margin": "sm"
                    }
                ],
                "flex": 0
            }
        },
        "sender": {
            "name": "น้องโก",
            "iconUrl": ""
        }, "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "เมนูหลัก",
                    "text": "เมนูหลัก"
                }
            }, {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านอาหาร",
                    "text": "ร้านอาหาร"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "สถานที่ท่องเที่ยว",
                    "text": "สถานที่ท่องเที่ยว"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "ร้านคาเฟ่",
                    "text": "ร้านคาเฟ่"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "โรงแรมที่พัก",
                    "text": "โรงแรมที่พัก"
                }
            },
            {
                "type": "action",
                "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                "action": {
                    "type": "message",
                    "label": "อื่นๆ",
                    "text": "อื่นๆ"
                }
            },
            ]
        }
    }
}
exports.weatherFlex = (cityName, temperature, description, iconUrl) => {
    return {
        "type": "flex",
        "altText": `สภาพอากาศใน ${cityName}`,
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": iconUrl || "https://example.com/default-weather-icon.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": cityName || "ไม่ทราบสถานที่",
                        "weight": "bold",
                        "size": "xl",
                        "wrap": true
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "lg",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "อุณหภูมิ",
                                        "color": "#aaaaaa",
                                        "size": "sm",
                                        "flex": 1
                                    },
                                    {
                                        "type": "text",
                                        "text": `${temperature !== undefined ? temperature.toFixed(1) : 'N/A'}°C`,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 5
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "สภาพอากาศ",
                                        "color": "#aaaaaa",
                                        "size": "sm",
                                        "flex": 1
                                    },
                                    {
                                        "type": "text",
                                        "text": description || "ไม่มีข้อมูล",
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 5
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    };
};
