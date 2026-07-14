import { toast } from "sonner";
import { supabase } from "../../lib/supabase";

export async function handleImageUpload(
  file: File,
  userId: string,
): Promise<string | null> {
  try {
    const fileExtension = file.name.split(".").pop();
    const filePath = `${userId}/profile-picture.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const permanentPublicUrl = data.publicUrl;

    const { error: databaseError } = await supabase
      .from("profiles")
      .update({ avatar_url: permanentPublicUrl })
      .eq("id", userId);

    if (databaseError) throw new Error(databaseError.message);

    toast.success("Image successfully saved!");
    return permanentPublicUrl;
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Failed uploading image: " + error.message);
      throw error;
    } else {
      throw new Error("Uncaught error. Please try again!", {
        cause: error,
      });
    }
  }
}
