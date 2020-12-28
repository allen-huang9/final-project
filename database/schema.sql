set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashpassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entry" (
	"entryId" serial NOT NULL,
	"userId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"amount" numeric NOT NULL,
	"description" TEXT,
	"date" DATE NOT NULL,
	CONSTRAINT "entry_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "category" (
	"categoryId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "category_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "entry" ADD CONSTRAINT "entry_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "entry" ADD CONSTRAINT "entry_fk1" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId");
