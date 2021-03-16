const browserObject = require('../puppeteer/browser');
const scraperController = require('../puppeteer/pageController');

async function getItemByBarcode(barcode) {
    let browserInstance = browserObject.startBrowser();
    let response = await scraperController(browserInstance, barcode)
    return response;
}

//a mock user
const user = { 
    userID: 12,
    userFirstName: "Matt",
    userLastName: "Walker",
    userEmail: "hotmail@gmail.com",
    userPhone: 18878987653,
    userProfilePicURL: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_5745.jpg",
    userCreateDate: "2021-03-03T03:41:36.000Z"
}

//a mock items
const items = [
    {
    "itemID":3,
    "userEmail":"lukelmiller@icloud.com",
    "itemCategory":"Technology",
    "itemName":"macBook",
    "itemCreationDate":"2021-03-03T03:40:20.000Z",
    "itemPhotoURL":"",
    "itemSerialNum":129308085,
    "itemPurchaseAmount":"1500.00",
    "itemWorth":"700.00",
    "itemReceiptPhotoURL":"",
    "itemManualURL":"",
    "itemSellDate":null,
    "itemBuyDate":null,
    "itemLocation":"right infront of me",
    "itemNotes":"Space Gray",
    "itemSellAmount":null,
    "itemRecurringPaymentAmount":"0.00",
    "itemEbayURL":"",
    "itemTags":"apple, tech",
    "itemArchived":0,
    "itemFolder":"Personal Ite"
    },
    {
    "itemID":4,
    "userEmail":"lukelmiller@icloud.com",
    "itemCategory":"Technology",
    "itemName":"iPhone",
    "itemCreationDate":"2021-03-03T03:41:36.000Z",
    "itemPhotoURL":"",
    "itemSerialNum":129308349,
    "itemPurchaseAmount":"1000.00",
    "itemWorth":"700.00",
    "itemReceiptPhotoURL":"",
    "itemManualURL":"",
    "itemSellDate":null,
    "itemBuyDate":null,
    "itemLocation":"right infront of me",
    "itemNotes":"Space Gray",
    "itemSellAmount":null,
    "itemRecurringPaymentAmount":"0.00",
    "itemEbayURL":"",
    "itemTags":"apple, tech",
    "itemArchived":0,
    "itemFolder":"Personal Items"
    }]

module.exports = {
    getItemByBarcode,
    user,
    items
};