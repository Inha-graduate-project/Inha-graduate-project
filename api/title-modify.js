// routes collection에 데이터 수정
const Routes = require('../DB/routes-definition.js');

async function modifyTitle(req, res) { // 비동기적 동작
    const course_id = req.params.course_id; // 요청에서 user_id 파라미터를 가져오기
    const titleData = req.body; // 사용자가 수정한 경로 데이터 가져오기
    const newTitle = titleData.newTitle; // 수정할 타이틀
    try {
        Routes.updateMany({ course_id: course_id }, { $set: { title: newTitle } }).then()
        res.status(200).json({ message: `course_id: ${course_id} 의 타이틀이 정상적으로 수정되었습니다.` });
    } catch (error) { // 에러가 발생한 경우, 500 상태 코드와 함께 에러 메시지를 응답
        res.status(500).json({ message: error.message }); // 500: 서버 에러를 총칭하는 에러 코드
    }
}

module.exports = modifyTitle; // modifyRoute 함수를 모듈로 export