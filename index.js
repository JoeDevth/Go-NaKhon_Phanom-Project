/*
Cloud Functions for Firebase 2nd Gen
https://medium.com/firebasethailand/cdda33bbd7dd

*/
const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
setGlobalOptions({
    region: "asia-northeast1",
    memory: "1GB",
    concurrency: 40,
})
const axios = require('axios');

const line = require('./util/line.util');
const dialogflow = require('./util/dialogflow.util');
const firebase = require('./util/firebase.util');
const flex = require('./message/flex');

exports.helloWorld = onRequest((request, response) => {
    response.send(`Method : ${request, method} `);
});

function validateWebhook(request, response) {
    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
        return response.status(401).send("Unauthorized");
    }
}

exports.webhook = onRequest(async (request, response) => {
    validateWebhook(request, response)

    /*async function getWeatherData(cityName) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`, {
                params: {
                    key: 'b0afe892ed7fb3349d2f3f63979893c1',
                    q: cityName,
                    lang: 'th'
                }
            });
            const data = response.data;
            return {
                temperature: data.current.temp_c,
                description: data.current.condition.text,
                iconUrl: data.current.condition.icon
            };
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
            return null;
        }
    }*/

    const events = request.body.events
    for (const event of events) {
        let profile = {}

        console.log("event", JSON.stringify(event));
        if (event.source.userId === "Udeadbeefdeadbeefdeadbeefdeadbeef") {
            return response.status(200).end();
        }
        switch (event.type) {

            case "follow":
                /*
                    Greeting Message for new friend
                */
                profile = await line.getProfile(event.source.userId)

                console.log(":------");
                console.log(JSON.stringify(profile));
                console.log(":------");


                let text = `ยินดีต้อนรับคุณ ${profile.displayName} คุณสามารถพูดคุย สนทนากับ admin ได้เลย`
                if (event.follow.isUnblocked) {
                    /*
                        Greeting Message for Old Friend
                        https://developers.line.biz/en/reference/messaging-api/#follow-event
                        https://linedevth.line.me/th/knowledge-api/follow-event
                    */
                    text = `ยินดีต้อนการกลับมา ${profile.displayName} คุณมีอะไรให้ช่วยมั้ย🥰`


                }
                await line.replyWithLongLived(event.replyToken, [{
                    "type": "text",
                    "text": text,
                }])
                break;
            case "unfollow":
                /*
                    Unsend event
                    https://developers.line.biz/en/reference/messaging-api/#unsend-event
                */
                console.log(JSON.stringify(event));
                break;
            case "message":
                /*
                    Message
                    https://developers.line.biz/en/reference/messaging-api/#message-event
                */
                if (event.message.type === "text") {

                    if (event.source.type !== "group") {
                        // Display a loading animation in one-on-one chats between users and LINE Official Accounts.
                        await line.isAnimationLoading(event.source.userId)
                    }

                    let textMessage = event.message.text

                    const sayhiKeywords = ["สวัสดี", "ดี", "hi", "หวัดดีจ้า", "สวัสดีจ้า", "สวัสดีครับ", "สวัสดีค่ะ", "ทักทาย", "Hi", "ทัก"];
                    const travelKeywords = ["ท่องเที่ยว", "แนะนำที่เที่ยว", "สถานที่ท่องเที่ยว", "ที่เที่ยว", "ที่ท่องเที่ยวโด่งดัง"];
                    const restaurantKeywords = ["ร้านอาหาร", "แนะนำร้านอาหาร", "อาหารร้านดัง", "ร้านราคาถูก"];
                    const cafeKeywords = ["ร้านคาเฟ่", "คาเฟ่", "แนะนำคาเฟ่", "แนะนำร้านคาเฟ่", "กาแฟ", "คาเฟ่ร้านดัง", "คาเฟ่ราคาถูก"];
                    const accommodationKeywords = ["ที่พัก", "แนะนำที่พัก", "ที่พักดัง", "ที่พักราคาถูก", "โรงแรม"];
                    const contactKeywords = ["ติดต่อ", "ข้อมูลติดต่อ", "เบอร์ฉูกเฉิน", "เบอร์โทรฉุกเฉิน", "เบอร์โทร"];
                    const othersKeywords = ["อื่นๆ", "อื่น ๆ", "ไม่รู้", "เพิ่มเติม"];
                    const WebsiteKeyword = ["web", "website", "ข้อมูลเพิ่มเติม", "ขอคำแนะนำ", "การใช้งาน", "วิธีใช้", "ลิ้ง", "เว็บ"]
                    const weatherKeywords = ["สภาพอากาศ", "ฝนตก", "อุณหภูมิ", "พยากรณ์อากาศ", "ฝนฟ้าอากาศ", "อากาศวันนี้"];

                 /*   if (textMessage.includes("สภาพอากาศ")) {
                         const cityName = "นครพนม";
                        const weatherData = await getWeatherData(cityName);
                        if (weatherData) {
                            const weatherFlexMessage = flex.weatherFlex(cityName, weatherData.temperature, weatherData.description, weatherData.iconUrl);
                            await line.replyWithStateless(event.replyToken, [weatherFlexMessage]);
                        } else {
                            await line.replyWithStateless(event.replyToken, [{
                                "type": "text",
                                "text": "ขออภัย ไม่สามารถดึงข้อมูลสภาพอากาศได้ในขณะนี้"
                            }]);
                        }
                    }*/if (weatherKeywords.some(keyword => textMessage.includes(keyword))) {
                        await line.replyWithStateless(event.replyToken, [flex.weatherFlex()])

                    } if (sayhiKeywords.some(keyword => textMessage.includes(keyword))) {

                        console.log([{
                            "type": "text",
                            "text": JSON.stringify(event),
                        }]);

                        profile = await line.getProfile(event.source.userId)
                        console.log('profile', profile);
                        await line.replyWithStateless(event.replyToken, [flex.examplePostback(JSON.stringify(profile))])

                    } else if (travelKeywords.some(keyword => textMessage.includes(keyword))) {
                        const location = travelKeywords.find(keyword => textMessage.includes(keyword));
                        await line.replyWithStateless(event.replyToken, [flex.exampleFlex(location)]);

                    } else if (restaurantKeywords.some(keyword => textMessage.includes(keyword))) {

                        await line.replyWithStateless(event.replyToken, [flex.restaurant()])

                    } else if (cafeKeywords.some(keyword => textMessage.includes(keyword))) {

                        await line.replyWithStateless(event.replyToken, [flex.cafegood()])

                    } else if (accommodationKeywords.some(keyword => textMessage.includes(keyword))) {

                        await line.replyWithStateless(event.replyToken, [flex.accommodation()])

                    } else if (contactKeywords.some(keyword => textMessage.includes(keyword))) {

                        await line.replyWithStateless(event.replyToken, [flex.contact()])

                    } else if (textMessage.startsWith("เที่ยว") || textMessage.startsWith("ไป")) {
                        const location = textMessage.replace(/^(เที่ยว|ไป)/, "").trim();
                        await line.replyWithStateless(event.replyToken, [flex.exampleFlex(location)]);

                    } else if (travelKeywords.some(keyword => textMessage.includes(keyword))) {
                        await line.replyWithStateless(event.replyToken, [flex.exampleFlex()]);

                    } else if (WebsiteKeyword.some(keyword => textMessage.includes(keyword))) {

                        console.log([{
                            "type": "text",
                            "text": JSON.stringify(event),
                        }]);

                        profile = await line.getProfile(event.source.userId)
                        console.log('profile', profile);
                        await line.replyWithStateless(event.replyToken, [flex.examplePostback(JSON.stringify(profile))])

                    } else if (othersKeywords.some(keyword => textMessage.includes(keyword))) {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "imagemap",
                            "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/aae40847-152b-4f38-88b0-b85e41de4762",
                            "altText": "รายการเมนูเพิ่มเติม",
                            "baseSize": {
                                "width": 1040,
                                "height": 1471
                            },
                            "actions": [
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 95,
                                        "y": 263,
                                        "width": 847,
                                        "height": 164
                                    },
                                    "text": "ข้อมูลทั่วไป"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 99,
                                        "y": 450,
                                        "width": 834,
                                        "height": 164
                                    },
                                    "text": "ประวัติศาสตร์"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 89,
                                        "y": 638,
                                        "width": 855,
                                        "height": 166
                                    },
                                    "text": "จุดผ่านแดน"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 91,
                                        "y": 825,
                                        "width": 842,
                                        "height": 168
                                    },
                                    "text": "แผนที่หลัก"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 87,
                                        "y": 1008,
                                        "width": 851,
                                        "height": 173
                                    },
                                    "text": "วัฒนธรรมองค์กร"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 83,
                                        "y": 1197,
                                        "width": 857,
                                        "height": 166
                                    },
                                    "text": "วิสัยทัศน์/พันธกิจ"
                                }
                            ],
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
                                ]
                            }
                        }])


                    } else if (weatherKeywords.some(keyword => textMessage.includes(keyword))) {
                        await line.replyWithStateless(event.replyToken, [flex.exampleFlex()]);

                    } else if (textMessage === "แผนที่หลัก") {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "imagemap",
                            "baseUrl": "https://www.nakhonpanom.com/wp-content/uploads/2023/07/357521243_717367680398404_3279286131874078030_n-1.jpg",
                            "altText": "Imagemap",
                            "baseSize": {
                                "width": 1040,
                                "height": 1500
                            },
                            "actions": [{
                                "type": "uri",
                                "area": {
                                    "x": 123,
                                    "y": 163,
                                    "width": 813,
                                    "height": 800
                                },
                                "linkUri": "https://travel.trueid.net/detail/ly5een7g66ky"
                            }],
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
                        }])
                    } else if (textMessage === "ประวัติศาสตร์") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "imagemap",
                                "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/77229c7f-280b-4b95-848d-dd95c630afcb",
                                "altText": "ประวัติศาสตร์จังหวัดนครพนม",
                                "baseSize": {
                                    "width": 1040,
                                    "height": 1471
                                },
                                "actions": [],
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "วัฒนธรรมองค์กร") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "imagemap",
                                "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/23f2b981-4f3f-4815-b046-76bd8ce1be77",
                                "altText": "วัฒนธรรมองค์กรจังหวัดนครพนม",
                                "baseSize": {
                                    "width": 1040,
                                    "height": "797"
                                },
                                "actions": [],
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "วัฒนธรรมองค์กร") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "วิสัยทัศน์/Visionเมืองน่าอยู่ ประตูเศรษฐกิจสู่อนุภูมิภาคลุ่มแม่น้ำโขงพันธกิจ/Missionด้านเศรษฐกิจสร้างความเจริญเติบโตทางเศรษฐกิจให้จังหวัดโดยเพิ่มขีดความสามารถในการแข่งขันของผู้ประกอบการ และประชาชนในพื้นที่เป็นหลัก ควบคู่กับการส่งเสริมการลงทุนจากนักลงทุน SMEs ในท้องถิ่น ระดับประเทศ และระหว่างประเทศในด้านที่จังหวัดมีศักยภาพ\nการพัฒนาเกษตรปลอดสารพิษและอุตสาหกรรมการเกษตรที่เป็นมิตรต่อสิ่งแวดล้อม เพื่อให้จังหวัดนครพนมหลุดพ้นจากจังหวัดที่ประชาชนมีสถานะทางเศรษฐกิจและสังคมในระดับต่ำ ไปสู่จังหวัดที่ประชาชนโดยเพิ่มขีดความสามารถในการแข่งขันของผู้ประกอบการ และประชาชนในพื้นที่เป็นหลัก ควบคู่กับการส่งเสริมการลงทุนจากนักลงทุน SMEs ในท้องถิ่น ระดับประเทศ และระหว่างประเทศในด้านที่จังหวัดมีศักยภาพการพัฒนาเกษตรปลอดสารพิษและอุตสาหกรรมการเกษตรที่เป็นมิตรต่อสิ่งแวดล้อม เพื่อให้จังหวัดนครพนมหลุดพ้นจากจังหวัดที่ประชาชนมีสถานะทางเศรษฐกิจและสังคมในระดับต่ำ ไปสู่จังหวัดที่ประชาชนมีสถานะทางเศรษฐกิจและสังคมในระดับสูงพ้นความยากจน โดยยึดหลักการพัฒนาตามแนวทางปรัชญาของเศรษฐกิจพอเพียง และใช้นวัตกรรมด้านสังคมส่งเสริมให้ประชาชนมีคุณภาพชีวิตที่ดี สุขภาพดี ได้รับโอกาสทางการรักษาพยาบาลที่ได้มาตรฐาน ยกระดับไปสู่การรองรับสังคมผู้สูงอายุส่งเสริมให้มีการเข้าถึงโอกาสทางการศึกษาจากหลักสูตรและสถานศึกษาคุณภาพสูงส่งเสริมให้มีการประกอบอาชีพและที่มีหลักประกันการดำรงชีวิตที่มั่นคง้านความมั่นคงเสริมสร้างให้ชุมชนเข้มแข็ง พื้นที่ชายแดนปลอดยาเสพติดและภัยคุกคามทุกประเภท ด้วยเทคโนโลยีสารสนเทศที่ทันสมัย สร้างสังคมสันติสุขและมีความสัมพันธ์อันดีกับประเทศเพื่อนบ้าน้านทรัพยากรธรรมชาติและสิ่งแวดล้อม\nมุ่งสู่การเป็นเมืองพัฒนาที่เป็นมิตรต่อสิ่งแวดล้อมปลอดมลพิษ การบริหารจัดการต้นแบบแห่งอนุภูมิภาคลุ่มน้ำโขง ด้วยการอนุรักษ์ฟื้นฟูทรัพยากรธรรมชาติและสิ่งแวดล้อมอย่างยั่งยืน โดยเน้นกระบวนการมีส่วนร่วมของทุกภาคส่วการบริหารจัดการมุ่งเน้นการพัฒนาเพิ่มสมรรถนะบุคลากร กระบวนการทำงานให้มีประสิทธิภาพ สะดวก รวดเร็ว และบูรณาการระบบการบริหารจัดการภาครัฐ เอกชน และประชาชน ด้วยเทคโนโลยีสารสนเทศที่ทันสมัย ภายใต้หลักธรรมาภิบาลขององค์กร เพื่อความโปร่งใส ตรวจสอบได้"
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    }


                    else if (textMessage === "ข้อมูลทั่วไป") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "imagemap",
                                "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/9b42693b-1094-4353-a863-78a0efdb832a",
                                "altText": "ข้อมูลทั่วไปจังหวัดนครพนม",
                                "baseSize": {
                                    "width": 1040,
                                    "height": 1471
                                },
                                "actions": []
                                ,
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    }
                    else if (textMessage === "เมนูหลัก") {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "text",
                            "text": `วันนี้อยากทำอะไรดี น้องโกขอแนะนำ คุณสามารถเลือกเมนูได้ดังนี้เลย 🛋️🏨🥗🥘😍`,
                            "type": "imagemap",
                            "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/d06ee487-ab05-4d56-95c8-b78ada076b63",
                            "altText": "Imagemap generator By EX10",
                            "baseSize": {
                                "width": 1040,
                                "height": 701
                            },
                            "actions": [
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 2,
                                        "y": 5,
                                        "width": 341,
                                        "height": 343
                                    },
                                    "text": "สถานที่ท่องเที่ยว"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 347,
                                        "y": 5,
                                        "width": 345,
                                        "height": 345
                                    },
                                    "text": "ร้านอาหาร"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 697,
                                        "y": 3,
                                        "width": 343,
                                        "height": 347
                                    },
                                    "text": "คาเฟ่"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 0,
                                        "y": 350,
                                        "width": 345,
                                        "height": 349
                                    },
                                    "text": "โรงแรม"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 347,
                                        "y": 353,
                                        "width": 347,
                                        "height": 347
                                    },
                                    "text": "ติดต่อ"
                                },
                                {
                                    "type": "message",
                                    "area": {
                                        "x": 695,
                                        "y": 353,
                                        "width": 341,
                                        "height": 345
                                    },
                                    "text": "อื่นๆ"
                                }
                            ]
                        }])
                    } else {
                        /* Foward to Dialogflow */
                        await dialogflow.forwardDialodflow(request)
                    }

                } else {
                    /*
                    # Handle Other Message Type
                    - Image : https://developers.line.biz/en/reference/messaging-api/#image-message
                    - Video : https://developers.line.biz/en/reference/messaging-api/#video-message
                    - Audio : https://developers.line.biz/en/reference/messaging-api/#audio-message
                    - Location : https://developers.line.biz/en/reference/messaging-api/#location-message
                    - Sticker : https://developers.line.biz/en/reference/messaging-api/#sticker-message
                    */

                    /*
                        https://medium.com/linedevth/111ea6c17ada
                    */
                    let msg = JSON.stringify(event)

                    if (event.source.type === "group") {

                        const validateEventType = ['image', 'audio', 'video', 'file']
                        if (validateEventType.includes(event.message.type)) {
                            const resGetContent = await line.getContent(event.message, event.message.id)
                            console.log("binary ", binary.fileName);
                            // fileName = resGetContent.fileName
                            // todo save binary to firestore
                            binary = resGetContent.binary

                            const publicUrl = await firebase.saveImageToStorage(event.source.groupId, resGetContent.fileName, resGetContent.binary)
                            await firebase.insertImageGroup(event.source.groupId, event.message.id, publicUrl)
                            msg = publicUrl
                        }
                    }

                    await line.replyWithLongLived(event.replyToken, [{
                        "type": "text",
                        "text": msg,
                    }])
                }
                break;
            case "unsend":
                /*
                    unsend
                    https://developers.line.biz/en/reference/messaging-api/#unsend-event
                */
                profile = await line.getProfile(event.source.userId)
                console.log(`พบ ${profile.displayName} unsend`);
                break;
            case "join":
                /*
                    join
                    https://developers.line.biz/en/reference/messaging-api/#join-event
                */

                await line.replyWithLongLived(event.replyToken, [{
                    "type": "text",
                    "text": `ยินดีที่ได้รู้จัก`,
                    "quickReply": {
                        "items": [{
                            "type": "action",
                            "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                            "action": {
                                "type": "message",
                                "label": "สวัสดี",
                                "text": "สวัสดี"
                            }
                        }, {
                            "type": "action",
                            "imageUrl": "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                            "action": {
                                "type": "clipboard",
                                "label": "คัดลองคำ",
                                "clipboardText": "สวัสดี"
                            }
                        }]
                    }
                }])
                break;
            case "leave":
                /*
                    leave
                    https://developers.line.biz/en/reference/messaging-api/#leave-event
                */
                console.log(JSON.stringify(event));
                break;
            case "memberJoined":
                /*
                    memberJoined
                    https://developers.line.biz/en/reference/messaging-api/#member-joined-event
                */
                console.log(JSON.stringify(event));
                for (let member of event.joined.members) {
                    if (member.type === "user") {
                        console.log(JSON.stringify(event));
                        await line.replyWithLongLived(event.replyToken, [{
                            "type": "text",
                            "text": JSON.stringify(event),
                            "quickReply": {
                                "items": [{
                                    "type": "action",
                                    "imageUrl": "https://bucket.ex10.tech/images/9f2a63dc-d84e-11ee-97d4-0242ac12000b/originalContentUrl.png",
                                    "action": {
                                        "type": "message",
                                        "label": "สวัสดี",
                                        "text": "สวัสดี"
                                    }
                                }]
                            }
                        }])
                    }
                }
                break;
            case "memberLeft":
                /*
                    memberLeft
                    https://developers.line.biz/en/reference/messaging-api/#member-left-event
                */
                console.log(JSON.stringify(event));
                break;
            case "postback":
                /*
                    postback
                    https://developers.line.biz/en/reference/messaging-api/#postback-event
                */
                console.log(JSON.parse(event.postback.data));
                await line.replyWithLongLived(event.replyToken, [{
                    "type": "text",
                    "text": JSON.stringify(event.postback.data),
                }])
                break;

            default:
                return response.end();
        }

    }

    return response.end();

});

exports.dialogflow = onRequest(async (request, response) => {

    /*
        receive dialogflow
        bonus
    */
    const object = request.body
    const replyToken = object.originalDetectIntentRequest.payload.data.replyToken
    await line.replyWithLongLived(replyToken, [{
        "type": "text",
        "text": "กินไรดีจ้ะ",
    }])
    return response.end();

});
