// 코드 백업용

const mongoose = require('mongoose');

// MongoDB Atlas 연결 URI
const uri = `mongodb+srv://admin:inha2023@cluster0.nv39mvs.mongodb.net/inha-graduate?retryWrites=true&w=majority`

// Mongoose 연결 설정
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");

        // Mongoose 스키마 및 모델 정의
        const Schema = mongoose.Schema;

        const personalitySchema = new Schema({
            user_id: { type: Number, required: true }, // 유저 id 
            travel_destination: { type: String, required: true }, // 여행지역
            start_day: { type: String, required: true }, // 여행시작일
            finish_day: { type: String, required: true }, // 여행종료일
            rank_mountain: { type: Number, required: true }, // 여행지_산 우선순위
            rank_sea: { type: Number, required: true }, // 여행지_바다 우선순위
            rank_valley: { type: Number, required: true }, // 여행지_계곡 우선순위
            rank_historicalTheme: { type: Number, required: true }, // 여행지_역사관광지 우선순위
            rank_experienceTheme: { type: Number, required: true }, // 여행지_체험관광지 우선순위
            rank_buildingTheme: { type: Number, required: true }, // 여행지_건축/조형물 우선순위
            rank_cafe: { type: Number, required: true }, // 여행지_카페 우선순위
            rank_koreanfood: { type: Number, required: true }, // 음식_한식 우선순위
            rank_japanesefood: { type: Number, required: true }, // 음식_일식 우선순위
            rank_chinesefood: { type: Number, required: true }, // 음식_중식 우선순위
            rank_westernfood: { type: Number, required: true }, // 음식_양식 우선순위
            rank_hotel: { type: Number, required: true }, // 숙박_호텔 우선순위
            rank_motel: { type: Number, required: true }, // 숙박_모텔 우선순위
            rank_pension: { type: Number, required: true }, // 숙박_펜션 우선순위
            transportation: { type: String, required: true } // 교통수단
        }, { collection: 'personality' }); // 컬렉션 이름을 명시적으로 지정

        const Personality = mongoose.model('Personality', personalitySchema);

        generateUniqueUserId(Personality)
            .then((uniqueUserId) => {
                // 데이터 삽입
                const userData = {
                    user_id: uniqueUserId, // 중복되지 않는 int 값
                    travel_destination: "제주", // 여행지역
                    start_day: "20231027", // 여행시작일
                    finish_day: "20231028", // 여행종료일
                    rank_mountain: 1, // 여행지_산 우선순위
                    rank_sea: 2, // 여행지_바다 우선순위
                    rank_valley: 3, // 여행지_계곡 우선순위
                    rank_historicalTheme: 4, // 여행지_역사관광지 우선순위
                    rank_experienceTheme: 5, // 여행지_체험관광지 우선순위
                    rank_buildingTheme: 6, // 여행지_건축/조형물 우선순위
                    rank_cafe: 7, // 여행지_카페 우선순위
                    rank_koreanfood: 1, // 음식_한식 우선순위
                    rank_japanesefood: 2, // 음식_일식 우선순위
                    rank_chinesefood: 3, // 음식_중식 우선순위
                    rank_westernfood: 4, // 음식_양식 우선순위
                    rank_hotel: 1, // 숙박_호텔 우선순위
                    rank_motel: 2, // 숙박_모텔 우선순위
                    rank_pension: 3, // 숙박_펜션 우선순위
                    transportation: "자동차" // 교통수단
                };

                const newPersonality = new Personality(userData);

                newPersonality.save()
                    .then((personality) => {
                        console.log(`Personality data saved: ${personality}`);
                        mongoose.connection.close(); // MongoDB 연결 종료
                    })
                    .catch((error) => {
                        console.error("Error saving personality data:", error);
                        mongoose.connection.close(); // 에러 발생 시도 MongoDB 연결 종료
                    });
            })
            .catch((error) => {
                console.error("Error connecting to MongoDB Atlas:", error);
            });
    })

async function generateUniqueUserId(Collection) { // user_id를 unique한 값으로 주기 위한 함수
    let isUnique = false;
    let uniqueUserId;

    while (!isUnique) {
        uniqueUserId = Math.floor(Math.random() * 100000) + 1; // 임의의 user_id 생성 (1~100000 사이)
        const existingUser = await Collection.findOne({ user_id: uniqueUserId }); // 생성한 user_id 값이 이미 존재하는지 확인하기 위한 변수

        if (!existingUser) { // 생성한 user_id 값이 DB에 존재하지 않으면(즉, 중복되지 않으면)
            isUnique = true; // while 문 종료
        }
    }

    return uniqueUserId; // user_id 값 반환
}