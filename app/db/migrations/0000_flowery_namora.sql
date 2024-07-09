CREATE TABLE `idea` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`updatedAt` text,
	`text` text NOT NULL,
	`labelId` text NOT NULL,
	FOREIGN KEY (`labelId`) REFERENCES `label`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `label` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`date` text NOT NULL,
	`updatedAt` text,
	`lastUsedAt` text,
	`icon` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idea_id_unique` ON `idea` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `label_id_unique` ON `label` (`id`);