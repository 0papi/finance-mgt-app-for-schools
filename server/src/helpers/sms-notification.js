// import { Vonage } from "@vonage/server-sdk";
// import { config } from "../config/secret";

var { Vonage } = require("@vonage/server-sdk");
var { config } = require("../config/secret");

const vonage = new Vonage({
  apiKey: config.nexmoKey,
  apiSecret: config.nexmoSecret,
});

const sendMessage = async ({ from, text, to }) => {
  await vonage.sms.send({ to: to, from: from, text: text });
};

module.exports = sendMessage;
