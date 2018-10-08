import { log } from "./helpers/logger";
import { getUsersForOrganisation } from "./services/github";

const baseUrl = "https://api.github.com/";
const organisationId = "babel";
const gitHubApiAuthToken = ""; //add your GitHub API OAuth key here to increase request limit

export const go = async () => {
  try {
    const users = await getUsersForOrganisation(
      baseUrl,
      gitHubApiAuthToken,
      organisationId
    );

    const output = users.reduce((result, user) => {
      return `${result}Username: ${user.login}\n`;
    }, "");

    log(output);
  } catch (error) {
    await log(error.message);
  }
};

go();
