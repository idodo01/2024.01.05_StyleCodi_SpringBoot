
// 탭 기능
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// 업로드 박스 생성
const createUploadBox = (gridId, prefix, count) => {
    const grid = document.getElementById(gridId);
    for (let i = 1; i <= count; i++) {
        const box = document.createElement('div');
        box.className = 'upload-box';

        // 상자 내에 파일 input과 미리보기 이미지를 추가
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';

        const span = document.createElement('span');
        span.textContent = `${prefix} ${i} 업로드`;

        box.appendChild(input);
        box.appendChild(span);

        // 상자 클릭 시 input을 클릭하도록 설정
        box.addEventListener('click', function () {
            input.click();
        });

        // 파일 선택 후 이미지 미리보기
        input.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    box.innerHTML = '';
                    box.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        // 이미지 클릭 시 선택 표시
        box.addEventListener('click', function () {
            const allBoxes = document.querySelectorAll(`#${gridId} .upload-box`);
            allBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
        });

        grid.appendChild(box);
    }
};

createUploadBox('topGrid', '상의', 4);
createUploadBox('bottomGrid', '하의', 4);

// 이미지 조합 기능
const combineButton = document.getElementById('combineButton');
combineButton.addEventListener('click', function () {
    const topImage = document.querySelector('#topGrid .upload-box.selected img');
    const bottomImage = document.querySelector('#bottomGrid .upload-box.selected img');

    if (topImage && bottomImage) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 이미지 크기 조정
        const maxWidth = 600;
        const scaleTop = topImage.width / maxWidth;
        const scaleBottom = bottomImage.width / maxWidth;

        // 캔버스 크기 설정
        canvas.width = maxWidth;
        canvas.height = topImage.height / scaleTop + bottomImage.height / scaleBottom;

        // 상의와 하의를 캔버스에 그리기
        ctx.drawImage(topImage, 0, 0, topImage.width / scaleTop, topImage.height / scaleTop);
        ctx.drawImage(bottomImage, 0, topImage.height / scaleTop, bottomImage.width / scaleBottom, bottomImage.height / scaleBottom);

        // 결과 이미지 표시
        const resultImage = new Image();
        resultImage.src = canvas.toDataURL();
        const combinedResult = document.getElementById('combinedResult');
        combinedResult.innerHTML = '';
        combinedResult.appendChild(resultImage);

        // 다운로드 버튼 표시
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = resultImage.src;
        document.getElementById('downloadButtonContainer').style.display = 'block';
    } else {
        alert('상의와 하의를 모두 선택하세요.');
    }
});