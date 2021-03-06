export const LOG_IN = "/accounts/login/";
export const SIGN_UP = "/accounts/signup/";
export const SETTINGS = "/accounts/edit/";
export const SINGLE_POST = "/p/:postId/";
export const USER_PROFILE = "/:username/:actionField?/";

export const PROFILE = (username) => `/${username}/`;
export const SAVED = (username) => `/${username}/saved/`;
export const POST = (postId) => `/p/${postId}/`;
