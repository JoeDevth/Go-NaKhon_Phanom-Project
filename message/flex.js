exports.exampleFlex = (location) => {
    const places = [
        {
            name: "พระธาตุพนมวรมหาวิหาร",
            image: "https://cms.dmpcdn.com/travel/2020/08/11/bf31c5c0-db9d-11ea-8433-c5d4d14f3a3c_original.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/1/data.html"
        },
        {
            name: "พญาศรีสัตตนาคราช",
            image: "https://f.ptcdn.info/268/059/000/pdpa9qfcbDG6xecHpD1-o.jpg",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/2/data.html"
        },
        {
            name: "พระธาตุเรณู",
            image: "https://pukmudmuangthai.com/wp-content/uploads/2021/07/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B9%E0%B9%80%E0%B8%A3%E0%B8%93%E0%B8%B9.png",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/1/data.html"
        },
        {
            name: "พระธาตุเรณู",
            image: "https://pukmudmuangthai.com/wp-content/uploads/2021/07/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B9%E0%B9%80%E0%B8%A3%E0%B8%93%E0%B8%B9.png",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/1/data.html"
        },
        {
            name: "พระธาตุเรณู",
            image: "https://pukmudmuangthai.com/wp-content/uploads/2021/07/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B9%E0%B9%80%E0%B8%A3%E0%B8%93%E0%B8%B9.png",
            rating: "4.0",
            url: "http://www2.nakhonphanom.go.th/travel/detail/1/data.html"
        },
        // เพิ่มสถานที่อื่นๆ ตามต้องการ
    ];

    const bubbles = places.map(place => {
        return {
            "type": "bubble",
            "size": "micro",
            "hero": {
                "type": "image",
                "url": place.image,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "320:213",
                "action": {
                    "type": "uri",
                    "label": `เส้นทางไป${place.name}`,
                    "uri": `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}`
                }
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": place.name,
                        "weight": "bold",
                        "size": "sm",
                        "wrap": true
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            // สร้างไอคอนดาวตามคะแนน
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
                                "margin": "md",
                                "flex": 0
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "ดูรายละเอียดคลิ๊ก",
                                        "wrap": true,
                                        "color": "#8c8c8c",
                                        "size": "xs",
                                        "flex": 5,
                                        "action": {
                                            "type": "uri",
                                            "label": "ดูรายละเอียด",
                                            "uri": place.url
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "spacing": "sm",
                "paddingAll": "13px"
            }
        };
    });

    return {
        "type": "flex",
        "altText": "รายการสถานที่ท่องเที่ยว",
        "contents": {
            "type": "carousel",
            "contents": bubbles
        }
    };
};
// สร้าง Flex Message สำหรับร้านอาหาร
exports.restaurant = () => {
    return {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/03/SON05042.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไปร้านข้าวเกรียบปากหม้อศรีเทพ"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ข้าวเกรียบปากหม้อศรีเทพ",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/31/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://scontent.fbkk4-3.fna.fbcdn.net/v/t39.30808-6/410635712_892137499583766_222479299441829301_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE9gCRn5Anyw9FAbV3HGwDKFdKKjYD9XWEV0oqNgP1dYXdRIniBHQIYdLIWxR5HBgH1UKyEQsGdVNKZVhhuZElu&_nc_ohc=haWxYjmxx2IQ7kNvgEQvC5M&_nc_zt=23&_nc_ht=scontent.fbkk4-3.fna&gid=A6KNwrd-1o8Hncyf4bqoCjT&oh=00_AYDz3ip78L8ZyOGeoYKDZduUkHXS2Qu7_9bMemwrzxjgow&oe=66B01B1D",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านครัวเวียดนาม นครพนม"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ครัวเวียดนาม นครพนม",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/36/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://img.wongnai.com/p/1920x0/2019/11/30/3772e21db46848edaedeff7643324ce9.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านดาวทอง อาหารเวียดนาม"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ดาวทอง อาหารเวียดนาม",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/33/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://scontent.fbkk4-4.fna.fbcdn.net/v/t39.30808-6/436378996_950619953733982_2644824849952936099_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGNxmfA32u_7CrUdB6W24Ip8rVzCn9nCurytXMKf2cK6hMovVXVT7tipzP4zSwJkx_9R72baldxSiGq3TDoMZOx&_nc_ohc=3QoGngXC02gQ7kNvgFbKFXP&_nc_zt=23&_nc_ht=scontent.fbkk4-4.fna&gid=AYmD5gz0rpDmXx_zrNRBeEO&oh=00_AYAhM8S_yftaUm1fk5LiHDs2l8p_R2igsxuiib-SlrKU3A&oe=66B024FE",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านขนมจีนพิสมัย"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ขนมจีนพิสมัย",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/30/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://scontent.fbkk4-4.fna.fbcdn.net/v/t39.30808-6/305402193_388340833493824_1567112663649658949_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHR5-Kxu2wz6Y-VtOEi0Ou0MgiD_5RgiyIyCIP_lGCLIqcd_KHookTZG_FIBlwvsFIsR4ZN7tk8Ut829FvVnX0w&_nc_ohc=3ZUkZQhmvGkQ7kNvgF8o3Pg&_nc_zt=23&_nc_ht=scontent.fbkk4-4.fna&gid=A3rWWPnu6zgsoVz98MLrCS8&oh=00_AYBfLW9RnC0YrK72IRwo2g4CL5DQVLUzVWAGPQsOOMSJoA&oe=66B0328A",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านบ้านเลขที่ ๑ หมู่ ๙"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "บ้านเลขที่ ๑ หมู่ ๙",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/35/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://img.wongnai.com/p/1920x0/2019/08/15/0abc113281444ab880a9c9fe247c12b6.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านสบายดี@นครพนม"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "สบายดี@นครพนม",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/34/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://scontent.fbkk4-4.fna.fbcdn.net/v/t1.6435-9/122867381_117963486772390_5430603406347395936_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHAW79asK6QB5O7Gi8X9ph70kzbDDKGk_jSTNsMMoaT-AyRyLR6llg8xL1If4RpbyM5o4lwPMRoxMR1r5JqUmbs&_nc_ohc=rNu8YnFmtCEQ7kNvgG7a7mh&_nc_ht=scontent.fbkk4-4.fna&oh=00_AYAGvOSVPoIsV5v3RNfuTVw2hYC5oKS7ihL2WlIyRmR-gw&oe=66D1D2C7",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านก๋วยเตี๋ยวเรือหนองแสง"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ก๋วยเตี๋ยวเรือหนองแสง",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/38/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://scontent.fbkk4-4.fna.fbcdn.net/v/t39.30808-6/405210604_850552653528660_8850488421679329865_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHN-hgj93Q2-uG_EQ7cLiJqW2dBq2SbaRZbZ0GrZJtpFhwpTPf95ylRIXTBiCAyYHDCQPtZJB-0jHSSy5giachf&_nc_ohc=kZXZemGI_xgQ7kNvgFJPx9E&_nc_zt=23&_nc_ht=scontent.fbkk4-4.fna&gid=AI2NJt7UJmhHKqKgBHBG-AU&oh=00_AYCqYTCjZ2YsHPjImNkNXF4XmdVSfc0_ychS9-_CA3wAaQ&oe=66B03802",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้าน โคขุน ป.จุก"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "โคขุน ป.จุก",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/37/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://i.ytimg.com/vi/txuugFEqbvg/maxresdefault.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านก๋วยเตี๋ยวตลาดป.เป็ด"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ก๋วยเตี๋ยวตลาดป.เป็ด",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/39/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://img.wongnai.com/p/400x0/2021/05/24/c0a72fe2e79245e49abc02351085dbf5.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "กินอาหารร้านเดอะทรีบายนัวเดอ The Tree cafe’ and restaurant"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "เดอะทรีบายนัวเดอ The Tree cafe’ and restaurant",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/food/detail/53/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
            ]
        }
    }
}
exports.cafegood = () => {
    return {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/04/SMN_0356-800x438.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไปนครชิว คาเฟ่"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "นครชิว คาเฟ่",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": ""
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/03/2-SON04760.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไปjungle space café"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "jungle space café",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "https://www.paiduaykan.com/jungle-space"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/03/1-SON04883.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไป 76a the space"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "76a the space",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "https://www.paiduaykan.com/76a-the-space"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/04/SON05139.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไป76 a the club"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "76 a the club",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "https://www.paiduaykan.com/76a-theclub"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/04/POP-CAFE-1.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไปPOP CAFE"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "POP CAFE",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/travel/detail/4/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/04/Babe-tea-bar1.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไปBabe tea bar"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Babe tea bar",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/travel/detail/48/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/04/Forest-Tales1.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไป Forest Tales"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Forest Tales",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/travel/detail/49/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://www.paiduaykan.com/wp-content/uploads/2021/04/Cafe-Le-Landmark-1.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไป Cafe’ Le Landmark"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Cafe’ Le Landmark",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "http://www2.nakhonphanom.go.th/travel/detail/41/data.html"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://img.wongnai.com/p/624x0/2015/08/07/3ba100e29dff491880673f9c82d0b441.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไป เติมสุข "
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "เติมสุข",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "https://www.wongnai.com/restaurants/195519JV-%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%82-termsuk-coffee-house-%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%9E%E0%B8%99%E0%B8%A1"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                },
                {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                        "type": "image",
                        "url": "https://img.wongnai.com/p/624x0/2022/08/19/b4c8f015fa774760973784d6926244ef.jpg",
                        "size": "full",
                        "aspectMode": "cover",
                        "aspectRatio": "320:213",
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "ไป Chewa Cafe"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Chewa Cafe",
                                "weight": "bold",
                                "size": "sm",
                                "wrap": true
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png"
                                    },
                                    {
                                        "type": "icon",
                                        "size": "xs",
                                        "url": "https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.0",
                                        "size": "xs",
                                        "color": "#8c8c8c",
                                        "margin": "md",
                                        "flex": 0
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "ดูรายละเอียดคลิ๊ก",
                                                "wrap": true,
                                                "color": "#8c8c8c",
                                                "size": "xs",
                                                "flex": 5,
                                                "action": {
                                                    "type": "uri",
                                                    "label": "action",
                                                    "uri": "https://www.wongnai.com/listings/cafe-nakornphanom?ref=ct"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "spacing": "sm",
                        "paddingAll": "13px"
                    }
                }
            ]
        }
    }
}
exports.accommodation = () => {
    // สร้าง Flex Message สำหรับที่พัก
};

exports.contact = () => {
    // สร้าง Flex Message สำหรับข้อมูลติดต่อ
};
exports.examplePostback = (profile) => {
    return {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": "https://scontent.fbkk4-5.fna.fbcdn.net/v/t39.30808-6/381180467_699756018850820_2952746508791230928_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFp7cMcfomyFTjBR09ZrCU7ct25nMOP4Mdy3bmcw4_gx7oaVKZHFmOUoW4pKBvst8bN-N8LW6BCPAHk4pF2THcB&_nc_ohc=UaeRygY_10YQ7kNvgGtiQTU&_nc_zt=23&_nc_ht=scontent.fbkk4-5.fna&gid=ACXiE8Dx1TVdcq5tSgBy9OU&oh=00_AYBZDbEXcFoMZl_n0C-OymPpYl87_EyyFb6iZ649CgOEeg&oe=66AFE1E9",
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
                            "label": "แผนที่หลัก",
                            "text": "แผนที่หลัก"
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
        }
    }
}