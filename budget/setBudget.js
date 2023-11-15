require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
// 크롤링
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// 네이버 검색 API 설정
const clientId = 'AfAzivwXSOL4dgdQlTal';
const clientSecret = 'I7ji_nVKU6';

let accommodationPrice = 0;
let menuPrice = 0;
let travelPrice = 0;

// (다른 곳 || 플레이스 ) 더보기가 있는 경우, 더보기 링크를 이용하여 진입
async function clickOtherOrPlaceMoreBtn(driver, placeName, placeAddress, type) {
    let existMoreBtn = false;

    let moreBtnList = await driver.findElements(By.className('group_more'));
    if (moreBtnList != undefined) {
        for (var i = 0; i < moreBtnList.length; i++) {
            let moreBtn = await moreBtnList[i].findElements(By.className('etc'));
            if (moreBtn != undefined) {
                const moreBtnText = await moreBtnList[i].getText();
                if (moreBtnText.includes("플레이스") || moreBtnText.includes("다른 곳")) {
                    existMoreBtn = true;
                    // 현재 창을 새로운 창으로 변경
                    const link = await moreBtnList[i].getAttribute('href');
                    await driver.executeScript("window.location.href = arguments[0];", link);

                    // frame 변경
                    await sleep(3000);
                    iframeElement = await driver.findElement(By.id('searchIframe'));
                    await driver.switchTo().frame(iframeElement);

                    let etcPlaceList = await driver.findElements(By.className('YwYLL'));
                    let etcAdrBtns = await driver.findElements(By.className('uFxr1'));

                    // searchIframe 안에 나온 검색 결과의 주소를 비교
                    for (var i = 0; i < etcAdrBtns.length; i++) {
                        try {
                            await etcAdrBtns[i].click();
                        } catch { }
                        let etcAdrList = await driver.findElements(By.className('zZfO1'));
                        let roadAdr = await etcAdrList[0].getText();
                        let randAdr = await etcAdrList[1].getText();
                        let splitRoadAdr = roadAdr.replace(/도로명|복사/g, "").trim();
                        let splitRandAdr = randAdr.replace(/지번|복사/g, "").trim();

                        // 주소가 일치하는 경우 해당 장소를 클릭하여, entryIframe 호출
                        if (((splitRoadAdr.includes(placeAddress)) || (placeAddress.includes(splitRoadAdr)))
                            || (splitRandAdr.includes(placeAddress) || placeAddress.includes(splitRandAdr))) {
                            await etcPlaceList[i].click();

                            // 해당 iframe으로 전환
                            await sleep(3000);
                            await driver.switchTo().defaultContent();
                            iframeElement = await driver.findElement(By.id('entryIframe'));
                            await driver.switchTo().frame(iframeElement);
                            await sleep(3000);

                            await getPrice(driver, type);
                        } else console.log("DB에서 가져온 주소와 일치하는 장소가 없습니다.");
                    }
                }
            }
        }
    }
}

