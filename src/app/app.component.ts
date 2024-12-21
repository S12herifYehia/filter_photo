import { ChangeDetectorRef, Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showmodel = false;
  @ViewChild('img') img!: ElementRef;
  render: Renderer2 = inject(Renderer2);
  file: any;

  brightness: number = 100;
  contrast: number = 100;
  saturate: number = 100;
  blur: number = 0;
  hueRotate: number = 0;
  grayscale: number = 0;
  invert: number = 0;
  sepia: number = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.applyFilters(); // تطبيق الفلاتر عند التهيئة
  }

  // تغيير الصورة
  changePhoto(e: any) {
    const file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = () => {
        this.file = reader.result;
         // تطبيق الفلاتر عند تحميل الصورة
         this.applyFilters();
      };

      reader.readAsDataURL(file);
    }
  }

  // تطبيق الفلاتر
  applyFilters() {
    if (this.img?.nativeElement) {
      const filterValue = `brightness(${this.brightness}%)
                           contrast(${this.contrast}%)
                           saturate(${this.saturate}%)
                           blur(${this.blur}px)
                           hue-rotate(${this.hueRotate}deg)
                           grayscale(${this.grayscale}%)
                           invert(${this.invert}%)
                           sepia(${this.sepia}%)`;

      // تعديل الفلاتر باستخدام Renderer2
      this.render.setStyle(this.img.nativeElement, 'filter', filterValue);
    }
  }

  // الفلاتر
  onChange1(e: any) {
    this.brightness = e.target.value;
    this.applyFilters();
  }

  onChange2(e: any) {
    this.contrast = e.target.value;
    this.applyFilters();
  }

  onChange3(e: any) {
    this.saturate = e.target.value;
    this.applyFilters();
  }

  onChange4(e: any) {
    this.blur = e.target.value;
    this.applyFilters();
  }

  onChange5(e: any) {
    this.hueRotate = e.target.value;
    this.applyFilters();
  }

  onChange6(e: any) {
    this.grayscale = e.target.value;
    this.applyFilters();
  }

  onChange7(e: any) {
    this.invert = e.target.value;
    this.applyFilters();
  }

  onChange8(e: any) {
    this.sepia = e.target.value;
    this.applyFilters();
  }

  // تنزيل الصورة
  down(): void {
    this.showmodel = true;
  }

  hideModel() {
    this.showmodel = false;
  }

  // تنزيل الصورة بعد التعديل
  OnDownload(f: any) {

    const imageName = f.value.names;
    if (f.valid) {
      if (this.file) {
          const image = new Image();
          image.src = this.file;
          // بعد تحميل الصورة في الـ image
          image.onload = () => {
            // إنشاء canvas وتطبيق الفلاتر عليه
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
              canvas.width = image.width;
              canvas.height = image.height;
              ctx.filter = `brightness(${this.brightness}%)
                            contrast(${this.contrast}%)
                            saturate(${this.saturate}%)
                            blur(${this.blur}px)
                            hue-rotate(${this.hueRotate}deg)
                            grayscale(${this.grayscale}%)
                            invert(${this.invert}%)
                            sepia(${this.sepia}%)`;

              ctx.drawImage(image, 0, 0);

              // استخراج البيانات من الـ canvas
              canvas.toBlob((blob) => {
                if (blob) {
                  saveAs(blob, imageName+'.jpg');
                }
              }, 'image/jpeg');
            }



        f.reset();
        this.file = null;
        this.showmodel = false;
      }
    }
      }
  }
}
