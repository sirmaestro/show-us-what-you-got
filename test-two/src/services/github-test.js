import { getUsersForOrganisation } from "./github";
import * as http from "../helpers/http";

const baseGitHubUrl = "https://api.github.com/";

const organisationId = "facebook";

const userData = [
  {
    userId: "one"
  },
  {
    userId: "two"
  },
  {
    userId: "three"
  }
];

test("returned users for organisation", async () => {
  http.get = jest.fn(() => userData);

  const response = await getUsersForOrganisation(
    baseGitHubUrl,
    "",
    organisationId
  );

  expect(response).toEqual(userData);
});

test("appended authentication token to URL", async () => {
  const authToken = "secret";

  http.get = jest.fn(() => userData);

  const response = await getUsersForOrganisation(
    baseGitHubUrl,
    authToken,
    organisationId
  );

  expect(http.get.mock.calls[0][0]).toEqual(expect.stringContaining(authToken));
});

test("prepended base URL to URL", async () => {
  http.get = jest.fn(() => userData);

  const response = await getUsersForOrganisation(
    baseGitHubUrl,
    "",
    organisationId
  );

  expect(http.get.mock.calls[0][0]).toEqual(
    expect.stringContaining(baseGitHubUrl)
  );
});
