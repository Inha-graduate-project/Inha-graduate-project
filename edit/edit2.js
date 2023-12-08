const axios = require('axios'); //json을 받아오기 위함
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Edits = require('../DB/edits-definition');
const uri = process.env.uri; // MongoDB Atlas 연결 URI
const googleMapApiKey = process.env.googleMapApiKey;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' }) // DB 연결
    .then(() => console.log('MongoDB가 연결되었습니다.'))
    .catch(error => console.log('MongoDB 연결에 실패했습니다: ', error));

location = ['창원', '거제', '김해', '밀양', '사천', '양산', '진주', '통영', '거창', '경상남도 고성군', '남해', '산청', '의령', '창녕', '하동', '함안', '함양', '합천'];

async function edit(location) {
    for (let i = 0; i < location.length; i++) {
        city = location[i]
        console.log(`${city}의 image 검색을 시작합니다.`)
        const edits = await Edits.find({ edit_city: city }); // edit_city를 사용하여 Edits 컬렉션에서 데이터 조회
        for (let j = 0; j < edits.length; j++) {
            place_id = edits[j].edit_placeID;
            const image_url = await searchIMG(place_id);
            // console.log(image_url); // image_url 출력
            await Edits.updateOne({ edit_city: city, edit_placeID: place_id }, { $set: { edit_imageurl: image_url } }).then()
        }
        console.log(`${city}의 image 검색을 완료했습니다.`)
    }
    console.log("DB 저장 완료")
    mongoose.connection.close(); // DB 연결 종료
}

edit(location)

async function searchIMG(place_id) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${googleMapApiKey}`;
    try {
        const response = await axios.get(url);
        const placeDetails = response.data;

        if (placeDetails.status === 'OK') {
            const photoReference = placeDetails.result.photos[0].photo_reference;
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleMapApiKey}`;
            return photoUrl;
        } else {
            return '';
        }
    } catch (error) {
        return '';
    }
}

