import UnAuthorizedError from "../errors/unauthorize-error.js";

const checkPermissions = (requestUser, resourceUserId) => {
  console.log(requestUser);
  console.log(resourceUserId);
  console.log(typeof resourceUserId);

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthorizedError("Not authorized to access this route");
};

export default checkPermissions;
