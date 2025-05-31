// src/service/sanityImageBuilder.ts

import  sanityClient  from '@/lib/sanityClient';
import  createImageUrlBuilder  from '@sanity/image-url';

const sanityImageBuilder = createImageUrlBuilder(sanityClient);

export default sanityImageBuilder;
