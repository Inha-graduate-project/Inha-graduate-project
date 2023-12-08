// routes 컬렉션 데이터 조회(read)
const Routes = require('../DB/routes-definition');

async function readCourse(req, res) { // 비동기적 동작
    const course_id = req.params.course_id; // 요청에서 user_id 파라미터를 가져오기
    try {
        const routes = await Routes.find({ course_id: course_id }); // user_id를 사용하여 Routes 컬렉션에서 데이터 조회
        if (routes.length === 0) { // 만약 결과가 없다면, 404 상태 코드와 함께 메시지를 응답
            return res.status(404).json({ message: "Course not found" });
        }
        const data = [];
        for (let i = 0; i < routes.length; i++) {
            const user_info = {
                name: routes[i].route_name, // 이름
                title: routes[i].title,
                course_id: routes[i].course_id,
                day: routes[i].route_day, // 여행일
                start_day: routes[i].start_day,
                finish_day: routes[i].finish_day,
                address: routes[i].route_address, // 주소
                location: routes[i].route_location, // 위치(위도와 경도)
                type: routes[i].route_type, // 여행지/음식점/숙소를 나타내는 타입
                price: routes[i].route_price,
                route_imageUrl: routes[i].route_imageUrl,
                food_name: routes[i].food_name,
                food_imageUrl: routes[i].food_imageUrl,
            }
            data.push(user_info);
        }
        res.json(data); // 조회된 데이터를 JSON 형태로 응답
    } catch (error) { // 에러가 발생한 경우, 500 상태 코드와 함께 에러 메시지를 응답
        res.status(500).json({ message: error.message }); // 500: 서버 에러를 총칭하는 에러 코드
    }
}

module.exports = readCourse; // readRoute 함수를 모듈로 export