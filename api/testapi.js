// informations collection에 데이터 삽입 -> route
const Informations = require('../DB/informations-definition.js');
const selectDestination = require('../select/selectDestination.js');
const setBudget = require('../budget/setBudget.js');

async function saveInformation(req, res) { // 비동기적 동작
    const userId = req.params.user_id; // 요청에서 user_id 파라미터를 가져오기

    try {
        const user_info_list = await selectDestination(userId); // 여행지 정보 배열
        //const informatiin_cost = await setBudget(user_info_list); // 여행 경비
        let information = await setBudget(user_info_list);

        // user_info_list 배열의 각 요소를 순회하며 DB에 저장
        for (const info of information) {
            // 새로운 정보 인스턴스 생성
            const user_info = {
                user_id: userId, // 유저 id
                information_name: info.name, // 장소 이름
                information_seq: info.seq,
                information_day: info.day,
                information_location: { latitude: info.latitude, longitude: info.longitude },
                information_address: info.address,
                information_type: info.type,
                information_price: info.price
            }

            const newInformation = new Informations(user_info);
            // 정보를 DB에 저장
            await newInformation.save();
        }

        console.log(information.price);

        res.status(200).json({ message: '모든 여행지가 정상적으로 저장되었습니다.' });

    } catch (error) { // 에러가 발생한 경우, 500 상태 코드와 함께 에러 메시지를 응답
        res.status(500).json({ message: error.message }); // 500: 서버 에러를 총칭하는 에러 코드
    }

}

module.exports = saveInformation; // saveInformation 함수를 모듈로 export