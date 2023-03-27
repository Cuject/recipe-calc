import type { Binary, MongoClient, Document } from 'mongodb';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	// Something we use to connect the client.
	// If is useless in production,
	// but in development mode,
	// it is great for performance.
	var _mongoClientPromise: Promise<MongoClient>;

	// Useless interface for the example.
	interface Project {
		title: string;
	}

	interface food_item {
		food_ID: string;
		food_ND: string;
		sci_Name: string;
		com_Name: string;
		edi_Portion: string;
		water: string;
		energy: string;
		protein: string;
		total_fat: string;
		carbohydrates: string;
		ash: string;
		fiber: string;
		sugars: string;
		calcium: string;
		phosphorus: string;
		iron: string;
		sodium: string;
		vit_A: string;
		beta_carotene: string;
		rae: string;
		thiamin: string;
		riboflavin: string;
		niacin: string;
		vit_C: string;
		FA_sat: string;
		FA_mono: string;
		FA_poly: string;
		cholesterol: string;
	}

	interface food_item_element {
		food_ID: string,
		qty: number
	}

	interface recipe {
		name : string,
		user : string,
		food_items: food_item_element[]
	}

	interface dummy {
		food_ID: string;
	}

	// The basic model of a User.
	interface User {
		email: string; // the email address
		password: string; // the hashed password
		picture?: string; // the Object Id leading to the file of his profile picture
	}

	// Metadata for uploading files + a custom one I recommend
	interface UploadMetadata extends Document {
		uploadedBy?: string;
	}

	// Options for uploading files with the helper function
	interface UploadOptions {
		bucketName?: string;
		metadata: UploadMetadata;
	}

	// A serialised chunk of file scattered using `GridFS`
	interface Chunk {
		type: "Buffer";
		data: number[];
	}
}

export {};
