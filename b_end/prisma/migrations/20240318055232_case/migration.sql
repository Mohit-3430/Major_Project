-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "lawyerId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Case_lawyerId_idx" ON "Case"("lawyerId");

-- CreateIndex
CREATE INDEX "Case_clientId_idx" ON "Case"("clientId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
