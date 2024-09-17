import { Injectable } from "@nestjs/common";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import { writeFile, mkdir } from "fs/promises";

@Injectable()
export class ImageService {
  private readonly uploadPath = "./uploads/images";

  constructor() {
    this.init();
  }

  private async init() {
    try {
      await mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error("Error creating upload directory:", error);
    }
  }

  async saveImage(image: Express.Multer.File): Promise<string> {
    const extension = extname(image.originalname);
    const filename = `${uuidv4()}${extension}`;
    const filePath = `${this.uploadPath}/${filename}`;

    await writeFile(filePath, image.buffer);
    return filename;
  }
}
