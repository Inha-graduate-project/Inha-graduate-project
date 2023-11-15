const Informations = require('../DB/informations-definition.js');
const Personalities = require('../DB/personalities-definition.js');
const perm = require('./permutation.js');
const routeFunc = require('./getRoute.js');
require('dotenv').config({ path: '../.env' });

async function route_ver2(userId) {
    const user = await Personalities.findOne({ user_id: userId });
    const user_info = await Informations.find({ user_id: userId });
    const travel_day = user.travel_day;
    let result = [];
    // 여행이 당일치기인 경우
    if (travel_day === 1) {
        // 버스터미널 정보
        let destinations_seq0 = user_info.filter(info => info.information_seq === 0).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 여행지 정보
        let destinations = user_info.filter(info => info.information_type === '여행지' && info.information_seq !== 0).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        }); // 음식점 정보
        let restaurants = user_info.filter(info => info.information_type === '음식점').map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        let destPermutations = perm.getPermutations(destinations); // 여행지 경우의 수
        let restPermutations = perm.getPermutations(restaurants); // 음식점 경우의 수
        // 여행지 순열에서 가장 빠른 시간을 계산하는 과정
        let best_route_index = await routeFunc.calculation(destPermutations); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_destination1 = destPermutations[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 음식점 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(restPermutations); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        result_restaurant1 = restPermutations[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 삽입
        let result_day1 = [] // 1일차 일정 저장
        for (let i = 0; i < 4; i++) { // 여행지-음식점 번갈아가며 저장
            if (i === 0) {
                result_day1.push(destinations_seq0[0]); // 버스터미널 정보 먼저 삽입
            }
            if (i !== 3) {
                result_day1.push(result_destination1[i]); // 여행지
                result_day1.push(result_restaurant1[i]); // 음식점
            }
            else {
                result_day1.push(result_destination1[i]); // 마지막 여행지
            }
        }
        result.push(result_day1);
        //console.log(result);
    }

    // 여행이 1박 2일인 경우
    else if (travel_day === 2) {
        // 버스터미널 정보
        let destinations_seq0 = user_info.filter(info => info.information_seq === 0).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 1일차 여행지 정보
        let destinations_day1 = user_info.filter(info => info.information_type === '여행지' && info.information_seq !== 0 && info.information_day === 1).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 1일차 음식점 정보
        let restaurants_day1 = user_info.filter(info => info.information_type === '음식점' && info.information_day === 1).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 1일차 숙소 정보
        let accommodations_day1 = user_info.filter(info => info.information_type === '숙소' && info.information_day === 1).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 2일차 여행지 정보
        let destinations_day2 = user_info.filter(info => info.information_type === '여행지' && info.information_day === 2).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 2일차 음식점 정보
        let restaurants_day2 = user_info.filter(info => info.information_type === '음식점' && info.information_day === 2).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });

        let destPermutations1 = perm.getPermutations(destinations_day1); // 1일차 여행지 경우의 수
        let restPermutations1 = perm.getPermutations(restaurants_day1); // 1일차 음식점 경우의 수
        let destPermutations2 = perm.getPermutations(destinations_day2); // 2일차 여행지 경우의 수
        let restPermutations2 = perm.getPermutations(restaurants_day2); // 2일차 음식점 경우의 수
        // 1일차 일정 계산
        // 여행지 순열에서 가장 빠른 시간을 계산하는 과정
        let best_route_index = await routeFunc.calculation(destPermutations1); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_destination1 = destPermutations1[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 음식점 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(restPermutations1); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_restaurant1 = restPermutations1[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 삽입
        let result_day1 = [] // 1일차 일정 저장
        for (let i = 0; i < 4; i++) { // 여행지-음식점 번갈아가며 저장
            if (i === 0) {
                result_day1.push(destinations_seq0[0]); // 버스터미널 정보 먼저 삽입
            }
            if (i !== 3) {
                result_day1.push(result_destination1[i]); // 여행지
                result_day1.push(result_restaurant1[i]); // 음식점
            }
            else {
                result_day1.push(result_destination1[i]); // 마지막 여행지
                result_day1.push(accommodations_day1[0]); // 숙박시설
            }
        }
        result.push(result_day1); // 1일차 일정을 result에 저장
        // 2일차 일정 계산
        // 여행지 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(destPermutations2); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_destination2 = destPermutations2[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 음식점 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(restPermutations2); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_restaurant2 = restPermutations2[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 삽입
        let result_day2 = [] // 2일차 일정 저장
        for (let i = 0; i < 4; i++) { // 여행지-음식점 번갈아가며 저장
            if (i !== 3) {
                result_day2.push(result_destination2[i]); // 여행지
                result_day2.push(result_restaurant2[i]); // 음식점
            }
            else {
                result_day2.push(result_destination2[i]); // 마지막 여행지
            }
        }
        result.push(result_day2); // 2일차 일정을 result에 저장
        //console.log(result);
    }

    // 여행이 2박 3일인 경우
    else if (travel_day === 3) {
        // 버스터미널 정보
        let destinations_seq0 = user_info.filter(info => info.information_seq === 0).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 1일차 여행지 정보
        let destinations_day1 = user_info.filter(info => info.information_type === '여행지' && info.information_seq !== 0 && info.information_day === 1).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 1일차 음식점 정보
        let restaurants_day1 = user_info.filter(info => info.information_type === '음식점' && info.information_day === 1).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 1일차 숙소 정보
        let accommodations_day1 = user_info.filter(info => info.information_type === '숙소' && info.information_day === 1).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 2일차 여행지 정보
        let destinations_day2 = user_info.filter(info => info.information_type === '여행지' && info.information_day === 2).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 2일차 음식점 정보
        let restaurants_day2 = user_info.filter(info => info.information_type === '음식점' && info.information_day === 2).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 2일차 숙소 정보
        let accommodations_day2 = user_info.filter(info => info.information_type === '숙소' && info.information_day === 2).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 3일차 여행지 정보
        let destinations_day3 = user_info.filter(info => info.information_type === '여행지' && info.information_day === 3).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        // 3일차 음식점 정보
        let restaurants_day3 = user_info.filter(info => info.information_type === '음식점' && info.information_day === 3).map(info => {
            return {
                seq: info.information_seq, type: info.information_type, day: info.information_day, name: info.information_name, location: info.information_location, address: info.information_address
            }
        });
        let destPermutations1 = perm.getPermutations(destinations_day1); // 1일차 여행지 경우의 수
        let restPermutations1 = perm.getPermutations(restaurants_day1); // 1일차 음식점 경우의 수
        let destPermutations2 = perm.getPermutations(destinations_day2); // 2일차 여행지 경우의 수
        let restPermutations2 = perm.getPermutations(restaurants_day2); // 2일차 음식점 경우의 수
        let destPermutations3 = perm.getPermutations(destinations_day3); // 2일차 여행지 경우의 수
        let restPermutations3 = perm.getPermutations(restaurants_day3); // 2일차 음식점 경우의 수
        // 1일차 일정 계산
        // 여행지 순열에서 가장 빠른 시간을 계산하는 과정
        let best_route_index = await routeFunc.calculation(destPermutations1); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_destination1 = destPermutations1[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 음식점 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(restPermutations1); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_restaurant1 = restPermutations1[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 삽입
        let result_day1 = [] // 1일차 일정 저장
        for (let i = 0; i < 4; i++) { // 여행지-음식점 번갈아가며 저장
            if (i === 0) {
                result_day1.push(destinations_seq0[0]); // 버스터미널 정보 먼저 삽입
            }
            if (i !== 3) {
                result_day1.push(result_destination1[i]); // 여행지
                result_day1.push(result_restaurant1[i]); // 음식점
            }
            else {
                result_day1.push(result_destination1[i]); // 마지막 여행지
                result_day1.push(accommodations_day1[0]); // 숙박시설
            }
        }
        result.push(result_day1); // 1일차 일정을 result에 저장
        // 2일차 일정 계산
        // 여행지 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(destPermutations2); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_destination2 = destPermutations2[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 음식점 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(restPermutations2); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_restaurant2 = restPermutations2[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 삽입
        let result_day2 = [] // 2일차 일정 저장
        for (let i = 0; i < 4; i++) { // 여행지-음식점 번갈아가며 저장
            if (i !== 3) {
                result_day2.push(result_destination2[i]); // 여행지
                result_day2.push(result_restaurant2[i]); // 음식점
            }
            else {
                result_day2.push(result_destination2[i]); // 마지막 여행지
                result_day2.push(accommodations_day2[0]); // 숙박시설
            }
        }
        result.push(result_day2); // 2일차 일정을 result에 저장

        // 3일차 일정 계산
        // 여행지 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(destPermutations3); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_destination3 = destPermutations3[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 음식점 순열에서 가장 빠른 시간을 계산하는 과정
        best_route_index = await routeFunc.calculation(restPermutations3); // 여행지 순열에서 가장 빠른 시간을 계산, 인덱스 반환
        let result_restaurant3 = restPermutations3[best_route_index]; // 해당 인덱스에 해당하는 순열 정보 저장
        // 삽입
        let result_day3 = [] // 2일차 일정 저장
        for (let i = 0; i < 4; i++) { // 여행지-음식점 번갈아가며 저장
            if (i !== 3) {
                result_day3.push(result_destination3[i]); // 여행지
                result_day3.push(result_restaurant3[i]); // 음식점
            }
            else {
                result_day3.push(result_destination3[i]); // 마지막 여행지
            }
        }
        result.push(result_day3); // 3일차 일정을 result에 저장
        //console.log(result);
    }
    return result;
}

module.exports = route_ver2;