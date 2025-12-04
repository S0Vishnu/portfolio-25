// Utility to dynamically load comics from assets/comics folder
// Uses Vite's import.meta.glob to get all comic images and text files
//
// Expected structure:
// - assets/comics/{comic-name}/00.webp or 00.png (thumbnail)
// - assets/comics/{comic-name}/*.txt, *.md, *.text (description - any text file in main folder)
// - assets/comics/{comic-name}/{chapter-folder}/*.webp or *.png (pages in chapters)

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
  chapterId: string; // Folder name used as ID
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
 * - Main folder: {comic-name}/00.webp or 00.png = thumbnail
 * - Main folder: {comic-name}/*.txt, *.md, *.text = description (any text file)
 * - Subfolders: {comic-name}/{chapter-folder}/*.webp or *.png = pages in chapters
 */
export function loadComicsFromAssets(): ComicData[] {
  // Use Vite's glob import to get all comic images (both .webp and .png)
  const comicModulesWebp = import.meta.glob<string>('../assets/comics/**/*.webp', {
    eager: true,
  });
  const comicModulesPng = import.meta.glob<string>('../assets/comics/**/*.png', {
    eager: true,
  });
  
  // Combine all image modules
  const comicModules = { ...comicModulesWebp, ...comicModulesPng };

  // Use Vite's glob import to get all text files in main comic folders
  // Match .txt, .md, .text files only in main folders (not in chapter subfolders)
  // Using multiple patterns to match different extensions
  const textModulesTxt = import.meta.glob<string>('../assets/comics/*/*.txt', {
    eager: true,
    query: '?raw',
    import: 'default',
  });
  const textModulesMd = import.meta.glob<string>('../assets/comics/*/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  });
  const textModulesText = import.meta.glob<string>('../assets/comics/*/*.text', {
    eager: true,
    query: '?raw',
    import: 'default',
  });
  
  // Combine all text modules
  const textModules = { ...textModulesTxt, ...textModulesMd, ...textModulesText };

  // Group images by comic name
  const comicsMap = new Map<string, ComicImage[]>();

  Object.entries(comicModules).forEach(([path, imageModule]) => {
    // Path format examples:
    // ../assets/comics/{comic-name}/00.webp or 00.png (thumbnail in main folder)
    // ../assets/comics/{comic-name}/{chapter-folder}/{page-number}.webp or .png (page in chapter)
    const pathParts = path.split('/');
    
    // Find the index of 'comics' in the path
    const comicsIndex = pathParts.findIndex(part => part === 'comics');
    if (comicsIndex === -1) return; // Skip if 'comics' not found
    const comicName = pathParts[comicsIndex + 1]; // Next part after 'comics'
    const fileName = pathParts[pathParts.length - 1]; // Last part (filename)
    // Remove both .webp and .png extensions
    const pageNumber = fileName.replace(/\.(webp|png)$/i, '');

    // Determine if this is in a chapter folder or main folder
    // Path structure: .../comics/{comic-name}/[{chapter-folder}/]{filename}
    // Count parts after 'comics' excluding the filename
    // - Main folder: comics/{comic-name}/filename → 1 part (just comic-name)
    // - Chapter folder: comics/{comic-name}/{chapter}/filename → 2 parts (comic-name + chapter)
    const partsAfterComics = pathParts.length - comicsIndex - 2; // Exclude 'comics' and filename
    const isInChapter = partsAfterComics > 1; // More than 1 means there's a chapter folder
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
    // Find thumbnail (00.webp or 00.png in main folder, not in a chapter)
    const thumbnailImage = images.find(
      (img) => img.pageNumber === '00' && img.chapterName === null
    );
    const thumbnail = thumbnailImage?.imageUrl || '';

    // Get description from text file, or use default
    const description = descriptionsMap.get(comicName) || `${comicName} comic series`;

    // Group images by chapter
    const chaptersMap = new Map<string, Array<{ url: string; pageNumber: string }>>();

    images.forEach((img) => {
      // Skip the thumbnail file (00.webp or 00.png in main folder)
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

    // Debug: Log detected chapters for troubleshooting
    if (comicName.toLowerCase().includes('god') || comicName.toLowerCase().includes('protocol')) {
      console.log(`[ComicsLoader] Comic: ${comicName}, Detected chapters:`, Array.from(chaptersMap.keys()));
    }

    // Convert chapters map to array, sort by original chapter name, then format
    const chapterEntries = Array.from(chaptersMap.entries());
    
    // Sort chapters by original name (before formatting)
    // Put "announcement" or "Announcement" folders first (case-insensitive)
    chapterEntries.sort(([nameA], [nameB]) => {
      // Handle __main__ as first chapter
      if (nameA === '__main__') return -1;
      if (nameB === '__main__') return 1;
      
      // Put announcement folders first (case-insensitive)
      const aLower = nameA.toLowerCase();
      const bLower = nameB.toLowerCase();
      if (aLower === 'announcement' && bLower !== 'announcement') return -1;
      if (bLower === 'announcement' && aLower !== 'announcement') return 1;
      
      // Sort numerically if both are numbers
      const numA = parseInt(nameA) || 0;
      const numB = parseInt(nameB) || 0;
      if (numA > 0 && numB > 0) {
        return numA - numB;
      }
      return nameA.localeCompare(nameB);
    });
    
    // Map to ComicChapterData - use folder names directly as chapter names
    const chapters: ComicChapterData[] = chapterEntries.map(([chapterName, pages]) => {
      // Format folder name to readable format (convert kebab-case/snake_case to Title Case)
      let formattedChapterName = chapterName;
      let chapterId = chapterName;
      
      if (chapterName === '__main__') {
        // Use comic name or default for main folder
        formattedChapterName = comicName
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        chapterId = 'main'; // Use 'main' as ID for main folder
      } else {
        // Convert folder name to readable format
        formattedChapterName = chapterName
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        // Use folder name as ID (sanitized for URL)
        chapterId = chapterName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      }
      
      return {
        chapterName: formattedChapterName,
        chapterId: chapterId,
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
    console.log(comicTitle, chapters);
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
      id: chapterData.chapterId, // Use folder name as chapter ID
      title: chapterData.chapterName, // Use formatted folder name as title
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

