import { supabase } from "./supabase";

export async function uploadMemory(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("gallery")
    .upload(fileName, file);

  if (error) {
  console.log("UPLOAD ERROR", error);
  alert(error.message);
  throw error;
}

  const { data } = supabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
