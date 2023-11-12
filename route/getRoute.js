const axios = require('axios');
require('dotenv').config({ path: '../.env' });
const KAKAO_API_KEY = process.env.kakaoAPI; // 카카오맵 API 키

// 이동 시간 계산을 위한 카카오맵 API 요청 함수
async function getRouteTime(num, locations) {
    try {
        const data = {
            origin: locations[0], // 출발지
            destination: locations[locations.length - 1], // 목적지
            waypoints: locations.slice(1, -1), // 경유지
            priority: 'TIME' // Recommend(추천 경로), Time(최단 시간), Distance(최단 경로) 중 하나 (기본값은 Recommend)
        };
        // POST 요청
        const response = await axios.post('https://apis-navi.kakaomobility.com/v1/waypoints/directions', data, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        // 총 이동 시간 반환
        const totalTime = response.data.routes[0].summary.duration;
        //console.log(`${num}번째 이동시간은 ${totalTime}입니다.`)
        return totalTime;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return null;
    }
}

module.exports = {
    getRouteTime
}