// placeName을 포함하는 더보기 버튼 클릭a
// place가 여러개인 경우
async function clickPlaceMoreBtn(driver, placeName, placeAddress, type) {
    let moreBtnList = await driver.findElements(By.className('group_more'));
    if (moreBtnList != undefined) {
        for (var i = 0; i < moreBtnList.length; i++) {
            let moreBtn = await moreBtnList[i].findElements(By.className('etc'));
            if (moreBtn != undefined) {
                const moreBtnText = await moreBtnList[i].getText();
                let placeList = await driver.findElements(By.className('YwYLL'));
                if (moreBtnText.includes(placeName) && placeList.length > 0) {
                    existMoreBtn = true;
                    // 현재 창을 새로운 창으로 변경
                    const link = await moreBtnList[i].getAttribute('href');
                    await driver.executeScript("window.location.href = arguments[0];", link);

                    // frame 변경
                    await sleep(3000);
                    iframeElement = await driver.findElement(By.id('searchIframe'));
                    await driver.switchTo().frame(iframeElement);

                    let etcPlaceList = await driver.findElements(By.className('YwYLL'));
                    let etcAdrBtns = await driver.findElements(By.className('uFxr1'));

                    // searchIframe 안에 나온 검색 결과의 주소를 비교
                    for (var i = 0; i < etcAdrBtns.length; i++) {
                        try {
                            await etcAdrBtns[i].click();
                        } catch { }
                        let etcAdrList = await driver.findElements(By.className('zZfO1'));
                        let roadAdr = await etcAdrList[0].getText();
                        let randAdr = await etcAdrList[1].getText();
                        let splitRoadAdr = roadAdr.replace(/도로명|복사/g, "").trim();
                        let splitRandAdr = randAdr.replace(/지번|복사/g, "").trim();

                        // 주소가 일치하는 경우 해당 장소를 클릭하여, entryIframe 호출
                        if (((splitRoadAdr.includes(placeAddress)) || (placeAddress.includes(splitRoadAdr)))
                            || (splitRandAdr.includes(placeAddress) || placeAddress.includes(splitRandAdr))) {
                            await etcPlaceList[i].click();

                            // 해당 iframe으로 전환
                            await sleep(3000);
                            await driver.switchTo().defaultContent();
                            iframeElement = await driver.findElement(By.id('entryIframe'));
                            await driver.switchTo().frame(iframeElement);
                            await sleep(3000);

                            await getPrice(driver, type);
                        } else console.log("DB에서 가져온 주소와 일치하는 장소가 없습니다.");
                    }
                }
            }
        }
    }
}

// 결과값이 하나인 경우
// (다른 곳) 더보기에 안들어가도 되는 경우
// (다른 곳)에서 찾아야 하는 경우 -> 맵에서 검색
async function searchOtherPlace(driver, placeName, placeAddress, type) {
    adrBtn = await driver.findElements(By.className('PkgBl'));
    await adrBtn[0].click();
    await sleep(3000);

    let adrs = await driver.findElements(By.className('nQ7Lh'));
    let roadAdr = await adrs[0].getText();
    let randAdr = await adrs[1].getText();
    let splitRoadAdr = roadAdr.replace(/도로명|복사/g, "").trim();
    let splitRandAdr = randAdr.replace(/지번|복사/g, "").trim();
    if (((splitRoadAdr.includes(placeAddress)) || (placeAddress.includes(splitRoadAdr)))
        || (splitRandAdr.includes(placeAddress) || placeAddress.includes(splitRandAdr))) {
        let link = await driver.findElement(By.className('Fc1rA'));
        await link.click();

        const windowHandles = await driver.getAllWindowHandles();
        const newWindowHandle = windowHandles[1];
        await driver.switchTo().window(newWindowHandle);

        await sleep(3000);
        let iframeElement = await driver.findElement(By.id('entryIframe'));
        await driver.switchTo().frame(iframeElement);
        await sleep(3000);

        await getPrice(driver, type);
    }
    else {
        // 네이버 맵에서 검색해서 찾기
        await driver.get("https://map.naver.com/p/search/" + placeName);
        await sleep(3000);
        iframeElement = await driver.findElement(By.id('searchIframe'));
        await driver.switchTo().frame(iframeElement);

        let etcPlaceList = await driver.findElements(By.className('YwYLL'));
        let etcAdrBtns = await driver.findElements(By.className('uFxr1'));

        // searchIframe 안에 나온 검색 결과의 주소를 비교
        for (var i = 0; i < etcAdrBtns.length; i++) {
            try {
                await etcAdrBtns[i].click();
            } catch { }
            let etcAdrList = await driver.findElements(By.className('zZfO1'));
            let roadAdr = await etcAdrList[0].getText();
            let randAdr = await etcAdrList[1].getText();
            let splitRoadAdr = roadAdr.replace(/도로명|복사/g, "").trim();
            let splitRandAdr = randAdr.replace(/지번|복사/g, "").trim();

            // 주소가 일치하는 경우 해당 장소를 클릭하여, entryIframe 호출
            if (((splitRoadAdr.includes(placeAddress)) || (placeAddress.includes(splitRoadAdr)))
                || (splitRandAdr.includes(placeAddress) || placeAddress.includes(splitRandAdr))) {
                await etcPlaceList[i].click();

                // 해당 iframe으로 전환
                await sleep(3000);
                await driver.switchTo().defaultContent();
                iframeElement = await driver.findElement(By.id('entryIframe'));
                await driver.switchTo().frame(iframeElement);
                await sleep(3000);

                await getPrice(driver, type);
            } else console.log("DB에서 가져온 주소와 일치하는 장소가 없습니다.");
        }
    }
}

