// styles-map.js

// 이미지 업로드와 결과 표시 요소 가져오기
const topInput = document.getElementById("topInput");
const bottomInput = document.getElementById("bottomInput");
const outerInput = document.getElementById("outerInput");
const bagInput = document.getElementById("bagInput");
const shoesInput = document.getElementById("shoesInput");

const topPreview = document.getElementById("topPreview");
const bottomPreview = document.getElementById("bottomPreview");
const outerPreview = document.getElementById("outerPreview");
const bagPreview = document.getElementById("bagPreview");
const shoesPreview = document.getElementById("shoesPreview");

const combineButton = document.getElementById("combineButton");
const combinedResult = document.getElementById("combinedResult");
const downloadButtonContainer = document.getElementById("downloadButtonContainer");
const downloadLink = document.getElementById("downloadLink");

// 이미지 업로드 및 미리보기 함수
function handleImageUpload(inputElement, previewElement) {
    inputElement.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                previewElement.style.backgroundImage = `url(${reader.result})`;
                previewElement.style.backgroundSize = "cover";
                previewElement.style.backgroundPosition = "center";
                previewElement.dataset.image = reader.result; // 이미지 URL 저장
            };
            reader.readAsDataURL(file);
        }
    });
}

// 각각의 입력 요소와 미리보기 연결
handleImageUpload(topInput, topPreview);
handleImageUpload(bottomInput, bottomPreview);
handleImageUpload(outerInput, outerPreview);
handleImageUpload(bagInput, bagPreview);
handleImageUpload(shoesInput, shoesPreview);


const initialLayoutImage = "../../static/images/styles/example.jpg"; // 레이아웃 사진 경로 설정

// 초기 상태에서 레이아웃 이미지 표시
document.addEventListener("DOMContentLoaded", () => {
    combinedResult.innerHTML = `<img src="${initialLayoutImage}" alt="초기 레이아웃 이미지" style="max-width: 100%;">`;
});

// "조합하기" 버튼 이벤트 리스너
combineButton.addEventListener("click", () => {
    const topImage = topPreview.dataset.image;
    const bottomImage = bottomPreview.dataset.image;
    const outerImage = outerPreview.dataset.image;
    const bagImage = bagPreview.dataset.image;
    const shoesImage = shoesPreview.dataset.image;

    // 유저가 모든 이미지를 업로드하지 않은 경우 경고
    if (!topImage || !bottomImage || !outerImage || !bagImage || !shoesImage) {
        alert("모든 항목을 업로드해주세요!");
        return;
    }

    // 캔버스 고정 크기 설정 (레이아웃 고정)
    const canvasWidth = 600; // 전체 캔버스 너비
    const canvasHeight = 800; // 전체 캔버스 높이
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 각 이미지의 고정 크기 및 위치 정의
    const images = [
        { src: topImage, x: 0, y: 0, width: 300, height: 400 }, // 상의
        { src: bottomImage, x: 0, y: 400, width: 300, height: 400 }, // 하의
        { src: outerImage, x: 300, y: 0, width: 300, height: 267 }, // 겉옷
        { src: bagImage, x: 300, y: 267, width: 300, height: 267 }, // 가방
        { src: shoesImage, x: 300, y: 534, width: 300, height: 266 } // 신발
    ];

    // 이미지 로드 및 고정 크기로 배치
    Promise.all(images.map((img) => loadImage(img.src))).then((loadedImages) => {
        loadedImages.forEach((img, index) => {
            const { x, y, width, height } = images[index];
            ctx.drawImage(img, x, y, width, height); // 고정 크기로 이미지 삽입
        });

        // 캔버스 결과 이미지 생성
        const combinedImage = canvas.toDataURL("image/png");

        // 조합 결과 영역 업데이트
        combinedResult.innerHTML = `<img src="${combinedImage}" alt="조합 이미지" style="max-width: 100%;">`;

        // 다운로드 버튼 활성화
        downloadLink.href = combinedImage;
        downloadButtonContainer.style.display = "block";
    });
});

// 이미지 로드 함수
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/*******************************************************/
function previewImage(event, previewId) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const previewBox = document.getElementById(previewId);
        previewBox.innerHTML = '<img src="' + reader.result + '" alt="미리보기 이미지">';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}