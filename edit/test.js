const axios = require('axios'); //json을 받아오기 위함
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Edits = require('../DB/edits-definition');
const uri = process.env.uri; // MongoDB Atlas 연결 URI
const googleMapApiKey = 'AIzaSyBKZmWa9YN7iDFm_PRW4xCprkBjtc3CheY';
//process.env.googleMapApiKey;
//'AIzaSyBKZmWa9YN7iDFm_PRW4xCprkBjtc3CheY';

async function edit(location) {
    const destination_keyword_list = ['산 mountain', '국립공원', '수목원', '식물원', '계곡', '해수욕장', '문화유적', '박물관', '체험학습장', '체험마을', '전망대', '석탑', '카페'];
    let result = [];
    for (let i = 0; i < 3; i++) {
        let searchValue = await searchKeywordWithLocation(location, result, 10000, destination_keyword_list[i]);
        searchValue.sort((a, b) => b.rating - a.rating);
        let cnt = 0;
        for (let j = 0; j < searchValue.length; j++) {
            if (searchValue[j].result_value === 1 && cnt < 1) {
                result.push({ // 여행지 값 저장
                    name: searchValue[j].name, rating: searchValue[j].rating, latitude: searchValue[j].latitude,
                    longitude: searchValue[j].longitude, address: searchValue[j].address, place_id: searchValue[j].place_id,
                    result_value: searchValue[j].result_value, place_id: searchValue[j].place_id,
                    type: "여행지", category: destination_keyword_list[i]
                })
                cnt = cnt + 1;
            }
            else {
                break
            }
        }
    }
    const food_keyword_list = ['한식', '일식', '중식', '양식', '패스트푸드', '구이'];
    for (let i = 0; i < 1; i++) {
        let searchValue = await searchKeywordWithLocation(location, result, 10000, food_keyword_list[i]);
        searchValue.sort((a, b) => b.rating - a.rating);
        let cnt = 0;
        for (let j = 0; j < searchValue.length; j++) {
            if (searchValue[j].result_value === 1 && cnt < 1) {
                result.push({ // 여행지 값 저장
                    name: searchValue[j].name, rating: searchValue[j].rating, latitude: searchValue[j].latitude,
                    longitude: searchValue[j].longitude, address: searchValue[j].address, place_id: searchValue[j].place_id,
                    result_value: searchValue[j].result_value, place_id: searchValue[j].place_id,
                    type: "음식점", category: food_keyword_list[i]
                })
                cnt = cnt + 1;
            }
            else {
                break
            }
        }
    }
    const accommodation_keyword_list = ['호텔', '모텔', '펜션'];
    for (let i = 0; i < 1; i++) {
        let searchValue = await searchKeywordWithLocation(location, result, 10000, accommodation_keyword_list[i]);
        searchValue.sort((a, b) => b.rating - a.rating);
        let cnt = 0;
        for (let j = 0; j < searchValue.length; j++) {
            if (searchValue[j].result_value === 1 && cnt < 1) {
                result.push({ // 여행지 값 저장
                    name: searchValue[j].name, rating: searchValue[j].rating, latitude: searchValue[j].latitude,
                    longitude: searchValue[j].longitude, address: searchValue[j].address, place_id: searchValue[j].place_id,
                    result_value: searchValue[j].result_value, place_id: searchValue[j].place_id,
                    type: "숙소", category: accommodation_keyword_list[i]
                })
                cnt = cnt + 1;
            }
            else {
                break
            }
        }
    }
    console.log(result.length)
    console.log(result)
}

edit('구리시')

// 여행지 탐색 함수(지역 + 키워드 기반)
async function searchKeywordWithLocation(locationName, result, radius, keyword) {
    let result_list = [];
    try {
        // 지역 이름을 기반으로 위치 좌표를 검색
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${googleMapApiKey}&language=ko`;
        const geoResponse = await axios.get(geocodeUrl);
        const location = geoResponse.data.results[0].geometry.location;

        // 좌표와 키워드를 사용하여 장소를 검색
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=${keyword}&key=${googleMapApiKey}&language=ko`;
        const placesResponse = await axios.get(placesUrl);
        const places = placesResponse.data.results;
        if (places.length > 0) {
            for (const place of places) {
                //console.log(places.length)
                const rating = place.rating || 0;
                // place_id가 이미 result 배열에 있는지 확인
                if (rating >= 1 && !result.find(result => result.place_id === place.place_id)) {
                    // 결과 배열에 장소 이름, 별점, 위도, 경도, 주소, 그리고 place_id 저장
                    result_list.push({
                        result_value: 1,
                        name: place.name,
                        rating: place.rating,
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                        address: place.vicinity,
                        place_id: place.place_id
                    });
                    //return result_list;
                }
            }
        } else {
            result_list.push({
                result_value: 0
            });
        }
        return result_list;
    } catch (error) {
        result_list.push({
            result_value: 0
        });
        //console.error(`에러 발생: ${error.message}`);
    }
    return result_list;
}