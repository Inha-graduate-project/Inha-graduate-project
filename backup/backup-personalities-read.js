// personality 컬렉션 데이터 조회(read)
const mongoose = require('mongoose');
const Personalities = require('../personalities-definition'); // 모델 정의 파일

// MongoDB Atlas 연결 URI
const uri = `mongodb+srv://admin:inha2023@cluster0.nv39mvs.mongodb.net/inha-graduate?retryWrites=true&w=majority`;

// Mongoose 연결 설정
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Atlas와 연결되었습니다.");

        const targetUserId = 72464; // 원하는 user_id를 입력

        // 해당 user_id에 해당하는 데이터를 찾는 과정
        Personalities.findOne({ user_id: targetUserId })
            .then((personalities) => {
                if (personalities) {
                    console.log(`Personality data for user_id: ${targetUserId}:`, personalities);
                    const travel_destination = personalities.travel_destination;
                    console.log(`travel_destination 값은 ${travel_destination}`)
                } else {
                    console.log(`Personalities data for user_id: ${targetUserId} not found.`);
                }
                mongoose.connection.close(); // MongoDB 연결 종료
            })
            .catch((error) => {
                console.error("데이터 조회에 실패했습니다. :", error);
                mongoose.connection.close(); // 에러 발생 시 MongoDB 연결 종료 시도
            });
    })
    .catch((error) => {
        console.error("MongoDB Atlas와 연결 과정에서 오류가 발생했습니다. :", error);
    });