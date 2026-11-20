import { FileInput } from '@mantine/core';
import {Carousel} from '@mantine/carousel'
import { Box } from '@mantine/core';
export function Panel() {
  return <>
  
  <FileInput clearable label="Upload files" placeholder="Upload files" multiple />
  





   <Carousel
      withIndicators
      height={200}
      w={200}
      emblaOptions={{ dragFree: false, align: 'start' }}
      slideGap="md"
    >
      <Carousel.Slide><Box h={200} w={200} bg="cyan">1</Box></Carousel.Slide>
      <Carousel.Slide><Box h={200}  w={200} bg="teal">2</Box></Carousel.Slide>
      <Carousel.Slide><Box h={200}  w={200} bg="yellow">3</Box></Carousel.Slide>
    </Carousel>


    </>
}

const fileInput = document.querySelector('#your-file-input')
const formData = new FormData()

formData.append('file', fileInput.files[0])

// Replace with the fields defined in your upload-enabled collection.
// The example below includes an optional field like 'title'.
formData.append(
  '_payload',
  JSON.stringify({
    title: 'Example Title',
    description: 'An optional description for the file',
  }),
)

fetch('api/:upload-slug', {
  method: 'POST',
  body: formData,
  /**
   * Do not manually add the Content-Type Header
   * the browser will handle this.
   *
   * headers: {
   *  'Content-Type': 'multipart/form-data'
   * }
   */
})