import { v4 as uuidv4 } from "uuid";
import { InstitutionNumber } from "../database/models/institutionNumber";

async function findLastStoredId() {
  return (await InstitutionNumber.find().sort({ _id: -1 }).limit(1)) ?? 0;
}

class UserIdGeneratorService {
  private static currentYear = new Date().getFullYear();
  private static currentId = 0;

  // create a function that generates the last persisted number

  /**
   * @description function that generates the new instutition id
   * @param name
   * @returns
   */
  static async generateId(name: string) {
    const lastItem = await findLastStoredId();

    if (lastItem && lastItem.length > 0) {
      UserIdGeneratorService.currentId = Number(lastItem[0].institutionNumber);
    }

    // console.log("LAST ITEM IN DB", lastItem);
    const prefix = name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    UserIdGeneratorService.currentId += 1;

    // pad the id to include initial zeroes
    const paddedId = UserIdGeneratorService.currentId
      .toString()
      .padStart(4, "0");

    // add the last four digits to the database
    await InstitutionNumber.create({
      institutionNumber: paddedId,
    });

    // create actual id to be send to user
    const id = `${prefix}/MGAPP/${UserIdGeneratorService.currentYear}/${paddedId}`;

    // return the id
    return id;
  }
}

export default UserIdGeneratorService;
