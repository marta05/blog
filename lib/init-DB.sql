-- -------------------------------------------------------------
-- TablePlus 4.6.0(406)
--
-- https://tableplus.com/
--
-- Database: blog
-- Generation Time: 2022-03-16 15:01:09.1020
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."post";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS untitled_table_186_id_seq;

-- Table Definition
CREATE TABLE "public"."post" (
    "id" int4 NOT NULL DEFAULT nextval('untitled_table_186_id_seq'::regclass),
    "title" text,
    "content" text,
    "date_created" date,
    "views" int8 DEFAULT 0,
    "user_id" int4,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."user";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_id_seq;

-- Table Definition
CREATE TABLE "public"."user" (
    "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    "email" varchar,
    "hashed_password" varchar,
    "admin" bool,
    "name" varchar,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."post" ("id", "title", "content", "date_created", "views", "user_id") VALUES
(5, 'how to prepare for the 10th class exam to pass the exam with good marks. Actually, it is the desire of every student to pass the exam with good marks, but the problem is how to prepare.', 'The time of the 10th board exam is getting closer day by day and the problem of the students is also increasing how to prepare for the 10th class exam to pass the exam with good marks. Actually, it is the desire of every student to pass the exam with good marks, but the problem is how to prepare.

The problem is that even by studying, sometimes good marks do not come, what is the reason for this, how to top in 10th. You must have seen and often heard that even a low-studying student brings an equal number of marks as an average student. Why? The obvious thing is that in the beginning the runner who runs fast gets tired at the end and falls behind.

My intention is not that in the beginning, Tejas will bring fewer marks in the end, but Tej means that his level will keep changing with time, that is, study according to time, at the beginning, syllabus disciplines, in the middle according to topics and exams. According to the question of time, if you do this, then I believe that your marks in the 10 V board exam will be around 75% -90%.', '2022-02-28', 15, 1),
(6, 'We will tell the top five benefits of relying on human resources management systems. Without any further ado, let’ dive into the blog.', 'Globalization and hybrid workforce have been on the rise for the last few years. With the outbreak of the COVID-19 pandemic, a decentralized “new normal” of employees who can work anywhere, anytime, has emerged. But, we cannot ignore the fact that organizations across India faced a number of challenges while working remotely. As a result, a good number of businesses relied on automated software tools to deal with the additional complexities that came with an agile and dispersed workforce.

Let’s face it, automating human resources has become acutely necessary today. It is high time for every business leader out there to accept that outdated tools cause inefficiencies, errors, and the absence of oversight.

HRMS software is one such technology that can aid companies to tackle HR pitfalls. Human resources management software offers several advantages to a company. Yet, many companies hesitate to invest in such systems. If you are one of them, you are at the right place now.

We will tell the top five benefits of relying on human resources management systems. Without any further ado, let’ dive into the blog.', '2022-03-01', 23, 1),
(7, 'The easiest way to make your online venture the best ecommerce site is to wear your customers'' shoes and ask yourself what would be the features they would look for.', 'Some of the most basic features that would make your ecommerce site a hot favorite would be:
Flexible payment options - the best ecommerce site would offer a range of payment options from among those available today, including credit card payments, debit card payments, online payments, e-check payments etc. More the options, higher the likelihood of your client re-visiting your site. 

Highly navigable website - the best ecommerce site will have a user friendly site, which would be easily navigable by even a novice computer user. If your website has too many puzzling and technical features, it will drive away the new Internet users, who are in millions today.', '2022-03-02', 144, 59),
(8, 'Upholstery cleaning not only helps your sofas and couches retain that shine and sheen but also ensures that there is no dust and dirt accumulation on the surface.', 'Homes that have kids, pets, or elderly need to give in extra focus when it comes to couch cleaning as those dust particles might easily cause allergies. Another important reason why it is important to invest time cleaning the upholstery is that if not cleaned at regular intervals the condition begins to deteriorate.

Whether you have a sofa, a couch, or multiple chairs or ottomans, ensure that these are cleaned on regular basis as then only that fabric will retain its natural color without stains and odor. All those who feel that they cannot spare out any extra time for upholstery cleaning can go in for professional cleaning services as the cleaners will take extra care to clean the surfaces without doing any harm to the fabric.

Few convincing reasons why we should go in for upholstery cleaning', '2022-03-03', 41, 1),
(9, 'Guide To Mount Kenya Adventure Climbing,Hiking & Trekking Routes Option.', 'Mount Kenya Climbing The Sirimon Route:

Sirimon route is the most popular ascent as the altitude gain is nice and steady and it offers one of the most beautiful approaches to the peaks. Allow a minimum of 2 nights to peak when ascending, although we recommend spending an extra night at the last camp (Shipton’s) on the way up.

Mount Kenya Climbing The Burguret Route:

If you want to avoid the crowds then Burguret is the best route. You’ll be hacking through the pristine rainforest on this little-used route, overnighting at wilderness campsites. Going up this route is challenging, it is little more than a game track in places, often muddy and rough under foot. Burguret is usually combined with a Chogoria or Sirimon route descent. Allow a minimum of 3 nights before peak when ascending.

Mount Kenya Climbing The Naro Moru Route:

Naro-Moru is the most popular descent route, fast and easy (at least on the way down!). Naro Moru passes through the notorious vertical bog section which gets much waterlogged in the rainy seasons. The vegetation is at its most striking on this route. It can be descended in one very long day, usually done in two days and one night.', '2022-03-04', 92, 59),
(99, '', '', '2022-03-16', 1, 61);

INSERT INTO "public"."user" ("id", "email", "hashed_password", "admin", "name") VALUES
(1, 'marta@test.com', '$argon2id$v=19$m=65536,t=5,p=1$2wCJ5aQT1Gtkey9r1LlxMw$9scf47bCLX4SxBFN6kVJKJIcJGRvnEV6os6QHRCTUDY', 't', 'Marta'),
(59, 'karol@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$2wCJ5aQT1Gtkey9r1LlxMw$9scf47bCLX4SxBFN6kVJKJIcJGRvnEV6os6QHRCTUDY', 't', 'Karol'),
(61, 'mar3@op.pl', '$argon2id$v=19$m=65536,t=5,p=1$qxjbAc3X6ycShWJ20OSBGQ$ZIMejQKwdnAZNXYE1GLmTlLTNlEse81KCDGyfURLGoY', 't', 'mar3');

ALTER TABLE "public"."post" ADD FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");
