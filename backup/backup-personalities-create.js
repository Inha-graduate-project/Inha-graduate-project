// personality collection에 데이터 삽입
const mongoose = require('mongoose');
const Personalities = require('./personalities-definition'); // 스키마 및 모델 파일 가져오기

// MongoDB Atlas 연결 URI
// id: admin, pw: inha2023
const uri = `mongodb+srv://admin:inha2023@cluster0.nv39mvs.mongodb.net/inha-graduate?retryWrites=true&w=majority`;

// Mongoose 연결 설정
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) // 몽고DB와 연결 
    .then(() => {
        console.log("MongoDB Atlas와 연결되었습니다.");

        // 데이터 삽입
        const userData = { // 사용자 데이터 저장
            user_id: 1234, // 중복되지 않는 int 값
            travel_destination: "제주", // 여행지역
            start_day: "20231027", // 여행시작일
            finish_day: "20231028", // 여행종료일
            travel_day: 2, // 여행일
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
            rank_fastfood: 5, // 음식_패스트푸드 우선순위
            rank_meat: 6, // 음식_고기/구이 우선순위
            rank_hotel: 1, // 숙박_호텔 우선순위
            rank_motel: 2, // 숙박_모텔 우선순위
            rank_pension: 3, // 숙박_펜션 우선순위
            transportation: "자동차" // 교통수단
        };

        const newPersonalities = new Personalities(userData); // 사용자 데이터를 저장한 값을 넘겨주기 위한 변수

        newPersonalities.save()
            .then((personalities) => {
                console.log(`컬렉션에 다음의 데이터를 저장합니다. : ${personalities}`);
                mongoose.connection.close(); // MongoDB 연결 종료
            })
            .catch((error) => {
                console.error("컬렉션에 데이터를 저장하는 과정에서 오류가 발생했습니다. :", error);
                mongoose.connection.close(); // 에러 발생 시 MongoDB 연결 종료 시도
            });
    })
    .catch((error) => {
        console.error("MongoDB Atlas와 연결 과정에서 오류가 발생했습니다. :", error);
    });