// 결과값이 여러개인 경우
// (플레이스 || 다른 곳 || placeName) 더보기가 없는 경우
// nextBtn 이 있는 경우
// 맵에서 검색
async function searchOthersPlace(driver, placeName, placeAddress, type) {
    let nextBtn = await driver.findElements(By.className('cmm_pg_next'));
    if (nextBtn != undefined && nextBtn.length > 0) {
        // 네이버 맵에서 검색해서 찾기
        await driver.get("https://map.naver.com/p/search/" + placeName);
        await sleep(3000);
        iframeElement = await driver.findElement(By.id('searchIframe'));
        await driver.switchTo().frame(iframeElement);

        let etcPlaceList = await driver.findElements(By.className('YwYLL'));
        let etcAdrBtns = await driver.findElements(By.className('uFxr1'));

        // searchIframe 안에 나온 검색 결과의 주소를 비교
        for (var i = 0; i < etcAdrBtns.length; i++) {
            try {
                await etcAdrBtns[i].click();
            } catch { }
            let etcAdrList = await driver.findElements(By.className('zZfO1'));
            let roadAdr = await etcAdrList[0].getText();
            let randAdr = await etcAdrList[1].getText();
            let splitRoadAdr = roadAdr.replace(/도로명|복사/g, "").trim();
            let splitRandAdr = randAdr.replace(/지번|복사/g, "").trim();

            // 주소가 일치하는 경우 해당 장소를 클릭하여, entryIframe 호출
            if (((splitRoadAdr.includes(placeAddress)) || (placeAddress.includes(splitRoadAdr)))
                || (splitRandAdr.includes(placeAddress) || placeAddress.includes(splitRandAdr))) {
                await etcPlaceList[i].click();

                // 해당 iframe으로 전환
                await sleep(3000);
                await driver.switchTo().defaultContent();
                iframeElement = await driver.findElement(By.id('entryIframe'));
                await driver.switchTo().frame(iframeElement);
                await sleep(3000);

                await getPrice(driver, type);
            } else console.log("DB에서 가져온 주소와 일치하는 장소가 없습니다.");
        }
    }
}

async function getPrice(driver, type) {
    if (type == '숙소') { //객실, 플랫폼, 표
        let loadPriceWayOneContainer = await driver.findElements(By.css('th[scope="rowgroup"] em'));
        let loadPriceWayTwo = await driver.findElements(By.css('.aqscI em'));
        let loadPriceWayThree = await driver.findElements(By.css('.QW7xr em'));
        if (loadPriceWayOneContainer != undefined && loadPriceWayOneContainer.length > 0) {
            let loadPriceWayOne = await loadPriceWayOneContainer[0].getText();
            accommodationPrice = loadPriceWayOne.replace(/[^\d]/g, '');
        }
        else if (loadPriceWayTwo != undefined && loadPriceWayTwo.length > 0) {
            accommodationPrice = await loadPriceWayTwo[0].getText();
            accommodationPrice = accommodationPrice.replace(/[^\d]/g, '');
        }
        else if (loadPriceWayThree != undefined && loadPriceWayThree.length > 0) {
            accommodationPrice = await loadPriceWayThree[0].getText();
            accommodationPrice = accommodationPrice.replace(/[^\d]/g, '');
        }
        else {
            accommodationPrice = 0;
        }
    }
    else if (type == '음식점') {
        let menuButton = await driver.findElements(By.className('tpj9w'));
        if (menuButton != undefined && menuButton.length > 0) {
            for (var i = 0; i < menuButton.length; i++) {
                if (await menuButton[i].getText() == '메뉴') {
                    const link = await menuButton[i].getAttribute('href');
                    await driver.executeScript("window.location.href = arguments[0];", link);

                    let menuPriceWrap = await driver.findElements(By.className('GXS1X'));
                    menuPrice = await menuPriceWrap[0].getText();
                    menuPrice = menuPrice.replace(/[^\d]/g, '');
                    break;
                }
            }
        }
        else {
            menuPrice = 0;
        }
    }
    else if (type == '여행지') {
        let priceWrap = await driver.findElements(By.className('CLSES'));
        if (priceWrap.length > 0) {
            for (var i = 0; i < priceWrap.length; i++) {
                if (await priceWrap[i].getText() == '무료') {
                    travelPrice = 0;
                    break;
                }
                else {
                    let priceText = await priceWrap[i].getText();
                    travelPrice = priceText.replace(/[^\d]/g, '');
                    break;
                }
            }
        }
        else {
            priceWrap = await driver.findElements(By.css('.CTesk em'));
            if (priceWrap.length > 0) {
                let priceText = await priceWrap[0].getText();
                travelPrice = priceText.replace(/[^\d]/g, '');
            }
        }
    }
}

