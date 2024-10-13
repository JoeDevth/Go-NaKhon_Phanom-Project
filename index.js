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


const line = require('./util/line.util');
const dialogflow = require('./util/dialogflow.util');
const firebase = require('./util/firebase.util');
const flex = require('./message/flex');
const axios = require('axios');
const bot = require('./util/Gemini');

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

// ฟังก์ชันสำหรับจัดการเหตุการณ์เมื่อผู้ใช้เปิดแชท
async function handleFollow(event) {
    const profile = await client.getProfile(event.source.userId);
    
    const message = {
      type: 'text',
      text: `ยินดีต้อนรับคุณ ${profile.displayName} คุณสามารถพูดคุย สนทนากับ admin ได้เลย`,
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: 'สวัสดี',
              text: 'สวัสดี'
            }
          }
        ]
      }
    };
  
    return client.replyMessage(event.replyToken, message);
  }
  
exports.webhook = onRequest(async (request, response) => {
    validateWebhook(request, response)

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
                await handleFollow(event);


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
                    const cafeKeywords = ["ร้านคาเฟ่", "คาเฟ่", "แนะนำคาเฟ่", "แนะนำร้านคาเฟ่", "กาแฟ", "คาเฟ่ร้านดัง", "คาเฟ่ราคาถูก","อยากกินน้ำเย็นๆ"];
                    const accommodationKeywords = ["ที่พัก", "แนะนำที่พัก", "ที่พักดัง", "ที่พักราคาถูก", "โรงแรม"];
                    const contactKeywords = ["ติดต่อ", "ข้อมูลติดต่อ", "เบอร์ฉุกเฉิน", "เบอร์โทรฉุกเฉิน", "เบอร์โทร", "สอบถาม"];
                    const othersKeywords = ["อื่นๆ", "อื่น ๆ", "ไม่รู้", "เพิ่มเติม"];
                    const WebsiteKeyword = ["web", "website", "ข้อมูลเพิ่มเติม", "ขอคำแนะนำ", "การใช้งาน", "วิธีใช้", "ลิ้ง", "เว็บ"]
                    const weatherKeywords = ["สภาพอากาศ", "ฝนตก", "อุณหภูมิ", "พยากรณ์อากาศ", "ฝนฟ้าอากาศ", "อากาศวันนี้"];

                    if (weatherKeywords.some(keyword => textMessage.includes(keyword))) {
                        await line.replyWithStateless(event.replyToken, [flex.weatherFlex()])

                    } if (sayhiKeywords.some(keyword => textMessage.includes(keyword))) {
                        console.log(event); // แสดง event ใน console
                    
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "สวัสดีครับ น้องโก ยินดีต้อนรับครับ! 🌟\nเลือกทำรายการในเมนูด้านล่างได้เลยครับ!"
                            }, 
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/hi_10246744.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "คุยกับน้องโก",
                                                "text": "บอทน้องโก"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/info_15578567.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "เกี่ยวกับนครพนม",
                                                "text": "ปรึกษาเกี่ยวกับจังหวัดนครพนม"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]);
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

                    } else if (othersKeywords.some(keyword => textMessage.includes(keyword))) {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "imagemap",
                            "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/f2299122-fbb5-41c6-ab7f-42b255cb0c02",
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
                                    "text": "แผนที่"
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
                                "items": [
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "ปฏิทิน",
                                        "text": "ปฏิทิน"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                    "action": {
                                        "type": "message",
                                        "label": "เที่ยว 7 วัด 7 อำเภอ",
                                        "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                    "action": {
                                        "type": "message",
                                        "label": "สินค้า OTOP",
                                        "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                    }
                                }
                                ]
                            }
                        }])



                    } else if (textMessage === "ข้อมูลทั่วไป") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "imagemap",
                                "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/cabccd6b-a1f9-44f1-a910-d7271b4e51db",
                                "altText": "imagemap ข้อมูลทั่วไปจังหวัดนครพนม",
                                "baseSize": {
                                    "width": 1040,
                                    "height": 1471
                                },
                                "actions": [
                                    {
                                        "type": "message",
                                        "area": {
                                            "x": 33,
                                            "y": 332,
                                            "width": 458,
                                            "height": 518
                                        },
                                        "text": "ที่ตั้งจังหวัดนครพนม"
                                    },
                                    {
                                        "type": "message",
                                        "area": {
                                            "x": 520,
                                            "y": 1049,
                                            "width": 478,
                                            "height": 387
                                        },
                                        "text": "คำขวัญ"
                                    },
                                ],
                                
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "ปฏิทิน",
                                                "text": "ปฏิทิน"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "เที่ยว 7 วัด 7 อำเภอ",
                                                "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "สินค้า OTOP",
                                                "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                            }
                                        }
                                    ]
                                }
                            }])
                    } else if (textMessage === "ที่ตั้งจังหวัดนครพนม") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "$ที่ตั้ง\nจังหวัดนครพนมเป็นจังหวัดชายแดนภาคตะวันออกเฉียงเหนือของประเทศไทย มีเนื้อที่ ประมาณ 5,528.88 ตารางกิโลเมตรหรือประมาณ 3,474,437 ไร่ (คิดเป็นร้อยละ 3 ของพื้นที่ภาค ตะวันออกเฉียงเหนือ) พื้นที่มีลักษณะเลียบยาวตามแนวชายฝั่งขวาของแม่น้ำโขงประมาณ 174 กิโลเมตร อยู่ระหว่างเส้นรุ้งที่ 16 -18 องศา เหนือ และระหว่างเส้นแวงที่ 104 -105 องศาตะวันออก มีระยะหางจาก กรุงเทพมหานคร ประมาณ 735 กิโลเมตร\n\n\n$อาณาเขตติดต่อกับจังหวัดใกล้เคียงและประเทศเพื่อนบ้าน ดังนี้\nทิศเหนือ ติดต่อกับอำเภอเซกาและอำเภอบึงโขงหลง จังหวัดบึงกาฬ ระยะทาง 158 กิโลเมตร\nทิศใต้ ติดต่อกับอำเภอดงหลวงและอำเภอหว้านใหญ่ จังหวัดมุกดาหาร ระยะทาง 104 กิโลเมตร\nทิศตะวันออก ติดต่อกับ แขวงคำม่วน และแขวงบอลิคําไซ สปป.ลาว โดยมีแม่น้ำโขงเป็นเส้นกั้น พรมแดน\nทิศตะวันตก ติดต่อกับอำเภอกุสุมาลย์ และอำเภออากาศอำนวย จังหวัดสกลนคร ระยะทาง 93 กิโลเมตร",
                                "emojis": [
                                    {
                                        "index": 0,
                                        "productId": "5ac21542031a6752fb806d55",
                                        "emojiId": "119"
                                    },
                                    {
                                        "index": 393,
                                        "productId": "5ac21542031a6752fb806d55",
                                        "emojiId": "119"
                                    }
                                ]
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าข้อมูลทั่วไป",
                                                "text": "ข้อมูลทั่วไป"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "คำขวัญ") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "    ​​​​​​​  ​​​​​​​  ​​​​​​​  ​​​​​​​  ​​​​​​​  ​​​​​​​ $\n       พระธาตุพนมค่าล้ำ\n     วัฒนธรรมหลากหลาย\n             เรณูภูไท\n          เรือไฟโสภา\n         งามตาฝั่งโขง",
                                "emojis": [
                                    {
                                        "index": 57,
                                        "productId": "5ac21542031a6752fb806d55",
                                        "emojiId": "243"
                                    }
                                ]
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าข้อมูลทั่วไป",
                                                "text": "ข้อมูลทั่วไป"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "ประวัติศาสตร์") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "imagemap",
                                "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/921e5e6e-40d9-4a2b-ae0c-5a1304086b62",
                                "altText": "Imagemap ประวัติศาสตร์จังหวัดนครพนม",
                                "baseSize": {
                                    "width": 1040,
                                    "height": 1471
                                },
                                "actions": [
                                    {
                                        "type": "message",
                                        "area": {
                                            "x": 16,
                                            "y": 330,
                                            "width": 505,
                                            "height": 524
                                        },
                                        "text": "ประวัติความเป็นมา"
                                    },
                                    {
                                        "type": "message",
                                        "area": {
                                            "x": 526,
                                            "y": 1054,
                                            "width": 408,
                                            "height": 401
                                        },
                                        "text": "ตราประจำจังหวัด"
                                    }
                                ],
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "ปฏิทิน",
                                                "text": "ปฏิทิน"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "เที่ยว 7 วัด 7 อำเภอ",
                                                "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "สินค้า OTOP",
                                                "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                            }
                                        }
                                        
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "ประวัติความเป็นมา") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "     จังหวัดนครพนม ตั้งอยู่ในภาคตะวันออกเฉียงเหนือของประเทศไทย มีประวัติสืบทอดยาวนาน เชื่อว่าเดิมศูนย์กลางของ \"อาณาจักรศรีโคตรบูร\" ที่รุ่งเรืองในอดีต ในช่วงต้นพุทธศตวรรษที่12 เป็นอาณาจักรอิสระ ไม่ขึ้นกับใคร ประมาณพุทธศตวรรษที่ 16 อาณาจักรศรีโคตรบูรณ์ ได้เสื่อมอำนาจลง ตกอยู่ภายใต้การปกครองของอาณาจักรขอม ต่อมาราวพุทธศตวรรษที่ 18 ชื่อของ \"ศรีโคตรบูร\" ได้กลายมาเป็นเมืองใน อาณาจักรล้านช้าง มีฐานะเป็นเมืองลูกหลวง โดยพระเจ้ากรุงศรีสัตนาคนหุต ล้านช้าง ทรงสร้างเมืองที่ปากห้วยหินบูร (ปากห้วยบรรจบลำ น้ำโขงฝั่งซ้ายตรงข้ามอำเภอท่าอุเทน เหนือเมืองนครพนม) และได้สืบทอดราชสมบัติต่ออีกหลายพระองค์\n\n\n    ภายหลังย้ายเมืองมาตั้งที่ป่าไม้รวก ห้วยศรีมัง ริมแม่น้ำโขงฝั่งซ้าย (คือเมืองเก่าใต้เมืองท่าแขกในปัจจุบัน) ถึงปีพุทธศักราช 2297 มี พระนครานุรักษ์ครองเมืองศรีโคตรบูร มีความเห็นว่าเมืองมิได้ตั้งอยู่ที่ปากห้วยแล้ว จึงได้เปลี่ยนนามเมืองใหม่ว่า \"เมืองมรุกขนคร\" เพราะถือว่าสร้างขึ้นในดงไม้รวก นามเมืองศรีโคตรบูรจึงเปลี่ยนไปตั้งแต่ครั้งนั้น\n\n\n    ช่วงประมาณพุทธศักราช 2309 สมัยพระบรมราชากู่แก้ว หลังจากชนะศึกกับพระนครานุรักษ์ (คำสิงห์) เจ้าราชบุตรเขยผู้ไปสวามิภักดิ์ต่อ พระเจ้าไชยเชษฐาธิราชที่ 2 (เจ้าองค์หล่อ) แห่งนครเวียงจันทน์ พระองค์ได้ย้ายเมืองข้ามฝั่งแม่น้ำโขงมาที่ปากบังฮวก (ฝั่งประเทศไทยปัจจุบัน คือบริเวณวัดมรุกขนคร ตำบลดอนนางหงส์ อำเภอธาตุพนม จังหวัดนครพนม) และต่อมาในปีพุทธศักราช 2321 พระเจ้ากรุงธนบุรีทรง พระกรุณาโปรดเกล้าฯ ให้สมเด็จเจ้าพระยามหากษัตริย์ศึก และเจ้าพระยาสุรสิงหนาท ยกทัพมาตีเอาหัวเมืองทางแถบแม่น้ำโขง รวมไปจนถึง นครเวียงจันทน์ เมืองมรุกขนครจึงได้ขึ้นกับกรุงธนบุรีในสมัยนี้ แต่ยังคงปกครองตนเองอยู่ หลังจากนั้น ราวปีพุทธศักราช 2322 สมัยพระบรมราชา (พรหมา) ได้ย้ายเมืองจากปากบังฮวก มาอยู่ที่บ้านหนองจันทร์ (ห่างจากตัวเมืองนครพนมไปทางทิศใต้ 4 กิโลเมตร) ตั้งชื่อเมืองใหม่ว่า \"นครบุรีราชธานี\"\n\n\n    ต่อมาในปีพุทธศักราช 2329 พระบาทสมเด็จพระพุทธยอดฟ้าจุฬาโลกมหาราช ทรงพระกรุณาโปรดเกล้าฯ ให้เปลี่ยนนามเมืองเสียใหม่ว่า \"เมืองนครพนม\" ขึ้นตรงต่อกรุงรัตนโกสินทร์ การที่พระราชทานนามว่า \"เมืองนครพนม\" สันนิษฐานได้ว่า อาจจะเนื่องด้วยเดิมเมืองนี้เป็นเมือง ลูกหลวงมาก่อน เป็นเมืองที่มีความสำคัญทางประวัติศาสตร์ จึงให้ใช้คำว่า \"นคร\" หรืออีกนัยหนึ่งคำว่า \"นคร\" นี้ อาจรักษาชื่อเมืองเดิมไว้ คือ \"เมืองนครบุรีราชธานี\" ส่วนคำว่า \"พนม\" อาจจะเนื่องด้วยจังหวัดนี้มีองค์พระธาตุพนมประดิษฐานอยู่หรืออาจจะเนื่องจากเดิมมีอาณาเขต ไกลไปถึงดินแดนฝั่งซ้ายของแม่น้ำโขง คือบริเวณเมืองท่าแขก ซึ่งภูเขาสลับซับซ้อนมากกมาย ไปจนถึงดินแดนของประเทศเวียดนาม จึงใช้คำว่า \"พนม\" แปลว่า \"ภูเขา\""
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าประวัติศาสตร์",
                                                "text": "ประวัติศาสตร์"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "ตราประจำจังหวัด") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "$ ตราประจำจังหวัดของไทย มีพัฒนาการมาจากตราประจำตำแหน่งของเจ้าเมืองในสมัยสมบูรณาญาสิทธิราชย์ และตราประจำธงประจำกองลูกเสือ 14 มณฑล ในช่วงรัชกาลที่ 6 - 7 พ.ศ. 2483 จอมพลแปลก พิบูลสงครามเป็นนายกรัฐมนตรีในขณะนั้น ได้กำหนดให้แต่ละจังหวัดมีตราประจำจังหวัดของตนเอง โดยกรมศิลปากรเป็นผู้ออกแบบตราตามแนวคิดที่แต่ละจังหวัดกำหนดไว้ โดยของจังหวัดนครพนมนั้น มีสัญลักษณ์เป็นรูปพระธาตุพนม หมายถึง จังหวัดนครพนม มีพระธาตุพนมซึ่งเป็นพระธาตุเจดีย์อันศักดิ์สิทธิ์ ภายในบรรจุพระอุรังคธาตุ เป็นที่สักการะ ศูนย์รวมจิตใจ ความศรัทธาของชาวจังหวัดนครพนม ถือเป็นสิ่งศักดิ์สิทธิ์คู่เมืองนครพนมมาแต่โบราณกาลกว่า 2,500 ปี\n\nอักษรย่อจังหวัด: นพ.",
                                "emojis": [
                                    {
                                        "index": 0,
                                        "productId": "5ac21a18040ab15980c9b43e",
                                        "emojiId": "016"
                                    }
                                ]
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าประวัติศาสตร์",
                                                "text": "ประวัติศาสตร์"
                                            }
                                        },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "จุดผ่านแดน") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": " จุดผ่านแดน\nจังหวัดนครพนม มีจุดผ่านแดนถาวร 2 แห่ง จุดผ่อนปรน 4 แห่ง ดังนี้\n\n1) จุดผ่านแดนถาวรสะพานมิตรภาพ 3 (นครพนม-คำมวน) บริเวณบ้านห้อม ตำบลอาจสามารถ อำเภอเมืองนครพนม\nเป็นเขตติดตอกับบ้านเวินใต้ เมืองท่าแขก แขวงคำมวน\nเปิดตั้งแต่ 06.00 – 22.00 น. ทุกวัน\n\n2) จุดผ่านแดนถาวร ท่าเทียบเรือเทศบาลเมืองนครพนม ตำบลในเมือง อำเภอเมืองนครพนม\nติดต่อกับเมืองท่าแขก แขวงคำมวน\nเปิดตั้งแต่ 08.00 – 18.00 น. ทุกวัน\n\n3) จุดผ่อนปรนบ้านหนาดท่า หมู่ 2 ตำบลบ้านกลาง อำเภอเมืองนครพนม\nเป็นเขตติดต่อกับ บ้านปากเป่ง เมืองท่าแขก\nเปิดตั้งแต่ 08.00 – 14.00 น. ทุกวันอังคารและวันศุกร์\n\n4) จุดผ่อนปรนบ้านโพธิ์ไทร ตำบลไผ่ล้อม อำเภอบ้านแพง\nเป็นเขตติดต่อกับบ้านท่าสะอาด เมืองปากกระดิ่ง แขวงบอลิคำไซ\nเปิดตั้งแต่ 08.00 – 16.00 น. ทุกวันจันทร์ถึงวันศุกร์\n\n5) จุดผ่อนปรนบ้านธาตุพนมสามัคคี หมูที่ 2 อำเภอธาตุพนม\nเป็นเขตติดต่อกับบ้านด่าน เมืองหนองบก แขวงคำม่วน\nเปิดตั้งแต่ 06.00 – 16.30 น. ทุกวันจันทร์ถึงวันศุกร์\n\n6) จุดผ่อนปรนบ้านทาอุเทน ตําบลท่าอุเทน อำเภอท่าอุเทน\nเป็นเขตติดต่อกับบ้านหินบูน เมืองหินบูน แขวงคำม่วน\nเปิดตั้งแต่ 08.00 – 16.00 น. ทุกวันจันทร์และวันพฤหัสบดี",
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",
                                "quickReply": {
                                    "items": [
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "ปฏิทิน",
                                                "text": "ปฏิทิน"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "เที่ยว 7 วัด 7 อำเภอ",
                                                "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "สินค้า OTOP",
                                                "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "แผนที่") {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "imagemap",
                            "baseUrl": "https://www.nakhonpanom.com/wp-content/uploads/2023/07/357521243_717367680398404_3279286131874078030_n-1.jpg",
                            "altText": "Imagemap แผนที่",
                            "baseSize": {
                                "width": 1200,
                                "height": "1600"
                            },
                            "actions": [
                                {
                                    "type": "uri",
                                    "area": {
                                        "x": 60,
                                        "y": 49,
                                        "width": 917,
                                        "height": 1283
                                    },
                                "linkUri": "https://travel.trueid.net/detail/ly5een7g66ky"
                            }],
                            "sender": {
                                "name": "น้องโก",
                                "iconUrl": ""
                            }, "quickReply": {
                                "items": [{
                                    "type": "action",
                                    "imageUrl": "https://img2.pic.in.th/pic/menu_15164854.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "เมนูหลัก",
                                        "text": "เมนูหลัก"
                                    }
                                }, {
                                    "type": "action",
                                    "imageUrl": "https://img2.pic.in.th/pic/intermittent-fasting_16862110.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "ร้านอาหาร",
                                        "text": "ร้านอาหาร"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img2.pic.in.th/pic/travel_8112689.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "สถานที่ท่องเที่ยว",
                                        "text": "สถานที่ท่องเที่ยว"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/coffee-shop_10468691.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "ร้านคาเฟ่",
                                        "text": "ร้านคาเฟ่"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/hotel_8112942.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "โรงแรมที่พัก",
                                        "text": "โรงแรมที่พัก"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "ปฏิทิน",
                                        "text": "ปฏิทิน"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                    "action": {
                                        "type": "message",
                                        "label": "เที่ยว 7 วัด 7 อำเภอ",
                                        "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                    "action": {
                                        "type": "message",
                                        "label": "สินค้า OTOP",
                                        "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                    }
                                },
                                {
                                    "type": "action",
                                    "imageUrl": "https://img5.pic.in.th/file/secure-sv1/more_16046406.gif",
                                    "action": {
                                        "type": "message",
                                        "label": "อื่นๆ",
                                        "text": "อื่นๆ"
                                    }
                                },
                                ]
                            }
                        }])
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
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/left-arrow_6839001.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "กลับไปหน้าอื่นๆ",
                                                "text": "อื่นๆ"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                            "action": {
                                                "type": "message",
                                                "label": "ปฏิทิน",
                                                "text": "ปฏิทิน"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "เที่ยว 7 วัด 7 อำเภอ",
                                                "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                            }
                                        },
                                        {
                                            "type": "action",
                                            "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                            "action": {
                                                "type": "message",
                                                "label": "สินค้า OTOP",
                                                "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "วิสัยทัศน์/พันธกิจ") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": "$วิสัยทัศน์/Vision\n\"เมืองน่าอยู่ ประตูเศรษฐกิจสู่อนุภูมิภาคลุ่มแม่น้ำโขง\"\n\n$พันธกิจ/Mission\n\nด้านเศรษฐกิจ\nสร้างความเจริญเติบโตทางเศรษฐกิจให้จังหวัดโดยเพิ่มขีดความสามารถในการแข่งขันของผู้ประกอบการ และประชาชนในพื้นที่เป็นหลัก ควบคู่กับการส่งเสริมการลงทุนจากนักลงทุน SMEs ในท้องถิ่น ระดับประเทศ และระหว่างประเทศในด้านที่จังหวัดมีศักยภาพ\nการพัฒนาเกษตรปลอดสารพิษและอุตสาหกรรมการเกษตรที่เป็นมิตรต่อสิ่งแวดล้อม เพื่อให้จังหวัดนครพนมหลุดพ้นจากจังหวัดที่ประชาชนมีสถานะทางเศรษฐกิจและสังคมในระดับต่ำ ไปสู่จังหวัดที่ประชาชนมีสถานะทางเศรษฐกิจและสังคมในระดับสูงพ้นความยากจน โดยยึดหลักการพัฒนาตามแนวทางปรัชญาของเศรษฐกิจพอเพียง และใช้นวัตกรรม\n\n\nด้านสังคม\nส่งเสริมให้ประชาชนมีคุณภาพชีวิตที่ดี สุขภาพดี ได้รับโอกาสทางการรักษาพยาบาลที่ได้มาตรฐาน ยกระดับไปสู่การรองรับสังคมผู้สูงอายุ\nส่งเสริมให้มีการเข้าถึงโอกาสทางการศึกษาจากหลักสูตรและสถานศึกษาคุณภาพสูง\nส่งเสริมให้มีการประกอบอาชีพและที่มีหลักประกันการดำรงชีวิตที่มั่นคง\nด้านความมั่นคง เสริมสร้างให้ชุมชนเข้มแข็ง พื้นที่ชายแดนปลอดยาเสพติดและภัยคุกคามทุกประเภท ด้วยเทคโนโลยีสารสนเทศที่ทันสมัย สร้างสังคมสันติสุขและมีความสัมพันธ์อันดีกับประเทศเพื่อนบ้าน\n\n\nด้านทรัพยากรธรรมชาติและสิ่งแวดล้อม \nมุ่งสู่การเป็นเมืองพัฒนาที่เป็นมิตรต่อสิ่งแวดล้อมปลอดมลพิษ การบริหารจัดการต้นแบบแห่ง อนุภูมิภาคลุ่มน้ำโขง ด้วยการอนุรักษ์ฟื้นฟูทรัพยากรธรรมชาติและสิ่งแวดล้อมอย่างยั่งยืน โดยเน้นระบวนการ มีส่วนร่วมของทุกภาคส่วน\n\n\nการบริหารจัดการ \nมุ่งเน้นการพัฒนาเพิ่มสมรรถนะบุคลากร กระบวนการทำงานให้มีประสิทธิภาพ สะดวก รวดเร็ว และบูรณาการระบบการบริหารจัดการภาครัฐ เอกชน และประชาชน ด้วยเทคโนโลยีสารสนเทศที่ทันสมัย ไทยแลนด์ 4.0 ภายใต้หลักธรรมาภิบาลขององค์กร เพื่อความโปร่งใส ตรวจสอบได้",
                                "emojis": [
                                    {
                                        "index": 0,
                                        "productId": "5ac21542031a6752fb806d55",
                                        "emojiId": "029"
                                    },
                                    {
                                        "index": 75,
                                        "productId": "5ac21542031a6752fb806d55",
                                        "emojiId": "100"
                                    }
                                ]
                            },
                            {
                                "type": "text",
                                "text": "คุณต้องการทำอะไรต่อ?",

                                "quickReply": {
                                    "items": [{
                                        "type": "action",
                                        "imageUrl": "https://img2.pic.in.th/pic/menu_15164854.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "เมนูหลัก",
                                            "text": "เมนูหลัก"
                                        }
                                    }, {
                                        "type": "action",
                                        "imageUrl": "https://img2.pic.in.th/pic/intermittent-fasting_16862110.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "ร้านอาหาร",
                                            "text": "ร้านอาหาร"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img2.pic.in.th/pic/travel_8112689.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "สถานที่ท่องเที่ยว",
                                            "text": "สถานที่ท่องเที่ยว"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img5.pic.in.th/file/secure-sv1/coffee-shop_10468691.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "ร้านคาเฟ่",
                                            "text": "ร้านคาเฟ่"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img5.pic.in.th/file/secure-sv1/hotel_8112942.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "โรงแรมที่พัก",
                                            "text": "โรงแรมที่พัก"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img5.pic.in.th/file/secure-sv1/calendar_9448652.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "ปฏิทิน",
                                            "text": "ปฏิทิน"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img2.pic.in.th/pic/bangkok_17428608.gif", //แปะรูปไอคอนด้วย
                                        "action": {
                                            "type": "message",
                                            "label": "เที่ยว 7 วัด 7 อำเภอ",
                                            "text": "บอทน้องโก ปรึกษาการเดินทางไหว้พระธาตุ 7 วัดตามอ. ในจังหวัดนครพนม"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img5.pic.in.th/file/secure-sv1/shopping-bag_17093473.gif", //แปะรูปไอคอนด้วย
                                        "action": {
                                            "type": "message",
                                            "label": "สินค้า OTOP",
                                            "text": "สินค้าotop หรือของฝากในนครพนม มีอะไรบ้าง ที่ไหนมีขาย"
                                        }
                                    },
                                    {
                                        "type": "action",
                                        "imageUrl": "https://img5.pic.in.th/file/secure-sv1/more_16046406.gif",
                                        "action": {
                                            "type": "message",
                                            "label": "อื่นๆ",
                                            "text": "อื่นๆ"
                                        }
                                    },
                                    ]
                                }
                            }
                        ]);
                    } else if (textMessage === "เมนูหลัก") {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "imagemap",
                            "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/d06ee487-ab05-4d56-95c8-b78ada076b63",
                            "altText": "Imagemap Menu",
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
                    } else if (textMessage === "ปฏิทิน") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "imagemap",
                                "baseUrl": "https://ex10.tech/store/v1/public/content/upload/imagemap/5e7b5f7e-7aa7-44e8-aafd-e5f8671db4b0",
                                "altText": "Imagemap generator By EX10",
                                "baseSize": {
                                    "width": 1040,
                                    "height": "1471"
                                },
                                "actions": [
                                    {
                                        "type": "message",
                                        "area": {
                                            "x": 21,
                                            "y": 240,
                                            "width": 984,
                                            "height": 1127
                                        },
                                        "text": "รายละเอียดกิจกรรม"
                                    }
                                ]
                            }
                        ]);
                    } else if (textMessage === "รายละเอียดกิจกรรม") {
                        await line.replyWithStateless(event.replyToken, [
                            {
                                "type": "text",
                                "text": " รายละเอียดและกิจกรรมตลอดทั้งปีมีดังนี้\n\nเดือนกุมภาพันธ์\nวันที่ 10-12 งานตรุษจีน ไทย จีน เวียดนาม\nวันที่ 14  งานวันภูไทโลก เรณูนคร\nวันที่ 17-25  งานนมัสการองค์พระธาตุพนม และ งานนมัสการพระธาตุจำปา\n\nเดือนมีนาคม\nวันที่ 21-24  งานนมัสการพระธาตุประสิทธิ์ \nงานประเพณี 5 ชนเผ่า บุญเดือนสี่ ของดีนาหว้า\nวันที่ 22-24  งานนมัสการพระธาตุท่าอุเทน\nงานนมัสการพระธาตุเรณู\nงานนมัสการพระธาตุมหาชัย\nงานนมัสการพระธาตุศรีคุณ\n\nเดือนเมษายน\nวันที่ 13-15  งานสงกรานต์ ถนนข้าวปุ้น\nงานนมัสการพระพุทธบาทเวินปลา\nตลอดทั้งเดือนเมษายน งานสงการนต์ สงน้ำพระธาตุ ประจำวันเกิด 8 พระธาตุ\n\nเดือนพฤษภาคม\nวันที่ 19  งานรำลึกวันคล้ายวันเกิดประธานโฮจิมินห์\nงานเทศกาลวันวิสาขบูชา บุญมหาชาติกวนข้าวทิพย์\n\nเดือนกรกฎาคม\nวันที่ 7-13 งานบวงสรวงพญาศรีสัตตนาคราช\nวันที่ 22 เทศกาลเข้าพรรษา\n\nเดือนกันยายน\nวันที่ 2 งานห่อจ้าวประดับดิน\nในเดือนกันยายน งานเทศกาลกินต่อหัวเสือ อนุรักษ์ภูมิปัญญาท้องถิ่น\nงานวิ่งสะออนรัน\n\nเดือนตุลาคม\nวันเสาร์ที่ 19  วันสัตตนาคารำลึก\nในเดือนตุลาคม งานประเพณีไหลเรือไฟ\nงานสมโภชเจ้าพ่อหมื่น\n\nเดือนพฤศจิกายน\nวันอาทิตย์ที่ 10  งานเดิน-วิ่งข้ามโขง (นครพนม – คำม่วน)\nงานลอยกระทง\n\nเดือนธันวาคม\nวันที่ 25-31 งานเทศกาลส่งท้ายปีเก่าต้อนรับปีใหม่ Nakhonphanom Winter Festival\nในเดือนธันวาคม งานเทศกาลปลาลุ่มน้ำสงคราม"
                              }
                        ]);
                    } else if (weatherKeywords.some(keyword => textMessage.includes(keyword))) {
                        await line.replyWithStateless(event.replyToken, [flex.exampleFlex()]);
                    } else {
                        /* Foward to Dialogflow */
                        //await dialogflow.forwardDialodflow(request),
                        await bot.forwardGemini(request)
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
