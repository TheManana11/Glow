import { HttpStatus } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

export async function base64ToImage(base64String: string) {
  const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return null;
    }
  
    const mimeType = matches[1];
    const extension = mimeType.split('/')[1];
  
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(mimeType)) {
      return null;
    }
  
    const buffer = Buffer.from(matches[2], 'base64');
  
    // Ensure uploads folder exists
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    // Save file with unique name
    const filename = `profile_${Date.now()}.${extension}`;
    const savePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(savePath, buffer);

    return filename;
}
