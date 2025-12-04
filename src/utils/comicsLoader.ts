// Utility to dynamically load comics from assets/comics folder
// Uses Vite's import.meta.glob to get all comic images and text files
//
// Expected structure:
// - assets/comics/{comic-name}/00.webp (thumbnail)
// - assets/comics/{comic-name}/*.txt, *.md, *.text (description - any text file in main folder)
// - assets/comics/{comic-name}/{chapter-folder}/*.webp (pages in chapters)

interface ComicImage {
  path: string;
  imageUrl: string;
  comicName: string;
  chapterName: string | null; // null if in main folder
  fileName: string;
  pageNumber: string;
}

interface ComicChapterData {
  chapterName: string;
  pages: Array<{ url: string; pageNumber: string }>;
}

interface ComicData {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  chapters: ComicChapterData[];
}

/**
 * Scans the comics folder and generates comic data structure
 * Structure:
 * - Main folder: {comic-name}/00.webp = thumbnail
 * - Main folder: {comic-name}/*.txt, *.md, *.text = description (any text file)
 * - Subfolders: {comic-name}/{chapter-folder}/*.webp = pages in chapters
 */
export function loadComicsFromAssets(): ComicData[] {
  // Use Vite's glob import to get all comic images
  const comicModules = import.meta.glob<string>('../assets/comics/**/*.webp', {
    eager: true,
  });

  // Use Vite's glob import to get all text files in main comic folders
  // Match .txt, .md, .text files only in main folders (not in chapter subfolders)
  // Using multiple patterns to match different extensions
  const textModulesTxt = import.meta.glob<string>('../assets/comics/*/*.txt', {
    eager: true,
    as: 'raw',
  });
  const textModulesMd = import.meta.glob<string>('../assets/comics/*/*.md', {
    eager: true,
    as: 'raw',
  });
  const textModulesText = import.meta.glob<string>('../assets/comics/*/*.text', {
    eager: true,
    as: 'raw',
  });
  
  // Combine all text modules
  const textModules = { ...textModulesTxt, ...textModulesMd, ...textModulesText };

  // Group images by comic name
  const comicsMap = new Map<string, ComicImage[]>();

  Object.entries(comicModules).forEach(([path, imageModule]) => {
    // Path format examples:
    // ../assets/comics/{comic-name}/00.webp (thumbnail in main folder)
    // ../assets/comics/{comic-name}/{chapter-folder}/{page-number}.webp (page in chapter)
    const pathParts = path.split('/');
    
    // Find the index of 'comics' in the path
    const comicsIndex = pathParts.findIndex(part => part === 'comics');
    if (comicsIndex === -1) return; // Skip if 'comics' not found
    
    const comicName = pathParts[comicsIndex + 1]; // Next part after 'comics'
    const fileName = pathParts[pathParts.length - 1]; // Last part (filename)
    const pageNumber = fileName.replace('.webp', '');

    // Determine if this is in a chapter folder or main folder
    // If there are 2 parts after 'comics', it's in a chapter folder
    // If there's only 1 part after 'comics', it's in the main folder
    const partsAfterComics = pathParts.length - comicsIndex - 2; // -2 because we exclude 'comics' and filename
    const isInChapter = partsAfterComics > 1;
    const chapterName = isInChapter ? pathParts[comicsIndex + 2] : null;

    // Get the image URL
    const imageUrl = typeof imageModule === 'string' ? imageModule : (imageModule as { default: string }).default || '';

    if (!comicsMap.has(comicName)) {
      comicsMap.set(comicName, []);
    }

    comicsMap.get(comicName)!.push({
      path,
      imageUrl,
      comicName,
      chapterName,
      fileName,
      pageNumber,
    });
  });

  // Load text file descriptions for each comic
  const descriptionsMap = new Map<string, string>();
  Object.entries(textModules).forEach(([path, textContent]) => {
    const pathParts = path.split('/');
    const comicsIndex = pathParts.findIndex(part => part === 'comics');
    if (comicsIndex === -1) return;
    
    const comicName = pathParts[comicsIndex + 1];
    // Only process files in main folder (not in subfolders)
    const partsAfterComics = pathParts.length - comicsIndex - 2;
    if (partsAfterComics === 1) {
      // This is a text file in the main folder
      const content = typeof textContent === 'string' ? textContent : (textContent as { default: string }).default || '';
      // Use the first text file found, or concatenate if multiple exist
      if (!descriptionsMap.has(comicName)) {
        descriptionsMap.set(comicName, content.trim());
      } else {
        // If multiple text files, append them
        descriptionsMap.set(comicName, descriptionsMap.get(comicName)! + '\n\n' + content.trim());
      }
    }
  });

  // Convert to ComicData array
  const comics: ComicData[] = [];

  comicsMap.forEach((images, comicName) => {
    // Find thumbnail (00.webp in main folder, not in a chapter)
    const thumbnailImage = images.find(
      (img) => img.pageNumber === '00' && img.chapterName === null
    );
    const thumbnail = thumbnailImage?.imageUrl || '';

    // Get description from text file, or use default
    const description = descriptionsMap.get(comicName) || `${comicName} comic series`;

    // Group images by chapter
    const chaptersMap = new Map<string, Array<{ url: string; pageNumber: string }>>();

    images.forEach((img) => {
      // Skip the thumbnail file (00.webp in main folder)
      if (img.pageNumber === '00' && img.chapterName === null) {
        return;
      }

      // If no chapter, treat as a single default chapter
      const chapterKey = img.chapterName || '__main__';
      
      if (!chaptersMap.has(chapterKey)) {
        chaptersMap.set(chapterKey, []);
      }

      chaptersMap.get(chapterKey)!.push({
        url: img.imageUrl,
        pageNumber: img.pageNumber,
      });
    });

    // Convert chapters map to array, sort by original chapter name, then format
    const chapterEntries = Array.from(chaptersMap.entries());
    
    // Sort chapters by original name (before formatting)
    chapterEntries.sort(([nameA], [nameB]) => {
      // Handle __main__ as first chapter
      if (nameA === '__main__') return -1;
      if (nameB === '__main__') return 1;
      
      // Sort numerically if both are numbers
      const numA = parseInt(nameA) || 0;
      const numB = parseInt(nameB) || 0;
      if (numA > 0 && numB > 0) {
        return numA - numB;
      }
      return nameA.localeCompare(nameB);
    });
    
    // Map to ComicChapterData with formatted names
    const chapters: ComicChapterData[] = chapterEntries.map(([chapterName, pages]) => {
      // Format chapter name: if numeric, format as "Chapter X", otherwise use as-is
      let formattedChapterName = chapterName;
      if (chapterName === '__main__') {
        formattedChapterName = 'Chapter 1';
      } else {
        const chapterNum = parseInt(chapterName);
        if (!isNaN(chapterNum) && chapterNum > 0) {
          formattedChapterName = `Chapter ${chapterNum}`;
        }
      }
      
      return {
        chapterName: formattedChapterName,
        pages: pages.sort((a, b) => {
          const numA = parseInt(a.pageNumber) || 0;
          const numB = parseInt(b.pageNumber) || 0;
          return numA - numB;
        }),
      };
    });

    // Generate comic ID and title from folder name
    const comicId = `comic-${comicName.toLowerCase().replace(/\s+/g, '-')}`;
    const comicTitle = comicName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    comics.push({
      id: comicId,
      title: comicTitle,
      thumbnail,
      description,
      chapters,
    });
  });

  return comics;
}

