-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "original_title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "production_year" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "production_country" TEXT[],
    "actors" TEXT[],
    "directors" TEXT[],
    "account_id" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_account_id_key" ON "movies"("id", "account_id");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
