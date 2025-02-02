const parts = ["top", "outer", "bottom", "shoes", "bag"];


/***********************스타일 맵***************************/
function uploadImage(part) {
    document.getElementById(`input-${part}`).click();
}


function previewImage(event, part) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const box = document.getElementById(part);
            box.innerHTML = `<img src="${e.target.result}" alt="${part}">`;
            switch (part) {
                case "top":
                    box.innerHTML +=
                        `<input type="file" accept="image/*" id="input-top" onChange="previewImage(event, 'top')"
                               style="display: none;"/>`;
                    break;
                case "outer":
                    box.innerHTML +=
                        `<input type="file" accept="image/*" id="input-outer" onChange="previewImage(event, 'outer')"
                               style="display: none;"/>`;
                    break;
                case "bottom":
                    box.innerHTML +=
                        `<input type="file" accept="image/*" id="input-bottom" onChange="previewImage(event, 'bottom')"
                               style="display: none;"/>`;
                    break;
                case "shoes":
                    box.innerHTML +=
                        `<input type="file" accept="image/*" id="input-shoes" onChange="previewImage(event, 'shoes')"
                               style="display: none;"/>`;
                    break;
                case "bag":
                    box.innerHTML +=
                        `<input type="file" accept="image/*" id="input-bag" onChange="previewImage(event, 'bag')"
                               style="display: none;"/>`;
                    break;
            }
            box.classList.remove('empty'); // 이미지가 첨부되면 'empty' 클래스 제거
        };
        reader.readAsDataURL(file);
    }
}

async function combineImages() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define dimensions for each part
    const dimensions = {
        top: {x: 0, y: 0, width: 200, height: 200},
        outer: {x: 200, y: 0, width: 200, height: 400},
        bottom: {x: 0, y: 200, width: 200, height: 200},
        shoes: {x: 0, y: 400, width: 200, height: 100},
        bag: {x: 200, y: 400, width: 200, height: 100}
    };

    for (const part of parts) {
        const box = document.getElementById(part);
        const img = box.querySelector("img");
        if (img) {
            const {x, y, width, height} = dimensions[part];
            const image = new Image();
            image.src = img.src;
            await new Promise((resolve) => {
                image.onload = () => {
                    ctx.drawImage(image, x, y, width, height);
                    resolve();
                };
            });
        } else {
            // 이미지가 없을 경우, 빈 하얀 사각형을 캔버스에 그리기
            const {x, y, width, height} = dimensions[part];
            ctx.fillStyle = "#fff"; // 하얀색으로 설정
            ctx.fillRect(x, y, width, height);
        }
    }

    // Create a download link
    const link = document.createElement("a");
    link.download = "combined-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

