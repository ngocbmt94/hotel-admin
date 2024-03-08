import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.floor(Math.random() * 1000000 + 1)}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-imgs/${imageName}`; // check imagepath has or not

  // create / edit cabin
  let query = supabase.from("cabins");
  // 1. create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2. edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // upload image to storage of supabase
  if (hasImagePath) return data;
  const { error: errorImage } = await supabase.storage.from("cabin-imgs").upload(imageName, newCabin.image);

  // Delete cabin if have any error when upload cabin image to supabase
  if (errorImage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(errorImage);
    throw new Error("Cabin image could not be uploaded and cabnin could not be created");
  }

  return data;
}
