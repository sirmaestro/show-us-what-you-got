import { get } from "../helpers/http";

const getAuthenticationQueryString = async apiAuthenticationToken =>
  `?access_token=${apiAuthenticationToken}`;

export const getUsersForOrganisation = async (
  baseUrl,
  apiAuthenticationToken,
  organisationId
) => {
  return get(
    `${baseUrl}orgs/${organisationId}/members${await getAuthenticationQueryString(
      apiAuthenticationToken
    )}`
  );
};
