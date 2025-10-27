CREATE OR REPLACE FUNCTION increment_user_images(user_id UUID, count INTEGER)
RETURNS VOID AS $$
BEGIN
  INSERT INTO user_profiles (id, total_images_generated)
  VALUES (user_id, count)
  ON CONFLICT (id)
  DO UPDATE SET total_images_generated = COALESCE(user_profiles.total_images_generated, 0) + count;
END;
$$ LANGUAGE plpgsql;