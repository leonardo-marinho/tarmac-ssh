-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameBet" (
    "id" SERIAL NOT NULL,
    "gameRoundId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "contractHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRound" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTransaction" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "hash" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_hash_key" ON "User"("hash");

-- AddForeignKey
ALTER TABLE "GameBet" ADD CONSTRAINT "GameBet_gameRoundId_fkey" FOREIGN KEY ("gameRoundId") REFERENCES "GameRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBet" ADD CONSTRAINT "GameBet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRound" ADD CONSTRAINT "GameRound_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTransaction" ADD CONSTRAINT "UserTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
