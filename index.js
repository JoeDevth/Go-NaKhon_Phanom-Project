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

                    if (textMessage === "สวัสดี") {

                        console.log([{
                            "type": "text",
                            "text": JSON.stringify(event),
                        }]);

                        profile = await line.getProfile(event.source.userId)
                        console.log('profile', profile);
                        await line.replyWithStateless(event.replyToken, [flex.examplePostback(JSON.stringify(profile))])


                    }  else if (textMessage === "สถานที่ท่องเที่ยว") {

                        await line.replyWithStateless(event.replyToken, [flex.exampleFlex()])

                    } else if (textMessage === "ร้านอาหาร") {

                        await line.replyWithStateless(event.replyToken, [flex.restaurant()])

                    } else if (textMessage === "ร้านคาเฟ่") {

                        await line.replyWithStateless(event.replyToken, [flex.cafegood()])

                    } else if (textMessage === "4") {

                        profile = await line.getProfile(event.source.userId)
                        console.log('profile', profile);
                        await line.replyWithStateless(event.replyToken, [flex.examplePostback(JSON.stringify(profile))])

                    } else if (textMessage === "แผนที่หลัก") {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "imagemap",
                            "baseUrl": "https://www.nakhonpanom.com/wp-content/uploads/2023/07/357521243_717367680398404_3279286131874078030_n-1.jpg",
                            "altText": "Imagemap",
                            "baseSize": {
                                "width": 1040,
                                "height": "1500"
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
                            }]
                        }])

                    } else if (textMessage === "เมนูหลัก") {

                        await line.replyWithStateless(event.replyToken, [{
                            "type": "text",
                            "text": `วันนี้ทำอะไรดีครับ`,
                            "quickReply": {
                                "items": [{
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