async function setBudget(user_info_list) {
    //var type = "여행지";
    //var placeName = "아쿠아플라넷 63";
    //var placeAddress = "영등포구 63로 50";

    const results = [];

    for (var i = 0; i < user_info_list.length; i++) {
        accommodationPrice = 0;
        menuPrice = 0;
        travelPrice = 0;

        var type = user_info_list[i].type;
        var placeName = user_info_list[i].name;
        var placeAddress = user_info_list[i].address;

        try {
            let driver = await new Builder().forBrowser('chrome').build();
            await driver.get('https://www.naver.com/');

            let searchInput = await driver.findElement(By.id('query'));
            searchInput.sendKeys(placeName, Key.ENTER);
            await driver.wait(until.elementLocated(By.css('#header_wrap')), 10000);
            await sleep(3000);

            try {
                if (checkPrice) await clickOtherOrPlaceMoreBtn(driver, placeName, placeAddress, type);
                if (checkPrice) await clickPlaceMoreBtn(driver, placeName, placeAddress, type);
                if (checkPrice) await searchOtherPlace(driver, placeName, placeAddress, type);
                if (checkPrice) await searchOthersPlace(driver, placeName, placeAddress, type);
            } catch {
                console.log(accommodationPrice + " " + menuPrice + " " + travelPrice);
            }

        } finally {
            //await driver.quit();
            if (type == '숙소') {
                if (accommodationPrice == 0) accommodationPrice = 100000;
                results.push({
                    seq: user_info_list.seq, day: user_info_list.day, name: user_info_list.name, latitude: user_info_list.latitude, longitude: user_info_list.longitude, address: user_info_list.address, type: user_info_list.type, price: accommodationPrice
                })
                //console.log(accommodationPrice);
            }
            else if (type == '음식점') {
                if (menuPrice == 0) menuPrice = 15000;
                results.push({
                    seq: user_info_list.seq, day: user_info_list.day, name: user_info_list.name, latitude: user_info_list.latitude, longitude: user_info_list.longitude, address: user_info_list.address, type: user_info_list.type, price: menuPrice
                })
                //console.log(menuPrice);
            }
            else if (type == '여행지') {
                if (travelPrice == 0) travelPrice = 10000;
                results.push({
                    seq: user_info_list.seq, day: user_info_list.day, name: user_info_list.name, latitude: user_info_list.latitude, longitude: user_info_list.longitude, address: user_info_list.address, type: user_info_list.type, price: travelPrice
                })
                //console.log(travelPrice);
            }
        }
    }
    console.log("Finish!");
    return results;
}

function checkPrice() {
    if (menuPrice != 0 || accommodationPrice != 0 || travelPrice != 0) return true;
    else return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = setBudget; // saveBudget 함수를 모듈로