// informations collection 정의
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const informationsSchema = new Schema({
    // 스키마 정의
    user_id: { type: Number, required: true }, // 유저 id 
    information_seq: { type: Number, required: true }, // 시퀀스(여행지 순서 값)
    information_day: { type: Number, required: true }, // 몇일 차 여행일인지 저장하는 값(1일차인지, 2일차인지, 3일차인지)
    information_location: { type: Object, required: true }, // 위도 및 경도 정보
    information_address: { type: String, required: true }, // 주소
    information_type: { type: String, required: true }, // 타입(여행지, 음식점, 숙소)
    information_cost: { type: Number, required: false } // 경비
}, { collection: 'informations' });

const Informations = mongoose.model('informations', informationsSchema);

module.exports = Informations; // 모델을 export