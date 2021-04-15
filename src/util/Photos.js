const fetch = require('node-fetch');

var urly = "https://9zulviqkd0.execute-api.us-east-2.amazonaws.com/v1/imager";

export class Photo {
    get(url) {
        let queryURL = urly + "?url=" + url;
        return new Promise((resolve, reject) => {
            fetch(queryURL)
                .then(res => resolve(res.text()))
                .catch(err => reject(err))
        });
    }

    post(url, binary, fileType) {
        return new Promise((resolve, reject) => {
            let queryURL = urly + "?url=" + url;
            var postData = {
                method: 'POST',
                body: binary,
                headers: { 'Content-Type': fileType }
            }
            fetch(queryURL, postData)
                .then(res => resolve(res.text()))
                .catch(err => reject(err))
        });
    }
    encodeImage(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    };
    async uploadFile(file, fileName, type) {
        try {
            const b64 = await this.encodeImage(file);
            var dirt = "data:" + type + ";base64,"
            const clean = b64.replace(dirt, "");
            await this.post(fileName, clean, type);
        } catch (error) {
            console.log(error);
        }
    }

}




// import {Photos} from "../../util/Photos"
// const photos = new Photo();

//TO UPLOAD PHOTOS:

//Upload input tag:
{/* <input type="file" onChange={(e) => this.submitFile(e.target.files)} /> */ }

//On submit event:
// submitFile(event) {
//     const file = event[0];
//     const name = "green.jpg";
//     photos.uploadFile(file, name, file.type);
// }


//TO DOWNLOAD PHOTOS:

// function getter(fileName, fileType){
//     try {
//         const image = await photos.get(fileName);
//         console.log(image);
//         //To display said image (this function doesn't quite work but its <img> tag does):
//         renderImage(fileType, image);
//     } catch (error) {
//         console.log(error);
//     }
// }
// function renderImage(type, data){
//     return <img alt="item" src={`data:${type};base64,${data}`} />
// }
