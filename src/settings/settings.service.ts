import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ImageService } from "src/image/image.service";

@Injectable()
export class UserSettingsService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async updateUserSettings(userId: string, data: any): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { appearanceSettings, appTheme, bottomPanelSettings, pages } = data;

    if (appearanceSettings) {
      await this.updateAppearanceSettings(userId, appearanceSettings);
    }

    if (appTheme) {
      await this.updateAppTheme(userId, appTheme);
    }

    if (bottomPanelSettings) {
      await this.updateBottomPanelSettings(userId, bottomPanelSettings);
    }

    if (pages) {
      await this.updatePages(userId, pages);
    }
  }

  private async updateAppearanceSettings(
    userId: string,
    settings: any,
  ): Promise<void> {
    const existingSettings = await this.prisma.appearanceSettings.findUnique({
      where: { userId },
    });

    if (settings.backgroundImage) {
      settings.backgroundImage = await this.imageService.saveImage(
        settings.backgroundImage,
      );
    }

    await this.prisma.appearanceSettings.upsert({
      where: { id: existingSettings ? existingSettings.id : 0 },
      update: settings,
      create: { ...settings, userId },
    });
  }

  private async updateAppTheme(userId: string, theme: any): Promise<void> {
    const existingAppTheme = await this.prisma.appTheme.findFirst({
      where: { userId },
    });

    if (theme.appBackgroundImage) {
      theme.appBackgroundImage = await this.imageService.saveImage(
        theme.appBackgroundImage,
      );
    }

    await this.prisma.appTheme.upsert({
      where: { id: existingAppTheme ? existingAppTheme.id : 0 },
      update: theme,
      create: { ...theme, userId },
    });
  }

  private async updateBottomPanelSettings(
    userId: string,
    settings: any,
  ): Promise<void> {
    const { buttons, ...panelSettings } = settings;

    const bottomPanel = await this.prisma.bottomPanelSettings.upsert({
      where: { userId },
      update: panelSettings,
      create: { ...panelSettings, userId },
    });

    await this.prisma.button.deleteMany({
      where: { bottomPanelId: bottomPanel.id },
    });

    if (buttons && buttons.length > 0) {
      await this.prisma.button.createMany({
        data: buttons.map((button: any) => ({
          ...button,
          bottomPanelId: bottomPanel.id,
        })),
      });
    }
  }

  private async updatePages(userId: string, pages: any[]): Promise<void> {
    await this.prisma.page.deleteMany({
      where: { userId },
    });

    for (const page of pages) {
      const { blocks, ...pageData } = page;

      const createdPage = await this.prisma.page.create({
        data: {
          ...pageData,
          userId,
        },
      });

      if (blocks && blocks.length > 0) {
        await Promise.all(
          blocks.map(async (block: any) => {
            if (block.imageUrl) {
              block.imageUrl = await this.imageService.saveImage(
                block.imageUrl,
              );
            }
            return this.prisma.block.create({
              data: {
                ...block,
                pageId: createdPage.id,
              },
            });
          }),
        );
      }
    }
  }
}
