const Routes = require('../DB/routes-definition');

async function removeRoute(req, res) {
    const course_id = req.params.course_id; // 요청에서 user_id 파라미터를 가져오기
    if (course_id.length === 0) { // 만약 결과가 없다면, 404 상태 코드와 함께 메시지를 응답
        return res.status(404).json({ message: "Course not found" });
    }
    Routes.deleteMany({ course_id: course_id })
        .then(res.status(200).json({ message: `course_id: ${course_id} 코스가 삭제되었습니다.` }));
}

module.exports = removeRoute;