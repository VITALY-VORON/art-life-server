-- CreateTable
CREATE TABLE "User" (
    "_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "AppearanceSettings" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "headerColor" TEXT NOT NULL,
    "headerTextColor" TEXT NOT NULL,
    "hideHeader" BOOLEAN NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "backgroundImage" TEXT,
    "enableSearch" BOOLEAN NOT NULL,

    CONSTRAINT "AppearanceSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppTheme" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "appHeaderColor" TEXT NOT NULL,
    "appHeaderTextColor" TEXT NOT NULL,
    "isAppHeader" BOOLEAN NOT NULL,
    "appBackgroundColor" TEXT NOT NULL,
    "appBackgroundImage" TEXT,
    "isAppSearch" BOOLEAN NOT NULL,

    CONSTRAINT "AppTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BottomPanelSettings" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "hidePanel" BOOLEAN NOT NULL,
    "panelColor" TEXT NOT NULL,
    "iconAndTextColor" TEXT NOT NULL,

    CONSTRAINT "BottomPanelSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "showTitle" BOOLEAN NOT NULL,
    "showInMenu" BOOLEAN NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Button" (
    "id" SERIAL NOT NULL,
    "bottom_panel_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "customAction" TEXT,

    CONSTRAINT "Button_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "imageUrl" TEXT,
    "redirectUrl" TEXT,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AppearanceSettings_user_id_key" ON "AppearanceSettings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AppTheme_user_id_key" ON "AppTheme"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "BottomPanelSettings_user_id_key" ON "BottomPanelSettings"("user_id");

-- AddForeignKey
ALTER TABLE "AppearanceSettings" ADD CONSTRAINT "AppearanceSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppTheme" ADD CONSTRAINT "AppTheme_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BottomPanelSettings" ADD CONSTRAINT "BottomPanelSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_bottom_panel_id_fkey" FOREIGN KEY ("bottom_panel_id") REFERENCES "BottomPanelSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
