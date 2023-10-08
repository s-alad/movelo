/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const ethers = require('ethers');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.getAddress = onRequest((request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    console.log(request.query);
    logger.info(request.query, {structuredData: true});
    //get mnemonic from request
    const m = request.query.mnemonic;
    //strip the extra quotes
    const mnemonic = m.replace(/"/g, "");
    logger.info("HI: " + mnemonic, {structuredData: true});
    /* const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log(wallet.address);
    response.send(wallet.address); */
    try {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);
        console.log(wallet.address);
        logger.info(wallet.address, {structuredData: true});
        response.send(
            {
                "address": wallet.address,
                "mnemonic": mnemonic
            }
        );
    } catch (error) {
        console.log(error);
        response.send(
            {
                "error": "Invalid mnemonic"
            }
        );
    }
});

exports.helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
})

exports.modifyString = onRequest((request, response) => {
    // Get the input string from the request body
    const inputString = request.query.inputString;

    // Check if the input string is provided
    if (!inputString) {
        response.status(400).json({ error: 'Input string is missing' });
        return;
    }

    // Modify the input string (in this example, we'll just append " - Modified" to it)
    const modifiedString = inputString + ' - Modified';

    // Send the modified string as the response
    response.json({ result: modifiedString });
  });