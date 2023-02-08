let num = 0;

function incrementNumber() {
  num = num + 1;
  return num.toString().padStart(4, "0");
}

export const getInstitutionNumber = (name: string) => {
  const splitName = name.split(" ");
  const initials: string[] = [];

  for (const name of splitName) {
    initials.push(name[0]);
  }

  const institutionInitials = initials.join("");
  const currentYear = new Date().getFullYear();
  // const getLastTwoDigits = String(currentYear).slice(-2)
  const lastPart = incrementNumber();

  return `${institutionInitials.toUpperCase()}/DEMO/${currentYear}/${lastPart}`;
};
