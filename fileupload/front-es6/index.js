let selectedFiles = [];

const fileInput = document.getElementById("fileInput");
const imageContainer = document.getElementById("image-container");
const btnSubmit = document.getElementById("btnSubmit");
const resultImageContainer = document.getElementById("result-image-container");

fileInput.addEventListener("change", onImageFileChange);
btnSubmit.addEventListener("click", onSubmit);

function onImageFileChange(event) {
    if (event.target.files && event.target.files[0]) {
        let fileCount = event.target.files.length;
        for (let i = 0; i < fileCount; i++) {
            let reader = new FileReader();

            const file = event.target.files[i];

            reader.onload = (event) => {
                const photoData = event.target.result;
                addImageElement(photoData, file.name);
            }

            reader.readAsDataURL(file);
            selectedFiles.push(file);
        }
    }
}

function addImageElement(photoData, filename) {
    const template = 
`<div class="image-area" data-filename="${filename}">
    <img src="${photoData}">
    <a class="remove-image" onclick="removeImage('${filename}')" style="display: inline;">&#215;</a>
</div>`
    addElementTo(template, imageContainer);
}

function addElementTo(elString, parent) {
    const template = document.createElement("template");
    template.innerHTML = elString;
    parent.appendChild(
        template.content.firstElementChild
    );
}

function removeImage(filename) {
    console.log(filename);
    if (filename) {
        const fileToRemove = selectedFiles.find(f => f.name == filename);

        if(fileToRemove) {
            const idx = selectedFiles.indexOf(fileToRemove);
            selectedFiles.splice(idx, 1);

            const fileDiv = document.querySelector(`[data-filename="${filename}"]`);
            fileDiv.remove();
        }
    }
}

function onSubmit() {
    //이미지를 같이 서버로 전송하기 위해 multipart-formdata 사용
    const formData = new FormData();
    //업로드 되는 파일을 photos에 목록으로 추가
    for (let file of selectedFiles) {
        formData.append("photos", file);
    }

    const baseUrl = "https://localhost:44386/"

    fetch(`${baseUrl}Home/UploadImages`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(json => {
        console.log("Result: ", json);
        for(let url of json.result) {
            const template = 
`<div>
    <img src="${baseUrl}${url}" style="width:300px;">
</div>`

            addElementTo(template, resultImageContainer);
        }
    })
    .catch(err => console.log("Error: ", err));
}