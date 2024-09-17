import { ApiProperty } from "@nestjs/swagger";

export class AppearanceSettingsDto {
  @ApiProperty({ description: "Header color in hex or rgb format" })
  headerColor: string;

  @ApiProperty({ description: "Text color of the header in hex or rgb format" })
  headerTextColor: string;

  @ApiProperty({ description: "Boolean flag to hide or show the header" })
  hideHeader: boolean;

  @ApiProperty({ description: "Background color in hex or rgb format" })
  backgroundColor: string;

  @ApiProperty({
    description: "Optional background image URL",
    required: false,
  })
  backgroundImage?: string;

  @ApiProperty({
    description: "Boolean flag to enable or disable the search bar",
  })
  enableSearch: boolean;
}

export class AppThemeDto {
  @ApiProperty({ description: "App header color in hex or rgb format" })
  appHeaderColor: string;

  @ApiProperty({ description: "App header text color in hex or rgb format" })
  appHeaderTextColor: string;

  @ApiProperty({ description: "Boolean flag to show or hide the app header" })
  isAppHeader: boolean;

  @ApiProperty({
    description: "Background color of the app in hex or rgb format",
  })
  appBackgroundColor: string;

  @ApiProperty({
    description: "Optional background image URL for the app",
    required: false,
  })
  appBackgroundImage?: string;

  @ApiProperty({
    description: "Boolean flag to enable or disable search in the app",
  })
  isAppSearch: boolean;
}

export class ButtonDto {
  @ApiProperty({ description: 'Type of the button (e.g., "submit", "cancel")' })
  type: string;

  @ApiProperty({ description: "Label for the button" })
  label: string;

  @ApiProperty({
    description: "Optional phone number associated with the button",
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: "Optional custom action for the button",
    required: false,
  })
  customAction?: string;
}

export class BottomPanelSettingsDto {
  @ApiProperty({ description: "Boolean flag to hide or show the panel" })
  hidePanel: boolean;

  @ApiProperty({ description: "Panel color in hex or rgb format" })
  panelColor: string;

  @ApiProperty({
    description: "Color for icons and text on the panel in hex or rgb format",
  })
  iconAndTextColor: string;

  @ApiProperty({
    description: "Array of buttons for the panel",
    type: [ButtonDto],
  })
  buttons: ButtonDto[];
}

export class BlockDto {
  @ApiProperty({ description: "ID of the block" })
  blockId: number;

  @ApiProperty({ description: "Label for the block" })
  label: string;

  @ApiProperty({
    description: "Optional image URL for the block",
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: "Optional redirect URL for the block",
    required: false,
  })
  redirectUrl?: string;
}

export class PageDto {
  @ApiProperty({ description: "Title of the page" })
  title: string;

  @ApiProperty({ description: "Boolean flag to show or hide the title" })
  showTitle: boolean;

  @ApiProperty({
    description: "Boolean flag to show or hide the page in the menu",
  })
  showInMenu: boolean;

  @ApiProperty({ description: "Array of blocks in the page", type: [BlockDto] })
  blocks: BlockDto[];
}

export class UpdateUserSettingsDto {
  @ApiProperty({
    description: "Settings related to user appearance",
    required: false,
  })
  appearanceSettings?: AppearanceSettingsDto;

  @ApiProperty({
    description: "Settings related to app theme",
    required: false,
  })
  appTheme?: AppThemeDto;

  @ApiProperty({
    description: "Settings related to the bottom panel",
    required: false,
  })
  bottomPanelSettings?: BottomPanelSettingsDto;

  @ApiProperty({
    description: "Array of pages associated with the user",
    type: [PageDto],
    required: false,
  })
  pages?: PageDto[];
}
