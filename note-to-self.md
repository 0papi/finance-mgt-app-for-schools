# Authentication endpoints

/register
/login
/resetpwd
/generate/otp
/refresh-token
/forgotpwd

# To dos

- Set up notification service
- Add error logging
- Put limitations on how many tokens can be requested by user at once
- use secrets manager


const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  institutionNumber: String,
});

const Institution = mongoose.model("Institution", institutionSchema);

async function getLastGeneratedNumber() {
  const latestInstitution = await Institution.findOne({}, {}, { sort: { createdAt: -1 } });
  return latestInstitution ? latestInstitution.institutionNumber : 0;
}

async function generateInstitutionNumber(institutionName) {
  const lastGeneratedNumber = await getLastGeneratedNumber();
  const nextNumber = lastGeneratedNumber + 1;
  const institutionNumber = `${institutionName}/MGAPP/2023/${nextNumber.toString().padStart(4, "0")}`;

  const newInstitution = new Institution({ institutionNumber });
  await newInstitution.save();

  return institutionNumber;
}
