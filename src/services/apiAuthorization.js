import supabase from "./supabase";

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
  console.log("api", data);
  if (error) throw new Error("Could not created new user account");
  return data;
}
