async function searchKeyword(latitude, longitude, radius, results, keyword) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${googleMapApiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // place_id가 이미 results 배열에 있는지 확인
        if (data.results.length > 0) {
            for (const place of data.results) {
                const rating = place.rating || 0;

                // place_id가 이미 results 배열에 있는지 확인
                if (rating >= 1 && !results.find(result => result.place_id === place.place_id)) {
                    console.log(`${keyword} 목적지: ${place.name}, 별점: ${rating}`);

                    // 결과 배열에 장소 이름, 별점, 위도, 경도, 주소, 그리고 place_id 저장
                    results.push({
                        name: place.name,
                        rating: place.rating,
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                        address: place.vicinity,
                        place_id: place.place_id
                    });

                    return true;
                }
            }
        } else {
            console.log(`${keyword} 목적지 검색 결과가 없습니다.`);
        }
    } catch (error) {
        console.error(`에러 발생: ${error.message}`);
    }

    return false;
}

async function processKeywords() {
    const sortedKeywords = Object.entries(data)
        .filter(([key, value]) => value.count > 0) //count가 0인지 체크
        .sort((a, b) => a[1].rank - b[1].rank); //rank 오름차순으로 정렬

    while (sortedKeywords.length > 0) { //위 두 조건을 만족시켜서 sortedKeywords에 들어있음

        let keywordFound = false;

        for (const [key, value] of sortedKeywords) {
            if (value.count === 0) {
                continue; // count가 0인 키워드는 건너뛰기
            }

            for (const keyword of value.keywords) {
                if (value.count === 0) {
                    break; // count가 0이면 종료
                }
                if (await searchKeyword(keyword)) {
                    value.count--; //카운트 감소
                    keywordFound = true;
                    break;
                }
            }
        }

        //5km증가시길때 조건을 잘따져야함
        if (!keywordFound) {
            // 결과를 찾지 못한 경우, 최하위 키워드에서 최상위로 순환
            const lastKeyword = sortedKeywords.pop();
            sortedKeywords.unshift(lastKeyword);
        }

        const allCountsZero = sortedKeywords.every(([key, value]) => value.count === 0);
        if (allCountsZero) {
            // 모든 count가 0이면 반복 종료
            break;
        }

    }
}