/**
 * Convert ComicData to Comic format with chapters
 */
export function convertToComicFormat(comicData: ComicData): Comic {
  const chapters: Chapter[] = comicData.chapters.map((chapterData, index) => {
    const pages: Page[] = chapterData.pages.map((page, pageIndex) => ({
      id: `page-${index + 1}-${pageIndex + 1}`,
      number: parseInt(page.pageNumber) || pageIndex + 1,
      url: page.url,
    }));

    return {
      id: `chapter-${index + 1}`,
      title: chapterData.chapterName,
      pages,
    };
  });

  return {
    id: comicData.id,
    title: comicData.title,
    content: comicData.description,
    category: 'comic',
    beta: false,
    thumbnail: comicData.thumbnail,
    status: 'completed',
    chapters,
  };
}

/**
 * Get all comics in Comic format
 */
export function getAllComics(): Comic[] {
  const comicsData = loadComicsFromAssets();
  return comicsData.map(convertToComicFormat);
}

/**
 * Get all comic pages for a specific comic (flattened from all chapters)
 */
export function getComicPages(comicId: string): string[] {
  const comics = loadComicsFromAssets();
  const comic = comics.find((c) => c.id === comicId);
  if (!comic) return [];
  
  // Flatten all pages from all chapters
  return comic.chapters.flatMap(chapter => chapter.pages.map(page => page.url));
}

/**
 * Get comic thumbnail
 */
export function getComicThumbnail(comicId: string): string {
  const comics = loadComicsFromAssets();
  const comic = comics.find((c) => c.id === comicId);
  return comic?.thumbnail || '';
}

