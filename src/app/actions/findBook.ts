'use server'

import { BookType } from '@/lib/types/book';
import * as cheerio from 'cheerio';
import { z } from 'zod'

const schema = z.object({
    id: z.string({
        message: "ID is required"
    }),
})

export type BookState = {
    book: BookType | null;
    errors: string[];
}

async function fetchBook(id: string) {
    const res = await fetch(`https://www.gutenberg.org/files/${id}/${id}-0.txt`)
    return res.text();
}

async function fetchMetadata(id: string) {
    const res = await fetch(`https://www.gutenberg.org/ebooks/${id}`)
    return res.text();
}


export async function findBook(prevState: BookState, formData: FormData) {

    const validatedFields = schema.safeParse({
        id: formData.get('id'),
    })

    if (!validatedFields.success) {
        return {
            book: null,
            errors: validatedFields.error.flatten().fieldErrors.id ?? [],
        }
    }
    const [metadata, content] = await Promise.all([
        fetchMetadata(validatedFields.data.id),
        fetchBook(validatedFields.data.id),

    ]);

    const $metadata = cheerio.load(metadata)

    const $content = cheerio.load(content)

    const is404Metadata = $metadata('title').text().toLowerCase().includes('404') || $metadata('body').text().toLowerCase().includes('not found');
    const is404Content = $content('title').text().toLowerCase().includes('404') || $metadata('body').text().toLowerCase().includes('not found');

    if (is404Metadata || is404Content) {
        return { book: null, errors: ["This book cannot be found"] }
    }

    const book: BookType = {
        id: validatedFields.data.id,
        title: $metadata('h1[itemprop="name"]').text().trim(),
        author: $metadata('th:contains("Author") + td').text().trim(),
        category: $metadata('th:contains("Category") + td').text().trim(),
        copyrightStatus: $metadata('th:contains("Copyright Status") + td').text().trim(),
        text: content,
        language: $metadata('th:contains("Language") + td').text().trim(),
        originalPublication: $metadata('th:contains("Original Publication") + td').text().trim(),
        coverImg: $metadata('#cover img').attr('src') || '',
        credits: $metadata('th:contains("Credits") + td').text().trim() || 'Credits not found',
        releaseDate: $metadata('th:contains("Release Date") + td').text().trim() || 'Release date not found',
    };

    return { book, errors: [] }

}