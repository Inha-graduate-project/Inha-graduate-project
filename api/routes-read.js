// routes 컬렉션 데이터 조회(read)
const Routes = require('../DB/routes-definition');

async function readRoute(req, res) { // 비동기적 동작
    const userId = req.params.user_id; // 요청에서 user_id 파라미터를 가져오기
    try {
        const routes = await Routes.find({ user_id: userId }); // user_id를 사용하여 Routes 컬렉션에서 데이터 조회
        if (routes.length === 0) { // 만약 결과가 없다면, 404 상태 코드와 함께 메시지를 응답
            return res.status(404).json({ message: "User not found" });
        }
        const data = [];
        const course_id_data = [];
        // 코스 id 분류
        for (let i = 0; i < routes.length; i++) {
            if (!course_id_data.find(course_id_data => course_id_data.course_id === routes[i].course_id)) {
                course_id_data.push({
                    course_id: routes[i].course_id,
                    title: routes[i].title,
                    start_day: routes[i].start_day,
                    finish_day: routes[i].finish_day
                })
            }
        }
        // 코스 정보
        for (let i = 0; i < course_id_data.length; i++) {
            courseData = [];
            for (let j = 0; j < routes.length; j++) {
                if (course_id_data[i].course_id === routes[j].course_id) {
                    const user_info = {
                        name: routes[j].route_name, // 이름
                        title: routes[j].title,
                        course_id: routes[j].course_id,
                        day: routes[j].route_day, // 여행일
                        address: routes[j].route_address, // 주소
                        location: routes[j].route_location, // 위치(위도와 경도)
                        type: routes[j].route_type, // 여행지/음식점/숙소를 나타내는 타입
                        price: routes[j].route_price,
                        route_imageUrl: routes[j].route_imageUrl,
                        food_name: routes[j].food_name,
                        food_imageUrl: routes[j].food_imageUrl,
                    }
                    courseData.push(user_info);
                }
            }
            data.push({
                course_id: course_id_data[i].course_id,
                title: course_id_data[i].title,
                start_day: course_id_data[i].start_day,
                finish_day: course_id_data[i].finish_day,
                data: courseData,
            });
        }
        res.json(data); // 조회된 데이터를 JSON 형태로 응답
    } catch (error) { // 에러가 발생한 경우, 500 상태 코드와 함께 에러 메시지를 응답
        res.status(500).json({ message: error.message }); // 500: 서버 에러를 총칭하는 에러 코드
    }
}

module.exports = readRoute; // readRoute 함수를 모듈로 export