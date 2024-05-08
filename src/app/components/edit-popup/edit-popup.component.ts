import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() header!: string;

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  // Default product
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  onConfirm() {
    // Alternative way:
    // this.confirm.emit({
    //   name: this.productForm.value.name || '',
    //   image: this.productForm.value.image || '',
    //   price: this.productForm.value.price || '',
    //   rating: this.productForm.value.rating || 0,
    // });

    const { name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  ngOnChanges() {
    this.productForm.patchValue({
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      rating: this.product.rating,
    });
  }
}
