-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email_address" TEXT NOT NULL,
    "account_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "puzzle" (
    "id" SERIAL NOT NULL,
    "puzzle_date" DATE NOT NULL,
    "word" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "puzzle_result" (
    "id" SERIAL NOT NULL,
    "puzzle_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "guess_count" INTEGER NOT NULL,
    "is_win" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puzzle_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "puzzle_guess" (
    "id" SERIAL NOT NULL,
    "puzzle_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "guess_number" INTEGER NOT NULL,
    "is_match" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puzzle_guess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "puzzle_result" ADD CONSTRAINT "puzzle_result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puzzle_result" ADD CONSTRAINT "puzzle_result_puzzle_id_fkey" FOREIGN KEY ("puzzle_id") REFERENCES "puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puzzle_guess" ADD CONSTRAINT "puzzle_guess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puzzle_guess" ADD CONSTRAINT "puzzle_guess_puzzle_id_fkey" FOREIGN KEY ("puzzle_id") REFERENCES "puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
