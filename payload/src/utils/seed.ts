import fs from 'fs';
import mime from 'mime-types';
import path from 'path';
import payload from 'payload';


interface Media {
    alt: string;
    file: {
        path: string;
        mimetype: string;
        originalName: string;
        size: number;
    };
}

// User and Post Data Generation
const usersData = Array.from({ length: 10 }, (_, i) => ({
    email: `user${i}@example.com`,
    password: 'password123',
}));

const postsData = (mediaIds: number[]) => Array.from({ length: 10 }, (_, i) => ({
    title: `Sample Post ${i}`,
    content: [{ /* Your post content here */ }],
    image: mediaIds[i % mediaIds.length], // Assign media IDs cyclically
}));

// Function to create multiple records
async function createMultipleRecords<T>(collection: "users" | "media" | "posts", data: T[]) {
    for (const item of data) {
        await payload.create({ collection, data: item });
    }
}

// Seed images and return media IDs
async function seedImages(): Promise<number[]> {
    const imagesDir = './src/media';
    const imageFiles = fs.readdirSync(imagesDir);
    const mediaIds: number[] = [];

    for (const file of imageFiles) {
        try {
            const imagePath = path.join(imagesDir, file);
            const imageBuffer = fs.readFileSync(imagePath);
            const mimeType = mime.lookup(file) || 'application/octet-stream';

            const mediaData: Media = {
                alt: `Alt text for ${file}`,
                file: {
                    path: imagePath,
                    mimetype: mimeType,
                    originalName: file,
                    size: imageBuffer.length
                },
            };

            const createdMedia = await payload.create({ collection: 'media', data: mediaData });
            if (createdMedia && createdMedia.id) {
                mediaIds.push(createdMedia.id);
            }
        } catch (error) {
            console.error(`Error uploading image ${file}:`, error);
        }
    }

    return mediaIds;
}

// Seed functions using local API
async function seedUsers() {
    await createMultipleRecords('users', usersData);
}

async function seedPosts(mediaIds: number[]) {
    const postData = postsData(mediaIds);
    await createMultipleRecords('posts', postData);
}

// Seed the database
async function seedDatabase() {
    // const mediaIds = await seedImages();
    await seedUsers();
    // await seedPosts(mediaIds);
    // Repeat for other entities as needed
}

// Run the seeding
seedDatabase();
