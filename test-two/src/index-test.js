import { go } from "./index";
import * as logger from "./helpers/logger";
import * as gitHubService from "./services/github";

test("go logged users from github service", async () => {
  const expectedOutput = `Username: a\nUsername: b\nUsername: c\n`;

  const users = [{ login: "a" }, { login: "b" }, { login: "c" }];

  logger.log = jest.fn();

  gitHubService.getUsersForOrganisation = jest.fn(() => users);

  await go();

  expect(logger.log).toBeCalledWith(expectedOutput);
});

test("go logged error", async () => {
  logger.log = jest.fn();

  gitHubService.getUsersForOrganisation = jest.fn(() => {
    throw Error("error");
  });

  await go();

  expect(logger.log).toBeCalledWith("error");
});
