const Personalities = require('../DB/personalities-definition.js');
const Informations = require('../DB/informations-definition.js');
const selectDestination = require('../select/selectDestination.js');
const Routes = require('../DB/routes-definition.js');
const route_ver2 = require('../route/route_ver2.js');

async function recommend(req, res) {
    // 1. 사용자 취향 저장
    const userData = req.body; // 클라이언트로부터 받은 데이터를 userData 변수에 저장
    let userId; // 유저 id
    let isUnique = false; // 유저 id 생성을 위한 변수

    while (!isUnique) { // 유저 id 생성과정
        // 1과 100000 사이의 랜덤한 정수로 user_id 생성
        userId = Math.floor(Math.random() * (100000)) + 1;

        // user_id의 고유성을 DB에서 검사
        const existingUserId = await Personalities.findOne({ user_id: userId });
        if (!existingUserId) {
            isUnique = true;
        }
    }
    userData.user_id = userId; // 위에서 생성한 user_id를 할당
    const newPersonalities = await new Personalities(userData); // 받은 데이터를 사용해 newPersonalities 객체를 생성
    await newPersonalities.save() // newPersonalities 객체를 DB에 저장
        .then(() => {
            console.log(`user_id: ${userId} 의 사용자 취향이 성공적으로 저장되었습니다.`)
        })
        .catch(() => {
            console.log(`사용자 취향 저장에 다음의 이유로 실패했습니다: ${error.message}`);
        });
    //res.status(200).json({ message: `user_id: ${userId} 의 모든 사용자 취향이 정상적으로 저장되었습니다.` });

    // 2. 사용자 취향 바탕으로 여행지 조사
    let user_info_list = await selectDestination(userId); // 여행지 정보 배열
    // user_info_list 배열의 각 요소를 순회하며 DB에 저장
    for (const info of user_info_list) {
        // 새로운 정보 인스턴스 생성
        const user_info = {
            user_id: userId, // 유저 id
            information_name: info.name, // 장소 이름
            information_seq: info.seq,
            information_day: info.day,
            information_location: { latitude: info.latitude, longitude: info.longitude },
            information_address: info.address,
            information_type: info.type
        }
        const newInformation = new Informations(user_info);
        // 정보를 DB에 저장
        await newInformation.save()
    }
    console.log(`user_id: ${userId} 의 여행지가 정상적으로 저장되었습니다.`);
    //res.status(200).json({ message: `user_id: ${userId} 의 모든 여행지가 정상적으로 저장되었습니다.` });

    // 3. 경로 계산
    user_info_list = await route_ver2(userId); // 경로 정보 배열
    // user_info_list 배열의 각 요소를 순회하며 DB에 저장
    for (let i = 0; i < user_info_list.length; i++) {
        for (const info of user_info_list[i]) {
            // 새로운 정보 인스턴스 생성
            const user_info = {
                user_id: userId, // 유저 id
                route_name: info.name, // 장소 이름
                route_day: info.day,
                route_location: info.location,
                route_address: info.address,
                route_type: info.type
            }
            const newRoute = new Routes(user_info);
            // 정보를 DB에 저장
            await newRoute.save();
        }
    }
    console.log(`user_id: ${userId} 의 경로가 정상적으로 저장되었습니다.`);
    //res.status(200).json({ message: `user_id: ${userId} 의 모든 경로가 정상적으로 저장되었습니다.` });

    // 4. 경로 반환
    const routes = await Routes.find({ user_id: userId }); // user_id를 사용하여 Routes 컬렉션에서 데이터 조회
    if (routes.length === 0) { // 만약 결과가 없다면, 404 상태 코드와 함께 메시지를 응답
        return res.status(404).json({ message: "User not found" });
    }
    const data = [];
    for (const info of routes) {
        const user_info = {
            name: info.route_name, // 이름
            day: info.route_day, // 여행일
            address: info.route_address, // 주소
            location: info.route_location, // 위치(위도와 경도)
            type: info.route_type // 여행지/음식점/숙소를 나타내는 타입
        }
        data.push(user_info)
    }
    console.log(`user_id: ${userId} 의 경로를 반환합니다.`)
    res.json({
        user_id: userId,
        data: data
    }); // 조회된 데이터를 JSON 형태로 응답
}

module.exports = recommend;