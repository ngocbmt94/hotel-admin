import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // Get the JSON object for the logged in user.
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signUp(newUser) {
  const { data, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    // add some optional data
    options: {
      data: {
        fullName: newUser.fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error("Could not created new user account");
  return data;
}

export async function updateAccountUser(objUser) {
  console.log(objUser);
  // check update name or password
  let dataUpdated;
  if (objUser.fullName)
    dataUpdated = {
      data: { fullName: objUser.fullName },
    };

  if (objUser.password)
    dataUpdated = {
      password: objUser.password,
    };

  const { data, error } = await supabase.auth.updateUser(dataUpdated);
  if (error) throw new Error(error.message);

  if (!objUser.avatar) return data;

  // check avatar & upload image
  const avatarName = `avatar-${Math.floor(Math.random() * 1000000 + 1)}`.replaceAll("/", "");
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatar/${avatarName}`;
  const { error: errorImage } = await supabase.storage.from("avatar").upload(avatarName, objUser.avatar);
  if (errorImage) return;

  dataUpdated = {
    data: { fullName: objUser.fullName, avatar: avatarPath },
  };

  const { data: dataUpdatedWithImg, error: errorUpdatedWithImg } = await supabase.auth.updateUser(dataUpdated);
  if (errorUpdatedWithImg) throw new Error(errorUpdatedWithImg.message);

  return dataUpdatedWithImg;
}
