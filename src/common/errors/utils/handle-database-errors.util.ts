import { DatabaseError } from "../types/database-error";
import { PrismaClientError } from "../types/prisma-client-error";
import { UniqueConstraintError } from "../types/unique-constraint-error";

enum PrismaErrors {
  UNIQUE_CONSTRAINT_FAILED = 'P2002'
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch(e.code){

    case PrismaErrors.UNIQUE_CONSTRAINT_FAILED:
      return new UniqueConstraintError(e)

    default:
      return new DatabaseError(e.message)
  }

}
