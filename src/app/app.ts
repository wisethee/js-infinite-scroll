export class App {
  constructor() {
    this.sss();
  }

  imageCount = 5;
  apiKey = 'QGSODD3PTsRcvsqgY69oajG-BWagMdhvIBIaCjrkBVM';
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${this.apiKey}&count=${this.imageCount}`;

  imageContainer = document.getElementById('image-container');
  loader = document.getElementById('loader');

  photosArray: any[] = [];
  ready: boolean = false;
  imagesLoaded = 0;
  totalImages: number = 0;

  async getPhotos() {
    try {
      const response = await fetch(this.apiURL);
      this.photosArray = await response.json();
      this.displayPhotos();
    } catch (e) {
      console.log(e);
    }
  }

  displayPhotos() {
    this.imagesLoaded = 0;
    this.photosArray.forEach((photo) => {
      this.totalImages = this.photosArray.length;
      const item = document.createElement('a');
      this.setAttributes(item, { href: photo.links.html, target: '_blank' });
      const img = document.createElement('img');
      this.setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        tittle: photo.alt_description
      });
      img.addEventListener('load', this.imageLoaded.bind(this));
      item.appendChild(img);
      this.imageContainer.appendChild(item);
    });
  }

  imageLoaded() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.totalImages) {
      this.ready = true;
      this.loader.hidden = true;
    }
  }

  setAttributes(element: any, attributes: any) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  sss() {
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 1000 &&
        this.ready === true
      ) {
        this.ready = false;
        this.getPhotos();
      }
    });
  }
}
